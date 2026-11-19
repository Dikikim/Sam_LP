/* We Speak: page behaviour. Plain JS, no build step. */
(function () {
  'use strict'

  var D = window.EWS
  var COPY = D.COPY

  // Lesson formats and packages live in content.js, in the same order as the booking form options
  var FORMATS = D.FORMATS

  var state = { lang: initialLang(), goal: 'work', fmt: 'solo' }

  function $(id) { return document.getElementById(id) }
  function t() { return COPY[state.lang] }
  function get(obj, path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k] }, obj)
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    })
  }
  function use(id, cls) {
    return '<svg class="' + (cls || 'i') + '" aria-hidden="true"><use href="#' + id + '"/></svg>'
  }
  // escape, then turn **text** into bold
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') }
  function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₴' }
  var ARROW = ' <span class="arr" aria-hidden="true">→</span>'

  function initialLang() {
    try {
      var fromUrl = new URLSearchParams(window.location.search).get('lang')
      if (fromUrl === 'en' || fromUrl === 'ua') return fromUrl
      var saved = window.localStorage.getItem('ews-lang')
      if (saved === 'en' || saved === 'ua') return saved
    } catch (e) { /* storage blocked */ }
    return 'ua'
  }

  /* ---------- Static text ---------- */
  function applyText() {
    var c = t()
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = get(c, el.getAttribute('data-i18n'))
      if (typeof v === 'string') el.textContent = v
    })
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var v = get(c, el.getAttribute('data-i18n-placeholder'))
      if (typeof v === 'string') el.setAttribute('placeholder', v)
    })
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var v = get(c, el.getAttribute('data-i18n-aria'))
      if (typeof v === 'string') el.setAttribute('aria-label', v)
    })
    document.documentElement.lang = state.lang === 'ua' ? 'uk' : 'en'
    document.title = c.meta.title
    var desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', c.meta.description)
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === state.lang
      b.classList.toggle('on', on)
      b.setAttribute('aria-pressed', on ? 'true' : 'false')
    })
  }

  /* ---------- Dynamic blocks ---------- */
  function renderMarquee() {
    var items = t().marquee
    var one = items.map(function (m) { return '<span>' + esc(m) + '</span><i aria-hidden="true">✦</i>' }).join('')
    // Two identical halves, so sliding by -50% loops without a jump
    $('marquee').innerHTML = '<div class="mq-half">' + one + one + '</div><div class="mq-half" aria-hidden="true">' + one + one + '</div>'
    $('marquee-sr').textContent = items.join(', ')
  }

  function renderGoalChips() {
    var c = t()
    $('goal-chips').innerHTML = D.GOAL_IDS.map(function (id) {
      var on = id === state.goal
      return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-goal="' + id +
        '" aria-pressed="' + on + '">' + esc(c.goal.labels[id]) + '</button>'
    }).join('')
  }

  function renderFits() {
    var c = t()
    $('fits').innerHTML = c.goal.fits[state.goal].map(function (s) {
      return '<li class="fit"><span class="fit-ico">' + use('i-check') + '</span><span>' + esc(s) + '</span></li>'
    }).join('')
    $('goal-focus').textContent = c.goal.focus[state.goal]
  }

  // "How it works": puzzle pieces zig-zag left/right, a dashed route links the pins in their notches
  function renderSteps() {
    var s = t().steps
    var last = s.items.length - 1
    $('route').innerHTML = '<svg class="route-line" aria-hidden="true"><path/></svg><ol class="pieces">' +
      s.items.map(function (txt, i) {
        var side = i % 2 ? 'piece-r' : 'piece-l'
        var tone = (i % 4 === 0 || i % 4 === 3) ? ' piece-fill' : ''
        return '<li class="piece ' + side + tone + '">' +
          '<span class="pin" aria-hidden="true">' + (i + 1) + '</span>' +
          use('i-spark', 'spark') + '<p class="piece-text">' + esc(txt) + '</p>' +
          (i === 0 ? '<span class="sticker sticker-start">' + esc(s.start) + '</span>' : '') +
          (i === last ? '<span class="sticker sticker-finish">' + esc(s.finish) + '</span>' : '') +
          '</li>'
      }).join('') + '</ol>'
    drawRoute()
  }

  // Rounded polyline through points [[x, y], ...]
  function roundedPath(pts, r) {
    var d = ''
    function toward(a, b, len) {
      var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1
      return (a[0] + dx / l * len).toFixed(1) + ' ' + (a[1] + dy / l * len).toFixed(1)
    }
    for (var i = 1; i < pts.length; i++) {
      var p = pts[i], prev = pts[i - 1], next = pts[i + 1]
      if (!next) { d += ' L' + p[0].toFixed(1) + ' ' + p[1].toFixed(1); break }
      var rr = Math.min(r, Math.hypot(p[0] - prev[0], p[1] - prev[1]) / 2, Math.hypot(next[0] - p[0], next[1] - p[1]) / 2)
      d += ' L' + toward(p, prev, rr) + ' Q' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' ' + toward(p, next, rr)
    }
    return d
  }

  function drawRoute() {
    var box = $('route')
    var svg = box && box.querySelector('.route-line')
    if (!svg) return
    var b = box.getBoundingClientRect()
    var pins = [].map.call(box.querySelectorAll('.pin'), function (pin) {
      var r = pin.getBoundingClientRect(), li = pin.parentNode.getBoundingClientRect()
      return {
        x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top,
        l: li.left - b.left, r: li.right - b.left, t: li.top - b.top, bot: li.bottom - b.top,
      }
    })
    var d = ''
    pins.forEach(function (Q, i) {
      if (!i) { d = 'M' + Q.x.toFixed(1) + ' ' + Q.y.toFixed(1); return }
      var A = pins[i - 1]
      if (A.r <= Q.l || Q.r <= A.l) {
        // pieces side by side (desktop): S-curve through the gap between them
        var k = (Q.x - A.x) * 0.6
        d += ' C' + (A.x + k).toFixed(1) + ' ' + A.y.toFixed(1) + ' ' + (Q.x - k).toFixed(1) + ' ' + Q.y.toFixed(1) + ' ' + Q.x.toFixed(1) + ' ' + Q.y.toFixed(1)
      } else {
        // pieces stacked (mobile): out to the free side, down, across the gap, into the next notch
        var pinOnRight = A.x > (A.l + A.r) / 2
        var xs = pinOnRight ? (A.r + b.width) / 2 : A.l / 2
        var yg = (A.bot + Q.t) / 2
        d += roundedPath([[A.x, A.y], [xs, A.y], [xs, yg], [Q.x, yg], [Q.x, Q.y]], 18)
      }
    })
    svg.setAttribute('viewBox', '0 0 ' + b.width.toFixed(1) + ' ' + b.height.toFixed(1))
    svg.querySelector('path').setAttribute('d', d)
  }

  function renderFounder() {
    var f = t().founder
    $('f-intro').innerHTML = rich(f.intro)
    $('f-facts').innerHTML = f.facts.map(function (x) {
      return '<li>' + use('i-spark', 'spark') + '<span>' + rich(x) + '</span></li>'
    }).join('')
    $('f-stats').innerHTML = f.stats.map(function (s) {
      return '<li><b><span>' + esc(s.num) + '</span></b><span>' + esc(s.text) + '</span></li>'
    }).join('')
  }

  function renderTeachers() {
    var c = t().teachers
    $('teacher-list').innerHTML = c.items.map(function (tc, i) {
      var photo = D.TEACHER_PHOTOS[i]
      var pic = photo
        ? '<img src="' + esc(photo) + '" alt="' + esc(tc.name) + '" loading="lazy" width="400" height="400">'
        : use('i-user')
      return '<article class="teacher">' +
        '<div class="teacher-photo' + (photo ? '' : ' is-empty') + '">' + pic + '</div>' +
        '<div class="teacher-body"><h3>' + esc(tc.name) + '</h3><p class="teacher-role">' + esc(tc.role) + '</p>' +
        '<p class="teacher-text">' + esc(tc.text) + '</p>' +
        '<ul class="tags">' + tc.tags.map(function (g) { return '<li>' + esc(g) + '</li>' }).join('') + '</ul></div></article>'
    }).join('')
  }

  function renderReviews() {
    $('review-list').innerHTML = t().reviews.items.map(function (r) {
      return '<figure class="rev">' + use('i-quote', 'rev-q') +
        '<blockquote>' + esc(r.quote) + '</blockquote>' +
        '<figcaption><span class="rev-ava" aria-hidden="true">' + esc(r.name.replace(/[^\p{L}]/gu, '').charAt(0) || '•') + '</span>' +
        '<span><strong>' + esc(r.name) + '</strong><small>' + esc(r.role) + '</small></span></figcaption></figure>'
    }).join('')
  }

  function renderPricing() {
    var p = t().price
    var fmt = FORMATS.filter(function (f) { return f.id === state.fmt })[0]
    $('fmt-chips').innerHTML = FORMATS.map(function (f) {
      var on = f.id === state.fmt
      return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-fmt="' + f.id +
        '" aria-pressed="' + on + '">' + esc(p.names[f.id]) + '</button>'
    }).join('')
    $('fmt-lines').innerHTML = p.lines[fmt.id].map(function (ln) { return '<li>' + esc(ln) + '</li>' }).join('')

    // Packages rise like a staircase: the bigger the package, the taller the tile
    var packs = fmt.packs, n = packs.length, base = packs[0][1]
    var TONES = ['pkg-top', 'pkg-mint', 'pkg-butter'] // from the biggest package down
    var box = $('pkgs')
    box.style.setProperty('--n', n)
    box.setAttribute('data-n', n)
    box.innerHTML = packs.map(function (pk, i) {
      var count = pk[0], per = pk[1]
      var save = (base - per) * count
      var pct = Math.round(save / (base * count) * 100)
      var step = n > 1 ? i / (n - 1) : 1
      var best = count === fmt.best
      return '<div class="pkg ' + (TONES[n - 1 - i] || '') + (best ? ' pkg-best' : '') +
        '" style="--h:' + Math.round(350 + 225 * step) + 'px;--mr:' + (18 * (1 - step)).toFixed(1) + '%">' +
        (best ? '<p class="pkg-tag">' + esc(p.best) + '</p>' : '') +
        '<p class="pkg-count">' + esc(p.lessons(count)) + '</p>' +
        '<p class="price">' + money(count * per) + '</p>' +
        '<p class="rate">' + money(per) + ' ' + esc(p[fmt.perKey]) + '</p>' +
        '<p class="pkg-valid">' + esc(pk[2] + ' ' + p.week + ' · ' + p.valid.replace('#', pk[3])) + '</p>' +
        (save > 0 ? '<p class="pkg-save">' + esc(p.save) + ' ' + money(save) + ' (' + pct + '%)</p>' : '') +
        '<a class="tile-cta" href="#book" data-pick="' + count + '">' + esc(p.choose) + ARROW + '</a></div>'
    }).join('')
  }

  function renderFaq() {
    $('faq-list').innerHTML = t().faq.items.map(function (f) {
      return '<details class="faq reveal" name="faq"><summary>' + esc(f.q) +
        '<span class="plus" aria-hidden="true"><span></span><span class="v"></span></span></summary>' +
        '<p>' + esc(f.a) + '</p></details>'
    }).join('')
  }

  function renderFormOptions() {
    var sel = $('f-format')
    var current = sel.selectedIndex
    sel.innerHTML = t().form.options.map(function (o) { return '<option>' + esc(o) + '</option>' }).join('')
    if (current > 0) sel.selectedIndex = current
  }

  function renderAll() {
    applyText()
    renderMarquee()
    renderGoalChips()
    renderFits()
    renderSteps()
    renderFounder()
    renderTeachers()
    renderReviews()
    renderPricing()
    renderFaq()
    renderFormOptions()
    observeReveal()
  }

  /* ---------- Scroll reveal ---------- */
  var io = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    : null

  function observeReveal() {
    document.querySelectorAll('.reveal:not(.is-in)').forEach(function (el) {
      if (io) io.observe(el)
      else el.classList.add('is-in')
    })
  }

  /* ---------- Events ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-lang],[data-goal],[data-fmt],[data-pick]')
    if (!el) return
    if (el.hasAttribute('data-lang')) {
      var lang = el.getAttribute('data-lang')
      if (lang === state.lang) return
      state.lang = lang
      try { window.localStorage.setItem('ews-lang', lang) } catch (err) { /* ignore */ }
      renderAll()
      document.querySelectorAll('#faq-list .reveal').forEach(function (d) { d.classList.add('is-in') })
    } else if (el.hasAttribute('data-goal')) {
      state.goal = el.getAttribute('data-goal')
      renderGoalChips()
      renderFits()
    } else if (el.hasAttribute('data-fmt')) {
      state.fmt = el.getAttribute('data-fmt')
      renderPricing()
    } else if (el.hasAttribute('data-pick')) {
      // Carry the chosen package and format into the booking form
      var idx = FORMATS.map(function (f) { return f.id }).indexOf(state.fmt)
      $('f-format').selectedIndex = idx
      $('f-package').value = t().price.lessons(Number(el.getAttribute('data-pick'))) + ' · ' + t().price.names[state.fmt]
    }
  })

  // Redraw the route whenever its box changes size (resize, fonts loading, language switch)
  if ('ResizeObserver' in window) new ResizeObserver(drawRoute).observe($('route'))
  else window.addEventListener('resize', drawRoute)

  // Booking form: Netlify Forms collects it when the site is on Netlify.
  $('book-form').addEventListener('submit', function (e) {
    e.preventDefault()
    var form = e.target
    var btn = form.querySelector('button[type="submit"]')
    btn.disabled = true
    var body = new URLSearchParams(new FormData(form)).toString()
    var done = function (ok) {
      $('form-fields').hidden = true
      var box = $('form-thanks')
      box.hidden = false
      box.querySelector('p').textContent = ok ? t().form.thanks : t().form.error
      box.querySelector('p').setAttribute('data-i18n', ok ? 'form.thanks' : 'form.error')
    }
    if (window.location.protocol === 'file:') { done(false); return }
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body })
      .then(function (r) { done(r.ok) })
      .catch(function () { done(false) })
  })

  // Highlight the menu link of the section in view
  var SPY = ['teachers', 'prices', 'reviews', 'faq']
  if ('IntersectionObserver' in window) {
    var links = document.querySelectorAll('.nav-links a')
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return
        links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id) })
      })
    }, { rootMargin: '-45% 0px -50% 0px' })
    SPY.forEach(function (id) { if ($(id)) spy.observe($(id)) })
  }

  // Mobile sticky button: hide it while the hero or the booking form is on screen
  var cta = document.querySelector('.mobile-cta')
  if (cta && 'IntersectionObserver' in window) {
    var seen = {}
    var ctaIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen[e.target.id] = e.isIntersecting })
      cta.classList.toggle('is-hidden', !!(seen.top || seen.book))
    })
    ;['top', 'book'].forEach(function (id) { if ($(id)) ctaIo.observe($(id)) })
  }

  $('year').textContent = new Date().getFullYear()
  renderAll()
})()
