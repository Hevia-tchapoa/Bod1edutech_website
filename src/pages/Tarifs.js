import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import translations from '../data/translations';
import './Tarifs.css';

export default function Tarifs() {
  const { lang } = useLang();
  const t = translations[lang];
  const tr = t.tarifs;
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = `BOD1 EduTech — ${tr.heroTitle}`;
    window.scrollTo(0, 0);
  }, [lang, tr.heroTitle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="container page-hero__content">
          <span className="section-tag">{tr.heroTag}</span>
          <h1 className="heading-xl text-white" style={{ marginTop: 12 }}>{tr.heroTitle}</h1>
          <p className="body-lg text-white" style={{ opacity: 0.82, maxWidth: 600, marginTop: 16 }}>{tr.heroSubtitle}</p>
          <nav className="page-hero__breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/">{t.nav.home}</Link>
            <span>/</span>
            <span>{t.nav.tarifs}</span>
          </nav>
        </div>
      </section>

      {/* Steps */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">{tr.inscriptionTag}</span>
            <h2 className="heading-lg" style={{ marginTop: 12 }}>{tr.inscriptionTitle}</h2>
            <div className="section-divider center" />
          </div>
          <div className="tarifs-steps">
            {tr.steps.map((s, i) => (
              <div key={i} className="tarifs-step">
                <div className="tarifs-step__num">{s.num}</div>
                <h3 className="tarifs-step__title">{s.title}</h3>
                <p className="tarifs-step__desc">{s.desc}</p>
                {i < tr.steps.length - 1 && <div className="tarifs-step__arrow" aria-hidden="true">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulas */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">{tr.formatsTag}</span>
            <h2 className="heading-lg" style={{ marginTop: 12 }}>{tr.formatsTitle}</h2>
            <div className="section-divider center" />
          </div>
          <div className="tarifs-formats">
            {tr.formats.map((f, i) => (
              <div key={i} className={`tarifs-format-card${i === 0 ? ' tarifs-format-card--featured' : ''}`}>
                {f.badge && <div className="tarifs-format-badge">{f.badge}</div>}
                <div className="tarifs-format-card__icon">{f.icon}</div>
                <span className="tarifs-format-card__subtitle">{f.subtitle}</span>
                <h3 className="tarifs-format-card__title">{f.title}</h3>
                <p className="tarifs-format-card__desc">{f.desc}</p>
                <ul className="tarifs-format-card__features">
                  {f.features.map((feat, j) => (
                    <li key={j}>
                      <span className="tarifs-format-check">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link to="#formulaire" className="btn btn-primary tarifs-format-cta">
                  {lang === 'fr' ? "S'inscrire →" : 'Register →'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For schools */}
      <section className="section section--gradient">
        <div className="container tarifs-school">
          <div className="tarifs-school__content">
            <span className="section-tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.2)' }}>
              {tr.schoolTag}
            </span>
            <h2 className="heading-lg text-white" style={{ marginTop: 12 }}>{tr.schoolTitle}</h2>
            <p className="body-lg text-white" style={{ opacity: 0.8, marginTop: 16 }}>{tr.schoolText}</p>
            <Link to="/contact" className="btn btn-secondary btn-lg" style={{ marginTop: 28 }}>
              {tr.schoolBtn} →
            </Link>
          </div>
          <div className="tarifs-school__visual" aria-hidden="true">
            <span className="tarifs-school__emoji">🏫</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--light">
        <div className="container tarifs-faq-wrap">
          <div className="section-header">
            <span className="section-tag">{tr.faqTag}</span>
            <h2 className="heading-lg" style={{ marginTop: 12 }}>{tr.faqTitle}</h2>
            <div className="section-divider" />
          </div>
          <div className="tarifs-faqs">
            {tr.faqs.map((faq, i) => (
              <div key={i} className={`tarifs-faq${openFaq === i ? ' tarifs-faq--open' : ''}`}>
                <button
                  className="tarifs-faq__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {faq.q}
                  <span className="tarifs-faq__chevron">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <p className="tarifs-faq__answer">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section" id="formulaire" aria-labelledby="form-title">
        <div className="container tarifs-form-wrap">
          <div className="tarifs-form-intro">
            <span className="section-tag">{tr.formTag}</span>
            <h2 className="heading-lg" id="form-title" style={{ marginTop: 12 }}>{tr.formTitle}</h2>
            <div className="section-divider" />
            <p className="body-lg text-muted" style={{ marginTop: 16 }}>{tr.formSubtitle}</p>
          </div>

          {submitted ? (
            <div className="tarifs-form-success">
              <div className="tarifs-form-success__icon">✅</div>
              <h3>{lang === 'fr' ? 'Pré-inscription envoyée !' : 'Pre-registration sent!'}</h3>
              <p>{lang === 'fr' ? 'Merci ! Notre équipe vous recontacte sous 48h.' : 'Thank you! Our team will contact you within 48h.'}</p>
            </div>
          ) : (
            <form className="tarifs-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="parentFirst">{tr.formFields.parentFirst} *</label>
                  <input className="form-input" id="parentFirst" type="text" required placeholder={tr.formFields.parentFirst} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="parentLast">{tr.formFields.parentLast} *</label>
                  <input className="form-input" id="parentLast" type="text" required placeholder={tr.formFields.parentLast} />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">{tr.formFields.email} *</label>
                  <input className="form-input" id="email" type="email" required placeholder="exemple@email.com" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">{tr.formFields.phone} *</label>
                  <input className="form-input" id="phone" type="tel" required placeholder="+237 XXX XXX XXX" />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="childFirst">{tr.formFields.childFirst} *</label>
                  <input className="form-input" id="childFirst" type="text" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="childAge">{tr.formFields.childAge} *</label>
                  <input className="form-input" id="childAge" type="number" min="7" max="18" required />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="level">{tr.formFields.level} *</label>
                  <select className="form-select" id="level" required>
                    <option value="">—</option>
                    {tr.formFields.levelOptions.map((o, i) => <option key={i} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="format">{tr.formFields.format} *</label>
                  <select className="form-select" id="format" required>
                    <option value="">—</option>
                    {tr.formFields.formatOptions.map((o, i) => <option key={i} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">{tr.formFields.message}</label>
                <textarea className="form-textarea" id="message" placeholder="..." />
              </div>
              <div className="tarifs-form__footer">
                <p className="tarifs-form__note">{tr.formFields.note}</p>
                <button type="submit" className="btn btn-primary btn-lg">{tr.formFields.submit}</button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
