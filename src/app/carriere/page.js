'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang } from '../../contexts/LanguageContext';
import translations from '../../data/translations';
import '../../pages/Carriere.css';

export default function Carriere() {
  const { lang } = useLang();
  const t = translations[lang];
  const c = t.carriere;
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = `BOD1 EduTech — ${lang === 'fr' ? 'Carrière' : 'Careers'}`;
    window.scrollTo(0, 0);
  }, [lang]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const form = e.target;
    const formData = new FormData();
    formData.append('civility', form.civility.value);
    formData.append('firstName', form.cfirst.value);
    formData.append('lastName', form.clast.value);
    formData.append('email', form.cemail.value);
    formData.append('phone', form.cphone.value);
    formData.append('poste', form.cposte.value);
    formData.append('message', form.cmessage.value);
    if (form.ccv.files[0]) formData.append('cv', form.ccv.files[0]);
    if (form.clm.files[0]) formData.append('lm', form.clm.files[0]);

    try {
      const res = await fetch('/api/carriere', { method: 'POST', body: formData });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(lang === 'fr' ? "Une erreur est survenue. Veuillez réessayer." : "An error occurred. Please try again.");
      }
    } catch {
      setError(lang === 'fr' ? "Une erreur est survenue. Veuillez réessayer." : "An error occurred. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero__content">
          <span className="section-tag">{c.heroTag}</span>
          <h1 className="heading-xl text-white" style={{ marginTop: 12 }}>{c.heroTitle}</h1>
          <p className="body-lg text-white" style={{ opacity: 0.82, maxWidth: 600, marginTop: 16 }}>{c.heroSubtitle}</p>
          <nav className="page-hero__breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span>{t.nav.carriere}</span>
          </nav>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div className="carriere-why-layout">
            <div className="carriere-why-photo">
              <img src="/images/carriere-photo.jpg" alt="" onError={(e) => { e.target.style.display = 'none'; }} />
              <div className="carriere-why-photo__badge">
                <span className="carriere-why-photo__badge-icon">🎓</span>
                <span>{lang === 'fr' ? 'Rejoins l\'équipe' : 'Join the team'}</span>
              </div>
            </div>
            <div className="carriere-why-content">
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
          </div>
        </div>
      </section>

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
                <select className="form-select" id="civility" name="civility">
                  {c.formFields.civilityOptions.map((o, i) => <option key={i}>{o}</option>)}
                </select>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="cfirst">{c.formFields.firstName} *</label>
                  <input className="form-input" id="cfirst" name="cfirst" type="text" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="clast">{c.formFields.lastName} *</label>
                  <input className="form-input" id="clast" name="clast" type="text" required />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="cemail">{c.formFields.email} *</label>
                  <input className="form-input" id="cemail" name="cemail" type="email" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="cphone">{c.formFields.phone}</label>
                  <input className="form-input" id="cphone" name="cphone" type="tel" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cposte">{c.formFields.poste} *</label>
                <select className="form-select" id="cposte" name="cposte" required>
                  <option value="spontanee">{lang === 'fr' ? 'Candidature spontanée' : 'Speculative application'}</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="ccv">{c.formFields.cv} *</label>
                <input className="form-input" id="ccv" name="ccv" type="file" accept=".pdf,.doc,.docx" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="clm">{c.formFields.lm}</label>
                <input className="form-input" id="clm" name="clm" type="file" accept=".pdf,.doc,.docx" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cmessage">{c.formFields.message}</label>
                <textarea className="form-textarea" id="cmessage" name="cmessage" />
              </div>
              {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
              <button type="submit" className="btn btn-primary btn-lg" disabled={sending}>
                {sending ? (lang === 'fr' ? 'Envoi...' : 'Sending...') : c.formFields.submit}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
