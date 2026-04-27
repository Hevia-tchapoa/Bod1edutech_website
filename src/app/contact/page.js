'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang } from '../../contexts/LanguageContext';
import translations from '../../data/translations';
import '../../pages/Contact.css';

const socials = [
  { name: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/company/bod1edutech/' },
  { name: 'Facebook', icon: '📘', href: 'https://www.facebook.com/share/1DgzXuNvBf/' },
  { name: 'Instagram', icon: '📸', href: 'https://www.instagram.com/bod1edutech?igsh=MXh2YWtuYXppdWlxeg==' },
  { name: 'WhatsApp', icon: '💬', href: 'https://whatsapp.com/channel/0029VbCvGvv2UPB95TybB70V' },
];

export default function Contact() {
  const { lang } = useLang();
  const t = translations[lang];
  const c = t.contact;
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = `BOD1 EduTech — Contact`;
    window.scrollTo(0, 0);
  }, [lang]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const form = e.target;
    const data = {
      firstName: form.cfirst.value,
      lastName: form.clast.value,
      email: form.cemail.value,
      phone: form.cphone.value,
      subject: form.csubject.value,
      message: form.cmessage.value,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
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
            <span>{t.nav.contact}</span>
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container contact-main">
          <aside className="contact-info">
            <h2 className="heading-md">{c.infoTitle}</h2>
            <div className="contact-coords">
              {c.coords.map((coord, i) => (
                <div key={i} className="contact-coord">
                  <span className="contact-coord__icon">{coord.icon}</span>
                  <div>
                    <p className="contact-coord__label">{coord.label}</p>
                    <p className="contact-coord__value" style={{ whiteSpace: 'pre-line' }}>{coord.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-social">
              <h3 className="contact-social__title">{c.socialTitle}</h3>
              <div className="contact-social__links">
                {socials.map(s => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="contact-social__link" aria-label={s.name}>
                    {s.icon} {s.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="contact-map">
              <div className="contact-map__placeholder">
                <span>📍</span>
                <p>{lang === 'fr' ? 'Douala, Cameroun' : 'Douala, Cameroon'}</p>
                <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                  {lang === 'fr' ? 'Carte Google Maps — à intégrer' : 'Google Maps embed — to integrate'}
                </p>
              </div>
            </div>
          </aside>

          <div className="contact-form-wrap">
            <span className="section-tag">{c.formTag}</span>
            <h2 className="heading-lg" style={{ marginTop: 12 }}>{c.formTitle}</h2>

            {submitted ? (
              <div className="tarifs-form-success" style={{ marginTop: 32 }}>
                <div className="tarifs-form-success__icon">✅</div>
                <h3>{lang === 'fr' ? 'Message envoyé !' : 'Message sent!'}</h3>
                <p>{lang === 'fr' ? 'Merci ! Notre équipe vous répondra rapidement.' : 'Thank you! Our team will reply shortly.'}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
                  <label className="form-label" htmlFor="csubject">{c.formFields.subject} *</label>
                  <select className="form-select" id="csubject" name="csubject" required>
                    <option value="">—</option>
                    {c.formFields.subjectOptions.map((o, i) => <option key={i} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="cmessage">{c.formFields.message} *</label>
                  <textarea className="form-textarea" id="cmessage" name="cmessage" required style={{ minHeight: 160 }} />
                </div>
                {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
                <button type="submit" className="btn btn-primary btn-lg" disabled={sending}>
                  {sending ? (lang === 'fr' ? 'Envoi...' : 'Sending...') : c.formFields.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-header">
            <span className="section-tag">{c.faqTag}</span>
            <h2 className="heading-lg" style={{ marginTop: 12 }}>{c.faqTitle}</h2>
            <div className="section-divider" />
          </div>
          <div className="tarifs-faqs">
            {c.faqs.map((faq, i) => (
              <div key={i} className={`tarifs-faq${openFaq === i ? ' tarifs-faq--open' : ''}`}>
                <button className="tarifs-faq__question" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  {faq.q}
                  <span className="tarifs-faq__chevron">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <p className="tarifs-faq__answer">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
