/* English with Sam: page behaviour. Plain JS, no build step. */
(function () {
  'use strict'

  var D = window.EWS
  var COPY = D.COPY

  // Lesson formats, in the same order as the booking form options
  var FORMATS = [
    { id: 'solo', perKey: 'perLesson' },
    { id: 'pair', perKey: 'perPerson' },
    { id: 'exam', perKey: 'perLesson' },
  ]

  var state = { lang: initialLang(), goal: 'work', step: 0, fmt: 'solo' }

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
  function num(s) { return Number(String(s).replace(/\D/g, '')) }
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

  function renderPhotos() {
    var c = t().about
    $('photos').innerHTML = D.PHOTOS.map(function (p, i) {
      var inner = p
        ? '<img src="' + esc(p) + '" alt="' + esc(c.photoAlt) + '" loading="lazy" width="320" height="400">'
        : use('i-camera') + '<span>' + esc(c.photoEmpty) + '</span>'
      return '<figure class="snap snap-' + (i % 6) + (p ? '' : ' snap-empty') + '">' + inner + '</figure>'
    }).join('')
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

  function renderSteps() {
    $('steps').innerHTML = t().steps.items.map(function (s, i) {
      var open = i === state.step
      return '<div class="step step-' + i + (open ? ' open' : '') + '">' +
        '<button type="button" class="step-head" data-step="' + i + '" aria-expanded="' + open + '" aria-controls="step-b' + i + '">' +
        '<span class="step-num">0' + (i + 1) + '</span><span class="step-title">' + esc(s[0]) + '</span>' +
        '<span class="plus" aria-hidden="true"><span></span><span class="v"></span></span></button>' +
        '<div class="step-body" id="step-b' + i + '"' + (open ? '' : ' hidden') + '><p>' + esc(s[1]) + '</p></div></div>'
    }).join('')
  }

  function renderAchievements() {
    $('ach-list').innerHTML = t().achievements.items.map(function (a) {
      return '<li class="ach"><b>' + esc(a.num) + '</b><span>' + esc(a.text) + '</span></li>'
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
    var c = t()
    var fmt = FORMATS.filter(function (f) { return f.id === state.fmt })[0]
    $('fmt-chips').innerHTML = FORMATS.map(function (f) {
      var on = f.id === state.fmt
      return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-fmt="' + f.id +
        '" aria-pressed="' + on + '">' + esc(c.price.names[f.id]) + '</button>'
    }).join('')
    $('fmt-lines').innerHTML = c.price.lines[fmt.id].map(function (ln) { return '<li>' + esc(ln) + '</li>' }).join('')

    var base = num(D.PRICES[D.PACKAGES[0]][fmt.id][1])
    var last = D.PACKAGES.length - 1
    $('pkgs').innerHTML = D.PACKAGES.map(function (n, i) {
      var p = D.PRICES[n][fmt.id]
      var save = (base - num(p[1])) * n
      return '<div class="pkg pkg-' + i + (i === last ? ' pkg-top' : '') + '">' +
        '<p class="pkg-count">' + esc(c.price.counts[n]) + '</p>' +
        '<p class="price">' + esc(p[0]) + '</p>' +
        '<p class="rate">' + esc(p[1]) + ' ' + esc(c.price[fmt.perKey]) + '</p>' +
        '<p class="pkg-valid">' + esc(c.price.notes[n]) + '</p>' +
        (save > 0 ? '<p class="pkg-save">' + esc(c.price.save) + ' ' + money(save) + '</p>' : '') +
        '<a class="tile-cta" href="#book" data-pick="' + n + '">' + esc(c.price.choose) + ARROW + '</a></div>'
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
    renderPhotos()
    renderGoalChips()
    renderFits()
    renderSteps()
    renderAchievements()
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
    var el = e.target.closest('[data-lang],[data-goal],[data-step],[data-fmt],[data-pick]')
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
    } else if (el.hasAttribute('data-step')) {
      state.step = Number(el.getAttribute('data-step'))
      renderSteps()
      var head = document.querySelector('[data-step="' + state.step + '"]')
      if (head) head.focus()
    } else if (el.hasAttribute('data-fmt')) {
      state.fmt = el.getAttribute('data-fmt')
      renderPricing()
    } else if (el.hasAttribute('data-pick')) {
      // Carry the chosen package and format into the booking form
      var idx = FORMATS.map(function (f) { return f.id }).indexOf(state.fmt)
      $('f-format').selectedIndex = idx
      $('f-package').value = t().price.counts[el.getAttribute('data-pick')] + ' · ' + t().price.names[state.fmt]
    }
  })

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
  var SPY = ['about', 'teachers', 'prices', 'reviews', 'faq']
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
