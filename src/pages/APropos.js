import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import translations from '../data/translations';
import './APropos.css';

export default function APropos() {
  const { lang } = useLang();
  const t = translations[lang];
  const a = t.apropos;

  useEffect(() => {
    document.title = `BOD1 EduTech — ${lang === 'fr' ? 'À propos de nous' : 'About us'}`;
    window.scrollTo(0, 0);
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, [lang]);

  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="container page-hero__content">
          <span className="section-tag">{a.heroTag}</span>
          <h1 className="heading-xl text-white" style={{ marginTop: 12 }}>{a.heroTitle}</h1>
          <p className="body-lg text-white" style={{ opacity: 0.82, maxWidth: 600, marginTop: 16 }}>{a.heroSubtitle}</p>
          <nav className="page-hero__breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/">{t.nav.home}</Link>
            <span>/</span>
            <span>{t.nav.apropos}</span>
          </nav>
        </div>
      </section>

      {/* Présentation */}
      <section className="section" id="presentation">
        <div className="container apropos-presentation">
          <div className="apropos-presentation__content">
            <span className="section-tag">{a.presentationTag}</span>
            <h2 className="heading-lg" style={{ marginTop: 12 }}>{a.presentationTitle}</h2>
            <div className="section-divider" />
            <p className="body-lg text-muted" style={{ marginTop: 20 }}>{a.presentationText}</p>

            <div className="apropos-highlights">
              <div className="apropos-highlight">
                <span className="apropos-highlight__num">7–18</span>
                <span className="apropos-highlight__label">{lang === 'fr' ? 'ans accompagnés' : 'years supported'}</span>
              </div>
              <div className="apropos-highlight">
                <span className="apropos-highlight__num">4</span>
                <span className="apropos-highlight__label">{lang === 'fr' ? 'piliers technologiques' : 'technology pillars'}</span>
              </div>
              <div className="apropos-highlight">
                <span className="apropos-highlight__num">🇨🇲</span>
                <span className="apropos-highlight__label">{lang === 'fr' ? 'Cameroun' : 'Cameroon'}</span>
              </div>
            </div>
          </div>
          <div className="apropos-presentation__visual" aria-hidden="true">
            <div className="apropos-visual-card">
              <div className="apropos-visual-card__emoji">🚀</div>
              <h3 className="apropos-visual-card__title">BOD1 EduTech</h3>
              <p className="apropos-visual-card__slogan">
                {lang === 'fr' ? 'Sois créatif, sois smart.' : 'Be creative, be smart.'}
              </p>
              <div className="apropos-visual-card__tags">
                <span>🤖 Programmation</span>
                <span>🛡️ Cybersécurité</span>
                <span>🧠 IA</span>
                <span>💡 Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section section--gradient" id="vision" aria-labelledby="vision-title">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.2)' }}>
              {a.visionTag}
            </span>
            <h2 className="heading-lg text-white" id="vision-title" style={{ marginTop: 12 }}>{a.visionTitle}</h2>
            <div className="section-divider center" style={{ background: 'var(--secondary-light)' }} />
          </div>

          <div className="apropos-vision-grid">
            <div className="apropos-vision-card">
              <div className="apropos-vision-card__icon">🔭</div>
              <h3 className="apropos-vision-card__title">{a.vision.title}</h3>
              <p className="apropos-vision-card__text">{a.vision.text}</p>
            </div>
            <div className="apropos-vision-card">
              <div className="apropos-vision-card__icon">🎯</div>
              <h3 className="apropos-vision-card__title">{a.mission.title}</h3>
              <p className="apropos-vision-card__text">{a.mission.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section section--light" aria-labelledby="valeurs-title">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">{a.valuesTag}</span>
            <h2 className="heading-lg" id="valeurs-title" style={{ marginTop: 12 }}>{a.valuesTitle}</h2>
            <div className="section-divider center" />
          </div>

          <div className="apropos-values-grid">
            {a.values.map((v, i) => (
              <div key={i} className="apropos-value-card">
                <div className="apropos-value-card__icon">{v.icon}</div>
                <h3 className="apropos-value-card__title">{v.title}</h3>
                <p className="apropos-value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="section" id="equipe" aria-labelledby="equipe-title">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{a.equipeTag}</span>
            <h2 className="heading-lg" id="equipe-title" style={{ marginTop: 12 }}>{a.equipeTitle}</h2>
            <div className="section-divider" />
            <p className="body-lg text-muted" style={{ marginTop: 16, maxWidth: 640 }}>{a.equipeSubtitle}</p>
          </div>

          <div className="apropos-team-placeholder">
            <div className="apropos-team-placeholder__inner">
              <span className="apropos-team-placeholder__icon">👥</span>
              <p className="apropos-team-placeholder__text">{a.equipeComingSoon}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rejoindre */}
      <section className="cta-section" aria-labelledby="join-title">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.2)' }}>
            {a.joinTag}
          </span>
          <h2 className="heading-lg text-white" id="join-title" style={{ marginTop: 16, marginBottom: 16 }}>{a.joinTitle}</h2>
          <p className="body-lg text-white" style={{ opacity: 0.8, maxWidth: 560, margin: '0 auto 32px' }}>{a.joinText}</p>
          <Link to="/carriere" className="btn btn-secondary btn-lg">{a.joinBtn} →</Link>
        </div>
      </section>
    </main>
  );
}
