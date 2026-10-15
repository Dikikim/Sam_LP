import { useEffect, useState } from 'react'
import { COPY, GOAL_IDS, LINKS, PACKAGES, PHRASES, PRICES } from './content.js'

const STEP_TINTS = [
  { bg: '#7a120d', ink: '#ffffff' },
  { bg: '#a91c14', ink: '#ffffff' },
  { bg: '#d92b21', ink: '#ffffff' },
  { bg: '#f6c9c5', ink: '#0a0a0a' },
]

const PLANS = [
  { id: 'pair', tone: 'grey', perKey: 'perPerson' },
  { id: 'solo', tone: 'red', perKey: 'perLesson' },
  { id: 'exam', tone: 'black', perKey: 'perLesson' },
]

function initialLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (fromUrl === 'en' || fromUrl === 'ua') return fromUrl
    const saved = window.localStorage.getItem('ews-lang')
    if (saved === 'en' || saved === 'ua') return saved
  } catch {
    // storage blocked: fall back to Ukrainian
  }
  return 'ua'
}

// Adds .is-in to every .reveal element once it scrolls into view.
function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-in)')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

function Arrow() {
  return <span className="arr" aria-hidden="true">→</span>
}

function PersonIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
      <circle cx="48" cy="34" r="16" />
      <path d="M16 84c4-17 17-26 32-26s28 9 32 26" />
    </svg>
  )
}

export default function App() {
  const [lang, setLang] = useState(initialLang)
  const [goal, setGoal] = useState('work')
  const [openStep, setOpenStep] = useState(0)
  const [pkg, setPkg] = useState(16)
  const [sent, setSent] = useState(false)
  const t = COPY[lang]

  useReveal(lang)

  useEffect(() => {
    document.documentElement.lang = lang === 'ua' ? 'uk' : 'en'
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      window.localStorage.setItem('ews-lang', lang)
    } catch {
      // ignore
    }
  }, [lang, t])

  const marquee = [...t.marquee, ...t.marquee, ...t.marquee, ...t.marquee]
  const prices = PRICES[pkg]

  function onSubmit(e) {
    e.preventDefault()
    // TODO: send the form data to a backend (Netlify Forms, Formspree, a Telegram bot...).
    setSent(true)
  }

  return (
    <div className="page">
      <a className="skip" href="#main">{lang === 'ua' ? 'До змісту' : 'Skip to content'}</a>

      {/* NAV */}
      <header className="nav wrap rise">
        <a href="#top" className="wordmark">
          <span className="dot" aria-hidden="true" />
          english with sam
        </a>
        <nav aria-label="Main" className="nav-links">
          <a href="#how">{t.nav.how}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="#prices">{t.nav.prices}</a>
          <a href="#faq">{t.nav.faq}</a>
        </nav>
        <div className="nav-right">
          <div className="lang-switch" role="group" aria-label={t.langLabel}>
            {[['ua', 'UA'], ['en', 'EN']].map(([id, label]) => (
              <button key={id} type="button" className={'lang' + (lang === id ? ' on' : '')} aria-pressed={lang === id} onClick={() => setLang(id)}>
                {label}
              </button>
            ))}
          </div>
          <a className="btn btn-sm nav-cta" href="#book">{t.nav.cta}</a>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section id="top" className="hero">
          <div className="hero-shape">
            <div className="hero-portrait">
              <img src="/sam.jpg" alt="Sam" width="800" height="800" fetchPriority="high" />
            </div>
            <div className="badge">
              <b>70%</b>
              <span>{t.hero.badge}</span>
            </div>
          </div>
          <div className="wrap hero-inner">
            <div className="hero-text">
              <h1 className="rise d1">{t.hero.h1}</h1>
              <p className="lead rise d2">{t.hero.lead}</p>
              <div className="hero-actions rise d3">
                <a className="btn" href="#book">{t.hero.cta} <Arrow /></a>
                <a className="text-link" href="#prices">{t.hero.second}</a>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {marquee.map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </div>

        {/* GOAL PICKER */}
        <section className="goal" aria-labelledby="goal-h">
          <div className="wrap split">
            <div className="reveal goal-left">
              <h2 id="goal-h" className="h2">{t.goal.h2}</h2>
              <p className="body">{t.goal.lead}</p>
              <div className="chips" role="group" aria-label={t.goal.h2}>
                {GOAL_IDS.map((id) => (
                  <button key={id} type="button" className={'chip chip-dark' + (goal === id ? ' on' : '')} aria-pressed={goal === id} onClick={() => setGoal(id)}>
                    {t.goal.labels[id]}
                  </button>
                ))}
              </div>
            </div>
            <div className="reveal goal-right">
              <p className="muted-light">{t.goal.pre}</p>
              <div className="phrases" key={goal + lang}>
                {PHRASES[goal].map((en, i) => (
                  <div className="phrase" key={en}>
                    <div className="phrase-en">{en}</div>
                    {t.goal.tr && <div className="phrase-tr">{t.goal.tr[goal][i]}</div>}
                  </div>
                ))}
              </div>
              <p className="body"><strong className="focus-label">{t.goal.focusLabel}</strong> {t.goal.focus[goal]}</p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="sec" aria-labelledby="how-h">
          <div className="wrap">
            <div className="split reveal intro">
              <h2 id="how-h" className="h2 col-left">{t.how.h2}</h2>
              <p className="body col-right">{t.how.lead}</p>
            </div>
            <div className="steps reveal">
              {t.how.steps.map(([name, text], i) => {
                const open = i === openStep
                return (
                  <div key={i} className={'step' + (open ? ' open' : '')} style={{ background: STEP_TINTS[i].bg, color: STEP_TINTS[i].ink }}>
                    {open ? (
                      <div className="step-open">
                        <h3>{name}</h3>
                        <p>{text}</p>
                      </div>
                    ) : (
                      <button type="button" className="sliver" aria-expanded="false" onClick={() => setOpenStep(i)}>
                        <span className="vname">{name}</span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="sec sec-about" aria-labelledby="about-h">
          <div className="about-panel reveal">
            <div className="split">
              <h2 id="about-h" className="h2 about-h">{t.about.h2}</h2>
              <div className="about-text">
                <div>
                  <h3>{t.about.whoH}</h3>
                  <p>{t.about.who}</p>
                </div>
                <div>
                  <h3>{t.about.howH}</h3>
                  <p>{t.about.how}</p>
                </div>
                <div><a className="btn" href="#book">{t.about.cta} <Arrow /></a></div>
              </div>
            </div>
            <div className="about-portrait">
              <img src="/sam.jpg" alt="Sam" width="800" height="800" loading="lazy" />
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="sec" aria-label={t.review.label}>
          <div className="wrap split">
            <div className="reveal rev-photo" role="img" aria-label={t.review.photo}>
              <PersonIcon />
              <span>{t.review.photo}</span>
            </div>
            <div className="reveal quote-col">
              <blockquote>{t.review.quote}</blockquote>
              <p className="cite"><strong>{t.review.name}</strong>, {t.review.role}</p>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="prices" className="sec" aria-labelledby="prices-h">
          <div className="wrap">
            <div className="price-head reveal">
              <h2 id="prices-h" className="h2">{t.price.h2}</h2>
              <div className="chips" role="group" aria-label={t.price.h2}>
                {PACKAGES.map((n) => (
                  <button key={n} type="button" className={'chip chip-light' + (pkg === n ? ' on' : '')} aria-pressed={pkg === n} onClick={() => setPkg(n)}>
                    {t.price.counts[n]}
                  </button>
                ))}
              </div>
              <p className="pkg-note">{t.price.notes[pkg]}</p>
            </div>
            <div className="tiles">
              {PLANS.map((p) => (
                <div key={p.id} className={'tile tile-' + p.tone}>
                  <div className="tile-body">
                    <h3>{t.price.names[p.id]}</h3>
                    <p className="price" key={pkg}>{prices[p.id][0]}</p>
                    <p className="rate">{prices[p.id][1]} {t.price[p.perKey]}</p>
                    <ul>
                      {t.price.lines[p.id].map((ln) => <li key={ln}>{ln}</li>)}
                    </ul>
                  </div>
                  <a className="tile-strip" href="#book">{t.price.choose} <Arrow /></a>
                </div>
              ))}
            </div>
            <p className="body trial-note reveal"><strong>{t.price.trialStrong}</strong> {t.price.trial}</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="sec" aria-labelledby="faq-h">
          <div className="wrap split faq-grid">
            <h2 id="faq-h" className="h2 faq-h">{t.faq.h2}</h2>
            <div className="faq-list">
              {t.faq.items.map((f) => (
                <details className="faq reveal" name="faq" key={f.q}>
                  <summary>
                    {f.q}
                    <span className="plus" aria-hidden="true"><span /><span className="v" /></span>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* BOOKING COUPON */}
        <section id="book" className="sec sec-book" aria-labelledby="book-h">
          <div className="wrap">
            <form className="coupon reveal" onSubmit={onSubmit}>
              <span className="notch notch-top" aria-hidden="true" />
              <span className="notch notch-bottom" aria-hidden="true" />
              <span className="perf" aria-hidden="true" />
              <div className="coupon-left">
                <h2 id="book-h">{t.form.h2}</h2>
                <p>{t.form.lead}</p>
              </div>
              <div className="coupon-right">
                {sent ? (
                  <div className="thanks" role="status">
                    <p>{t.form.thanks}</p>
                    <a className="btn btn-dark" href={LINKS.booking} target="_blank" rel="noreferrer">{t.form.orTelegram} <Arrow /></a>
                  </div>
                ) : (
                  <>
                    <label className="sr" htmlFor="f-name">{t.form.name}</label>
                    <input className="field" id="f-name" name="name" type="text" placeholder={t.form.name} autoComplete="name" required />
                    <label className="sr" htmlFor="f-handle">{t.form.handle}</label>
                    <input className="field" id="f-handle" name="handle" type="text" placeholder={t.form.handle} required />
                    <label className="sr" htmlFor="f-phone">{t.form.phone}</label>
                    <input className="field" id="f-phone" name="phone" type="tel" placeholder={t.form.phone} autoComplete="tel" inputMode="tel" />
                    <label className="sr" htmlFor="f-format">{t.form.format}</label>
                    <select className="field" id="f-format" name="format">
                      {t.form.options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                    <button type="submit" className="btn btn-dark btn-full">{t.form.submit} <Arrow /></button>
                  </>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="blocks reveal" role="img" aria-label="English with Sam">
            <div className="blk" style={{ height: '100%' }}>s</div>
            <div className="blk blk-dark" style={{ height: '74%' }}>a</div>
            <div className="blk" style={{ height: '88%' }}>m</div>
          </div>
          <div className="split foot-links">
            <nav aria-label="Footer" className="foot-nav">
              <a href="#how">{t.nav.how}</a>
              <a href="#about">{t.nav.about}</a>
              <a href="#prices">{t.nav.prices}</a>
              <a href="#faq">{t.nav.faq}</a>
            </nav>
            <div className="foot-social">
              <a href={LINKS.booking} target="_blank" rel="noreferrer">Telegram</a>
              <a href={LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a>
              <a href={LINKS.tiktok} target="_blank" rel="noreferrer">TikTok</a>
              <a href={LINKS.facebook} target="_blank" rel="noreferrer">Facebook</a>
              <a href={LINKS.channel} target="_blank" rel="noreferrer">{t.foot.channel}</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} English with Sam</span>
            <a className="btn btn-sm" href="#book">{t.nav.cta}</a>
          </div>
        </div>
      </footer>

      <a className="btn mobile-cta" href="#book">{t.hero.cta} <Arrow /></a>
    </div>
  )
}
