'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '../../contexts/LanguageContext';
import translations from '../../data/translations';
import '../../pages/NosProgrammes.css';

export default function NosProgrammes() {
  const { lang } = useLang();
  const t = translations[lang];
  const p = t.programmes;

  useEffect(() => {
    document.title = `BOD1 EduTech — ${p.heroTitle}`;
    window.scrollTo(0, 0);
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, [lang, p.heroTitle]);

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero__content">
          <span className="section-tag">{p.heroTag}</span>
          <h1 className="heading-xl text-white" style={{ marginTop: 12 }}>{p.heroTitle}</h1>
          <p className="body-lg text-white" style={{ opacity: 0.82, maxWidth: 600, marginTop: 16 }}>{p.heroSubtitle}</p>
          <nav className="page-hero__breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span>{t.nav.programmes}</span>
          </nav>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <span className="section-tag">{p.introTag}</span>
            <h2 className="heading-lg" style={{ marginTop: 12 }}>{p.introTitle}</h2>
            <p className="body-lg text-muted" style={{ marginTop: 16 }}>{p.introText}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{p.organisationTag}</span>
            <h2 className="heading-lg" style={{ marginTop: 12 }}>{p.organisationTitle}</h2>
            <div className="section-divider" />
          </div>
          <div className="prog-org-grid">
            {p.orgItems.map((item, i) => (
              <div key={i} className="prog-org-card">
                <div className="prog-org-card__icon">{item.icon}</div>
                <div>
                  <h3 className="prog-org-card__label">{item.label}</h3>
                  <p className="prog-org-card__value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {p.levels.map((level, i) => (
        <section
          key={level.key}
          id={level.key}
          className={`section prog-level-section${i % 2 === 0 ? ' section--purple-light' : ''}`}
          style={{ '--lcolor': level.color, '--lbg': level.bgColor }}
        >
          <div className="container">
            <div className="prog-level-header">
              <div className="prog-level-badge-wrap">
                <span className="prog-level-icon">{level.icon}</span>
                <div>
                  <span className="prog-level-tag">{level.age}</span>
                  <h2 className="heading-lg prog-level-name">{level.name}</h2>
                  <p className="prog-level-subtitle">{level.subtitle}</p>
                </div>
              </div>
              <div className="prog-level-meta-box">
                <div className="prog-level-meta-item">
                  <span className="prog-level-meta-label">{lang === 'fr' ? 'Durée du cycle' : 'Cycle duration'}</span>
                  <span className="prog-level-meta-value">{level.duration}</span>
                </div>
                <div className="prog-level-meta-divider" />
                <div className="prog-level-meta-item">
                  <span className="prog-level-meta-label">{lang === 'fr' ? 'Durée des séances' : 'Session duration'}</span>
                  <span className="prog-level-meta-value">{level.sessionDuration}</span>
                </div>
              </div>
            </div>
            <div className="prog-level-photo">
              <img src={`/images/prog-${level.key}.jpg`} alt="" onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
            <div className="prog-level-objective">
              <span className="prog-level-obj-label">{lang === 'fr' ? 'Objectif général' : 'General objective'}</span>
              <p className="prog-level-obj-text">{level.objective}</p>
            </div>
            <p className="body-lg text-muted prog-level-desc">{level.description}</p>
            <div className="prog-level-content">
              <h3 className="prog-level-content-title">{lang === 'fr' ? 'Au programme :' : 'What you will learn:'}</h3>
              <div className="prog-content-grid">
                {level.content.map((c, j) => (
                  <div key={j} className="prog-content-card">
                    <h4 className="prog-content-card__pilier">{c.pilier}</h4>
                    <ul className="prog-content-card__items">
                      {c.items.map((item, k) => <li key={k}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/tarifs" className="btn btn-primary" style={{ marginTop: 32 }}>
              {lang === 'fr' ? `S'inscrire au niveau ${level.name}` : `Register for ${level.name}`}
            </Link>
          </div>
        </section>
      ))}

      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="heading-lg text-white" style={{ marginBottom: 16 }}>
            {lang === 'fr' ? 'Trouvez le niveau de votre enfant' : "Find your child's level"}
          </h2>
          <p className="body-lg text-white" style={{ opacity: 0.8, maxWidth: 500, margin: '0 auto 32px' }}>
            {lang === 'fr' ? 'Notre équipe vous aidera à choisir le parcours le plus adapté à votre enfant.' : 'Our team will help you choose the journey best suited to your child.'}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/tarifs" className="btn btn-secondary btn-lg">{t.common.register}</Link>
            <Link href="/contact" className="btn btn-outline btn-lg">{t.common.contact}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
