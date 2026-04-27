'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '../../contexts/LanguageContext';
import translations from '../../data/translations';
import '../../pages/NosOffres.css';

const pilierData = [
  { key: 'programmation', to: '/notre-offre/programmation-robotique', icon: '🤖', color: '#5932E8', bgLight: 'rgba(89,50,232,0.07)' },
  { key: 'cybersecurite', to: '/notre-offre/cybersecurite', icon: '🛡️', color: '#E85932', bgLight: 'rgba(232,89,50,0.07)' },
  { key: 'ia', to: '/notre-offre/intelligence-artificielle', icon: '🧠', color: '#1A85C8', bgLight: 'rgba(26,133,200,0.07)' },
  { key: 'innovation', to: '/notre-offre/innovation-technologique', icon: '💡', color: '#28A87D', bgLight: 'rgba(40,168,125,0.07)' },
];

export default function NosOffres() {
  const { lang } = useLang();
  const t = translations[lang];

  useEffect(() => {
    document.title = `BOD1 EduTech — ${t.offre.heroTitle}`;
    window.scrollTo(0, 0);
  }, [lang, t.offre.heroTitle]);

  return (
    <main>
      <section className="page-hero" aria-label="Notre offre">
        <div className="container page-hero__content">
          <span className="section-tag">{t.offre.heroTag}</span>
          <h1 className="heading-xl text-white" style={{ marginTop: 12 }}>{t.offre.heroTitle}</h1>
          <p className="body-lg text-white" style={{ opacity: 0.8, maxWidth: 600, marginTop: 16 }}>{t.offre.heroSubtitle}</p>
          <nav className="page-hero__breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span>{t.nav.offre}</span>
          </nav>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div className="offre-intro">
            <div className="offre-intro__text">
              <span className="section-tag">{t.offre.introTag}</span>
              <h2 className="heading-lg" style={{ marginTop: 12 }}>{t.offre.introTitle}</h2>
              <p className="body-lg text-muted" style={{ marginTop: 16 }}>{t.offre.introText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="offre-grid">
            {pilierData.map((p) => {
              const pilier = t.piliers[p.key];
              return (
                <article key={p.key} className="offre-card" style={{ '--color': p.color, '--bg': p.bgLight }}>
                  <div className="offre-card__top">
                    <div className="offre-card__icon">{p.icon}</div>
                    <span className="offre-card__programme">{pilier.programme}</span>
                  </div>
                  <h2 className="offre-card__name">{pilier.name}</h2>
                  <p className="offre-card__tagline">{pilier.tagline}</p>
                  <p className="offre-card__desc">{pilier.description}</p>
                  <div className="offre-card__levels">
                    {pilier.niveaux.map((n, i) => (
                      <div key={i} className="offre-card__level">
                        <span className="offre-card__level-badge">{n.level}</span>
                        <span className="offre-card__level-age">{n.age}</span>
                        <p className="offre-card__level-skills">{n.skills}</p>
                      </div>
                    ))}
                  </div>
                  <Link href={p.to} className="btn btn-outline-primary offre-card__cta" style={{ color: p.color, borderColor: p.color }}>
                    {t.common.discover} →
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-section" aria-label="Inscription">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="heading-lg text-white" style={{ marginBottom: 16 }}>
            {lang === 'fr' ? 'Prêt à commencer ?' : 'Ready to get started?'}
          </h2>
          <p className="body-lg text-white" style={{ opacity: 0.8, maxWidth: 500, margin: '0 auto 32px' }}>
            {lang === 'fr' ? 'Inscrivez votre enfant dans le programme qui lui correspond le mieux.' : "Register your child in the programme that suits them best."}
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
