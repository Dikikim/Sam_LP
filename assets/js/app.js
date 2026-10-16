/* English with Sam: page behaviour. Plain JS, no build step. */
(function () {
  'use strict'

  var D = window.EWS
  var COPY = D.COPY

  var STEP_TINTS = [
    { bg: '#1f2148', ink: '#ffffff' },
    { bg: '#2563eb', ink: '#ffffff' },
    { bg: 'linear-gradient(160deg, #ffb627, #f7931e)', ink: '#1f2148' },
    { bg: '#ffe7a8', ink: '#1f2148' },
  ]
  var PLANS = [
    { id: 'pair', featured: false, perKey: 'perPerson', icon: 'i-users', tone: 'ico-blue' },
    { id: 'solo', featured: true, perKey: 'perLesson', icon: 'i-user', tone: '' },
    { id: 'exam', featured: false, perKey: 'perLesson', icon: 'i-case', tone: 'ico-yellow' },
  ]
  function icon(id, tone) {
    return '<span class="ico ' + tone + '"><svg aria-hidden="true"><use href="#' + id + '"/></svg></span>'
  }

  var state = { lang: initialLang(), goal: 'work', step: 0, pkg: 16 }

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
    if (!$('marquee')) return
    var items = t().marquee
    var all = items.concat(items, items, items)
    $('marquee').innerHTML = all.map(function (m) { return '<span>' + esc(m) + '</span>' }).join('')
  }

  function renderGoalChips() {
    var c = t()
    $('goal-chips').innerHTML = D.GOAL_IDS.map(function (id) {
      var on = id === state.goal
      return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-goal="' + id +
        '" aria-pressed="' + on + '">' + esc(c.goal.labels[id]) + '</button>'
    }).join('')
  }

  function renderPhrases() {
    var c = t()
    $('phrases').innerHTML = D.PHRASES[state.goal].map(function (en, i) {
      var tr = c.goal.tr ? c.goal.tr[state.goal][i] : ''
      return '<div class="phrase"><div class="phrase-en">' + esc(en) + '</div>' +
        (tr ? '<div class="phrase-tr">' + esc(tr) + '</div>' : '') + '</div>'
    }).join('')
    $('goal-focus').textContent = c.goal.focus[state.goal]
  }

  function renderSteps() {
    $('steps').innerHTML = t().how.steps.map(function (s, i) {
      var open = i === state.step
      var tint = STEP_TINTS[i]
      var inner = open
        ? '<div class="step-open"><h3>' + esc(s[0]) + '</h3><p>' + esc(s[1]) + '</p></div>'
        : '<button type="button" class="sliver" data-step="' + i + '" aria-expanded="false"><span class="vname">' + esc(s[0]) + '</span></button>'
      return '<div class="step' + (open ? ' open' : '') + '" style="background:' + tint.bg + ';color:' + tint.ink + '">' + inner + '</div>'
    }).join('')
  }

  function renderPricing() {
    var c = t()
    var prices = D.PRICES[state.pkg]
    $('pkg-chips').innerHTML = D.PACKAGES.map(function (n) {
      var on = n === state.pkg
      return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-pkg="' + n +
        '" aria-pressed="' + on + '">' + esc(c.price.counts[n]) + '</button>'
    }).join('')
    $('pkg-note').textContent = c.price.notes[state.pkg]
    $('tiles').innerHTML = PLANS.map(function (p) {
      return '<div class="tile' + (p.featured ? ' tile-featured' : '') + '">' + icon(p.icon, p.tone) +
        '<h3>' + esc(c.price.names[p.id]) + '</h3>' +
        '<p class="price">' + esc(prices[p.id][0]) + '</p>' +
        '<p class="rate">' + esc(prices[p.id][1]) + ' ' + esc(c.price[p.perKey]) + '</p>' +
        '<ul>' + c.price.lines[p.id].map(function (ln) { return '<li>' + esc(ln) + '</li>' }).join('') + '</ul>' +
        '<a class="tile-cta" href="#book">' + esc(c.price.choose) + ARROW + '</a></div>'
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
    renderPhrases()
    renderSteps()
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
    var el = e.target.closest('[data-lang],[data-goal],[data-step],[data-pkg]')
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
      renderPhrases()
    } else if (el.hasAttribute('data-step')) {
      state.step = Number(el.getAttribute('data-step'))
      renderSteps()
    } else if (el.hasAttribute('data-pkg')) {
      state.pkg = Number(el.getAttribute('data-pkg'))
      renderPricing()
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
  if ('IntersectionObserver' in window) {
    var links = document.querySelectorAll('.nav-links a')
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return
        links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id) })
      })
    }, { rootMargin: '-45% 0px -50% 0px' })
    ;['how', 'about', 'prices', 'faq'].forEach(function (id) { if ($(id)) spy.observe($(id)) })
  }

  $('year').textContent = new Date().getFullYear()
  renderAll()
})()
