import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import translations from '../data/translations';
import './Carriere.css';

export default function Carriere() {
  const { lang } = useLang();
  const t = translations[lang];
  const c = t.carriere;
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = `BOD1 EduTech — ${lang === 'fr' ? 'Carrière' : 'Careers'}`;
    window.scrollTo(0, 0);
  }, [lang]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="container page-hero__content">
          <span className="section-tag">{c.heroTag}</span>
          <h1 className="heading-xl text-white" style={{ marginTop: 12 }}>{c.heroTitle}</h1>
          <p className="body-lg text-white" style={{ opacity: 0.82, maxWidth: 600, marginTop: 16 }}>{c.heroSubtitle}</p>
          <nav className="page-hero__breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/">{t.nav.home}</Link>
            <span>/</span>
            <span>{t.nav.carriere}</span>
          </nav>
        </div>
      </section>

      {/* Why join */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{c.whyTag}</span>
            <h2 className="heading-lg" style={{ marginTop: 12 }}>{c.whyTitle}</h2>
            <div className="section-divider" />
          </div>
          <div className="carriere-why-grid">
            {c.whyPoints.map((w, i) => (
              <div key={i} className="carriere-why-card">
                <div className="carriere-why-card__icon">{w.icon}</div>
                <h3 className="carriere-why-card__title">{w.title}</h3>
                <p className="carriere-why-card__desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidature spontanée */}
      <section className="section">
        <div className="container">
          <div className="carriere-spontane">
            <div className="carriere-spontane__icon">💌</div>
            <div>
              <h3 className="carriere-spontane__title">{c.spontaneTag}</h3>
              <p className="carriere-spontane__text">{c.spontaneText}</p>
            </div>
            <a href="#postuler" className="btn btn-outline-primary">{t.common.apply}</a>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section section--light" id="postuler" aria-labelledby="postuler-title">
        <div className="container carriere-form-wrap">
          <div className="carriere-form-intro">
            <span className="section-tag">{c.formTag}</span>
            <h2 className="heading-lg" id="postuler-title" style={{ marginTop: 12 }}>{c.formTitle}</h2>
            <div className="section-divider" />
          </div>

          {submitted ? (
            <div className="tarifs-form-success">
              <div className="tarifs-form-success__icon">✅</div>
              <h3>{lang === 'fr' ? 'Candidature envoyée !' : 'Application sent!'}</h3>
              <p>{lang === 'fr' ? 'Merci ! Nous étudierons votre candidature et vous recontacterons.' : 'Thank you! We will review your application and get back to you.'}</p>
            </div>
          ) : (
            <form className="carriere-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="civility">{c.formFields.civility}</label>
                <select className="form-select" id="civility">
                  {c.formFields.civilityOptions.map((o, i) => <option key={i}>{o}</option>)}
                </select>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="cfirst">{c.formFields.firstName} *</label>
                  <input className="form-input" id="cfirst" type="text" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="clast">{c.formFields.lastName} *</label>
                  <input className="form-input" id="clast" type="text" required />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="cemail">{c.formFields.email} *</label>
                  <input className="form-input" id="cemail" type="email" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="cphone">{c.formFields.phone}</label>
                  <input className="form-input" id="cphone" type="tel" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cposte">{c.formFields.poste} *</label>
                <select className="form-select" id="cposte" required>
                  <option value="spontanee">{lang === 'fr' ? 'Candidature spontanée' : 'Speculative application'}</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="ccv">{c.formFields.cv} *</label>
                <input className="form-input" id="ccv" type="file" accept=".pdf,.doc,.docx" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="clm">{c.formFields.lm}</label>
                <input className="form-input" id="clm" type="file" accept=".pdf,.doc,.docx" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cmessage">{c.formFields.message}</label>
                <textarea className="form-textarea" id="cmessage" />
              </div>
              <button type="submit" className="btn btn-primary btn-lg">{c.formFields.submit}</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
