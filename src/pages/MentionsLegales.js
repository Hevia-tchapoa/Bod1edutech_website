import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import translations from '../data/translations';
import './MentionsLegales.css';

export default function MentionsLegales() {
  const { lang } = useLang();
  const t = translations[lang];
  const l = t.legal;

  useEffect(() => {
    document.title = `BOD1 EduTech — ${l.heroTitle}`;
    window.scrollTo(0, 0);
  }, [lang, l.heroTitle]);

  return (
    <main>
      {/* Hero */}
      <section className="page-hero page-hero--small">
        <div className="container page-hero__content">
          <span className="section-tag">{l.heroTag}</span>
          <h1 className="heading-lg text-white" style={{ marginTop: 12 }}>{l.heroTitle}</h1>
          <nav className="page-hero__breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/">{t.nav.home}</Link>
            <span>/</span>
            <span>{l.heroTitle}</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container legal-content">
          <p className="legal-date">
            {l.lastUpdate} : <strong>18 avril 2026</strong>
          </p>

          {l.sections.map((section, i) => (
            <div key={i} className="legal-section">
              <h2 className="legal-section__title">{section.title}</h2>
              <p className="legal-section__text" style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
            </div>
          ))}

          <div className="legal-back">
            <Link to="/" className="btn btn-outline-primary">
              ← {lang === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
            </Link>
            <Link to="/contact" className="btn btn-primary">
              {t.common.contact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
