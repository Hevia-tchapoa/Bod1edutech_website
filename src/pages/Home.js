import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import translations from '../data/translations';
import './Home.css';

const pilierData = [
  {
    key: 'programmation',
    to: '/notre-offre/programmation-robotique',
    icon: 'fa-solid fa-microchip',
    color: '#5932E8',
    bgLight: 'rgba(89,50,232,0.08)',
    borderColor: 'rgba(89,50,232,0.2)',
  },
  {
    key: 'cybersecurite',
    to: '/notre-offre/cybersecurite',
    icon: 'fa-solid fa-shield-halved',
    color: '#E05533',
    bgLight: 'rgba(224,85,51,0.08)',
    borderColor: 'rgba(224,85,51,0.2)',
  },
  {
    key: 'ia',
    to: '/notre-offre/intelligence-artificielle',
    icon: 'fa-solid fa-brain',
    color: '#1A7FC1',
    bgLight: 'rgba(26,127,193,0.08)',
    borderColor: 'rgba(26,127,193,0.2)',
  },
  {
    key: 'innovation',
    to: '/notre-offre/innovation-technologique',
    icon: 'fa-solid fa-lightbulb',
    color: '#1E9E72',
    bgLight: 'rgba(30,158,114,0.08)',
    borderColor: 'rgba(30,158,114,0.2)',
  },
];

const dashboardSubjects = [
  { icon: 'fa-solid fa-microchip', color: '#5932E8', progress: 78 },
  { icon: 'fa-solid fa-shield-halved', color: '#E05533', progress: 65 },
  { icon: 'fa-solid fa-brain', color: '#1A7FC1', progress: 82 },
  { icon: 'fa-solid fa-lightbulb', color: '#1E9E72', progress: 71 },
];

const whyPoints = {
  fr: [
    { icon: 'fa-solid fa-hands-holding-child', title: 'Pédagogie adaptée à l\'âge', desc: 'Des méthodes conçues spécifiquement pour les 7-18 ans : apprentissage par le jeu, projets concrets, progression structurée.' },
    { icon: 'fa-solid fa-certificate', title: 'Certification reconnue', desc: 'Chaque niveau est sanctionné par une certification BOD1 attestant les compétences de votre enfant.' },
    { icon: 'fa-solid fa-chalkboard-user', title: 'Formateurs passionnés', desc: 'Notre équipe de formateurs combine expertise technique et passion de l\'enseignement aux jeunes.' },
    { icon: 'fa-solid fa-code', title: '4 domaines complémentaires', desc: 'Programmation, cybersécurité, IA et innovation — une formation complète pour le monde de demain.' },
    { icon: 'fa-solid fa-users', title: 'Formats flexibles', desc: 'Clubs périscolaires pendant l\'année et stages intensifs pendant les vacances, selon votre agenda.' },
    { icon: 'fa-solid fa-earth-africa', title: 'Ancré au Cameroun', desc: 'Des contenus pédagogiques adaptés au contexte africain, pour former des acteurs du développement local.' },
  ],
  en: [
    { icon: 'fa-solid fa-hands-holding-child', title: 'Age-adapted pedagogy', desc: 'Methods designed specifically for ages 7-18: game-based learning, real projects, structured progression.' },
    { icon: 'fa-solid fa-certificate', title: 'Recognized certification', desc: 'Each level is certified by a BOD1 certificate attesting your child\'s skills.' },
    { icon: 'fa-solid fa-chalkboard-user', title: 'Passionate instructors', desc: 'Our team combines technical expertise with a passion for teaching young learners.' },
    { icon: 'fa-solid fa-code', title: '4 complementary domains', desc: 'Programming, cybersecurity, AI and innovation — complete training for tomorrow\'s world.' },
    { icon: 'fa-solid fa-users', title: 'Flexible formats', desc: 'After-school clubs during the year and intensive holiday camps, to fit your schedule.' },
    { icon: 'fa-solid fa-earth-africa', title: 'Rooted in Cameroon', desc: 'Educational content adapted to the African context, training tomorrow\'s local innovators.' },
  ],
};

const testimonials = {
  fr: [
    {
      text: "Mon fils de 12 ans s'est transformé depuis BOD1. Il crée ses propres jeux, comprend l'informatique, et surtout — il adore ça. C'est le meilleur investissement que j'aie fait pour son avenir.",
      name: "Clarisse Nkengne",
      role: "Mère de famille · Yaoundé",
      initials: "CN",
    },
    {
      text: "En tant que directrice d'école, j'ai été bluffée par la pédagogie de BOD1. Les formateurs savent s'adapter à chaque enfant. Nos élèves reviennent plus confiants, plus curieux, plus créatifs.",
      name: "Dr. Marie-France Bella",
      role: "Directrice d'école · Douala",
      initials: "MB",
    },
    {
      text: "Ma fille a appris à coder en quelques mois avec BOD1. Elle a même créé un site pour notre commerce familial. Je recommande à tous les parents qui veulent préparer leurs enfants à l'avenir.",
      name: "Samuel Tchoffo",
      role: "Entrepreneur · Bafoussam",
      initials: "ST",
    },
  ],
  en: [
    {
      text: "My 12-year-old son has transformed since BOD1. He creates his own games, understands computers, and above all — he loves it. Best investment I've made for his future.",
      name: "Clarisse Nkengne",
      role: "Parent · Yaoundé",
      initials: "CN",
    },
    {
      text: "As a school principal, BOD1's pedagogy impressed me greatly. Their instructors know how to adapt to each child. Our students come back more confident, curious, and creative.",
      name: "Dr. Marie-France Bella",
      role: "School Principal · Douala",
      initials: "MB",
    },
    {
      text: "My daughter learned to code in a few months with BOD1. She even built a website for our family business. I recommend it to every parent who wants to prepare their children for the future.",
      name: "Samuel Tchoffo",
      role: "Entrepreneur · Bafoussam",
      initials: "ST",
    },
  ],
};

export default function Home() {
  const { lang } = useLang();
  const t = translations[lang];
  const h = t.home;
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    document.title = lang === 'fr'
      ? "BOD1 EduTech — Programme d'éducation technologique au Cameroun"
      : "BOD1 EduTech — Technology Education Program in Cameroon";
  }, [lang]);

  const subjLabels = {
    fr: ['Prog & Robotique', 'Cybersécurité', 'Intelligence Artificielle', 'Innovation'],
    en: ['Prog & Robotics', 'Cybersecurity', 'Artificial Intelligence', 'Innovation'],
  };

  return (
    <main>

      {/* ===== HERO ===== */}
      <section className="hero home-hero" aria-label="Présentation principale">
        {/* Background pattern */}
        <div className="home-hero__bg-pattern" aria-hidden="true" />

        <div className="container hero-content">
          <div className="home-hero__text">
            <span className="home-hero__eyebrow">
              <i className="fa-solid fa-location-dot"></i>
              {lang === 'fr' ? 'Cameroun · Yaoundé & Douala' : 'Cameroon · Yaoundé & Douala'}
            </span>
            <h1 className="heading-xl text-white" style={{ marginTop: 20 }}>
              {h.heroTitle}{' '}
              <span className="home-hero__accent">{h.heroTitleAccent}</span>
            </h1>
            <p className="body-lg home-hero__sub">
              {h.heroSubtitle}
            </p>
            <div className="home-hero__actions">
              <Link to="/nos-programmes" className="btn btn-secondary btn-lg">
                <i className="fa-solid fa-rocket"></i>
                {h.heroBtn1}
              </Link>
              <Link to="/tarifs" className="btn btn-outline btn-lg">
                {h.heroBtn2}
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="home-hero__trust">
              <div className="home-hero__trust-item">
                <i className="fa-solid fa-star" style={{ color: 'var(--secondary-light)' }}></i>
                <i className="fa-solid fa-star" style={{ color: 'var(--secondary-light)' }}></i>
                <i className="fa-solid fa-star" style={{ color: 'var(--secondary-light)' }}></i>
                <i className="fa-solid fa-star" style={{ color: 'var(--secondary-light)' }}></i>
                <i className="fa-solid fa-star" style={{ color: 'var(--secondary-light)' }}></i>
                <span>{lang === 'fr' ? 'Apprécié par les familles' : 'Loved by families'}</span>
              </div>
              <span className="home-hero__trust-sep">·</span>
              <div className="home-hero__trust-item">
                <i className="fa-solid fa-shield-halved" style={{ color: 'var(--secondary-light)' }}></i>
                <span>{lang === 'fr' ? 'Programme certifié' : 'Certified program'}</span>
              </div>
            </div>
          </div>

          {/* Student Dashboard Visual */}
          <div className="home-hero__visual" aria-hidden="true">
            <div className="hero-dashboard">
              <div className="hero-dashboard__header">
                <div className="hero-dashboard__avatar">
                  <i className="fa-solid fa-user-graduate"></i>
                </div>
                <div className="hero-dashboard__info">
                  <div className="hero-dashboard__name">
                    {lang === 'fr' ? 'Étudiant BOD1' : 'BOD1 Student'}
                  </div>
                  <div className="hero-dashboard__level">
                    <span className="hero-dashboard__dot"></span>
                    {lang === 'fr' ? 'Niveau Consolidation' : 'Consolidation Level'}
                  </div>
                </div>
                <div className="hero-dashboard__score">
                  <i className="fa-solid fa-star"></i>
                  4.9
                </div>
              </div>

              <div className="hero-dashboard__subjects">
                {dashboardSubjects.map((s, i) => (
                  <div key={i} className="hero-subject">
                    <div className="hero-subject__icon" style={{ color: s.color }}>
                      <i className={s.icon}></i>
                    </div>
                    <div className="hero-subject__content">
                      <div className="hero-subject__label">{subjLabels[lang][i]}</div>
                      <div className="hero-subject__bar">
                        <div className="hero-subject__fill" style={{ width: `${s.progress}%`, background: s.color }}></div>
                      </div>
                    </div>
                    <span className="hero-subject__pct">{s.progress}%</span>
                  </div>
                ))}
              </div>

              <div className="hero-dashboard__footer">
                <i className="fa-solid fa-trophy" style={{ color: 'var(--secondary-light)' }}></i>
                <span>{lang === 'fr' ? '3 certifications obtenues' : '3 certifications earned'}</span>
              </div>
            </div>

            <div className="hero-float hero-float--1">
              <i className="fa-solid fa-code" style={{ color: 'var(--secondary-light)' }}></i>
              <span>{lang === 'fr' ? 'Python maîtrisé' : 'Python mastered'}</span>
            </div>
            <div className="hero-float hero-float--2">
              <i className="fa-solid fa-certificate" style={{ color: '#1E9E72' }}></i>
              <span>{lang === 'fr' ? 'Certifié BOD1' : 'BOD1 Certified'}</span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="home-stats-strip">
          <div className="container">
            <div className="home-stats-strip__grid">
              {h.stats.map((s, i) => (
                <div key={i} className="home-stats-strip__item">
                  <div className="home-stats-strip__num">
                    {s.value}<span className="home-stats-strip__suf">{s.suffix}</span>
                  </div>
                  <div className="home-stats-strip__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="home-hero__scroll" aria-hidden="true"><span /></div>
      </section>

      {/* ===== 4 PILIERS ===== */}
      <section className="section home-piliers" aria-labelledby="piliers-title">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{h.piliersTag}</span>
            <h2 className="heading-lg" id="piliers-title" style={{ marginTop: 12, maxWidth: 560 }}>{h.piliersTitle}</h2>
            <div className="section-divider" />
            <p className="body-lg text-muted" style={{ marginTop: 16, maxWidth: 580 }}>{h.piliersSubtitle}</p>
          </div>

          <div className="home-piliers__grid">
            {pilierData.map((p) => {
              const pilier = t.piliers[p.key];
              return (
                <Link key={p.key} to={p.to} className="home-pilier-card" style={{ '--pilier-color': p.color, '--pilier-bg': p.bgLight, '--pilier-border': p.borderColor }}>
                  <div className="home-pilier-card__top">
                    <div className="home-pilier-card__icon" style={{ background: p.bgLight, color: p.color }}>
                      <i className={p.icon}></i>
                    </div>
                    <div className="home-pilier-card__arrow-icon">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </div>
                  </div>
                  <h3 className="home-pilier-card__title">{pilier.name}</h3>
                  <p className="home-pilier-card__tagline">{pilier.tagline}</p>
                  <div className="home-pilier-card__footer">
                    <span className="home-pilier-card__programme" style={{ color: p.color, borderColor: p.borderColor }}>{pilier.programme}</span>
                    <span className="home-pilier-card__link" style={{ color: p.color }}>
                      {lang === 'fr' ? 'Explorer' : 'Explore'} <i className="fa-solid fa-chevron-right"></i>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to="/notre-offre" className="btn btn-outline-primary">
              {lang === 'fr' ? 'Voir tous les programmes' : 'See all programs'}
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NIVEAUX ===== */}
      <section className="section section--light home-niveaux" aria-labelledby="niveaux-title">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">{h.programmesTag}</span>
            <h2 className="heading-lg" id="niveaux-title" style={{ marginTop: 12 }}>{h.programmesTitle}</h2>
            <div className="section-divider center" />
            <p className="body-lg text-muted" style={{ marginTop: 16, maxWidth: 560, margin: '16px auto 0' }}>{h.programmesSubtitle}</p>
          </div>

          <div className="home-niveaux__grid">
            {t.programmes.levels.map((level, i) => (
              <div key={level.key} className="home-niveau-card">
                <div className="home-niveau-card__num">{String(i + 1).padStart(2, '0')}</div>
                <div className="home-niveau-card__icon-wrap" style={{ color: ['#1E9E72', '#5932E8', '#C8991A'][i], background: ['rgba(30,158,114,0.1)', 'rgba(89,50,232,0.1)', 'rgba(200,153,26,0.1)'][i] }}>
                  <i className={['fa-solid fa-seedling', 'fa-solid fa-gears', 'fa-solid fa-trophy'][i]}></i>
                </div>
                <div className="home-niveau-card__content">
                  <div className="home-niveau-card__age-badge" style={{ color: ['#1E9E72', '#5932E8', '#C8991A'][i], background: ['rgba(30,158,114,0.1)', 'rgba(89,50,232,0.1)', 'rgba(200,153,26,0.1)'][i] }}>
                    {level.age}
                  </div>
                  <h3 className="home-niveau-card__name">{level.name}</h3>
                  <p className="home-niveau-card__subtitle">{level.subtitle}</p>
                  <div className="home-niveau-card__meta">
                    <span><i className="fa-solid fa-calendar-days"></i> {level.duration}</span>
                    <span><i className="fa-regular fa-clock"></i> {level.sessionDuration}</span>
                  </div>
                  <p className="home-niveau-card__objective">{level.objective}</p>
                  <Link to={`/nos-programmes#${level.key}`} className="home-niveau-card__link" style={{ color: ['#1E9E72', '#5932E8', '#C8991A'][i] }}>
                    {t.common.discover} <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section home-testimonials" aria-labelledby="testi-title">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">
              {lang === 'fr' ? 'Ils nous font confiance' : 'They trust us'}
            </span>
            <h2 className="heading-lg" id="testi-title" style={{ marginTop: 12 }}>
              {lang === 'fr' ? 'La voix des familles BOD1' : 'The voice of BOD1 families'}
            </h2>
            <div className="section-divider center" />
          </div>

          <div className="home-testimonials__grid">
            {testimonials[lang].map((item, i) => (
              <div key={i} className={`home-testi-card${i === activeTestimonial ? ' home-testi-card--active' : ''}`} onClick={() => setActiveTestimonial(i)}>
                <div className="home-testi-card__quote">
                  <i className="fa-solid fa-quote-left"></i>
                </div>
                <p className="home-testi-card__text">"{item.text}"</p>
                <div className="home-testi-card__author">
                  <div className="home-testi-card__avatar">{item.initials}</div>
                  <div>
                    <div className="home-testi-card__name">{item.name}</div>
                    <div className="home-testi-card__role">{item.role}</div>
                  </div>
                  <div className="home-testi-card__stars">
                    {[...Array(5)].map((_, si) => (
                      <i key={si} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY BOD1 ===== */}
      <section className="section section--purple-light home-why" aria-labelledby="why-title">
        <div className="container">
          <div className="home-why__header">
            <div className="home-why__header-left">
              <span className="section-tag">{h.whyTag}</span>
              <h2 className="heading-lg" id="why-title" style={{ marginTop: 12 }}>{h.whyTitle}</h2>
              <div className="section-divider" />
              <p className="body-lg text-muted" style={{ marginTop: 16 }}>
                {lang === 'fr'
                  ? "BOD1 EduTech ne fait pas que transmettre des compétences techniques. Nous formons des esprits curieux, créatifs et prêts à façonner l'Afrique de demain."
                  : "BOD1 EduTech doesn't just transmit technical skills. We shape curious, creative minds ready to build tomorrow's Africa."}
              </p>
              <Link to="/a-propos" className="btn btn-primary" style={{ marginTop: 28 }}>
                <i className="fa-solid fa-circle-info"></i>
                {lang === 'fr' ? 'Notre histoire' : 'Our story'}
              </Link>
            </div>
            <div className="home-why__grid">
              {whyPoints[lang].map((w, i) => (
                <div key={i} className="home-why-card">
                  <div className="home-why-card__icon">
                    <i className={w.icon}></i>
                  </div>
                  <h3 className="home-why-card__title">{w.title}</h3>
                  <p className="home-why-card__desc">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FORMATS ===== */}
      <section className="section home-formats" aria-labelledby="formats-title">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">{h.formatsTag}</span>
            <h2 className="heading-lg" id="formats-title" style={{ marginTop: 12 }}>{h.formatsTitle}</h2>
            <div className="section-divider center" />
          </div>

          <div className="home-formats__grid">
            {h.formats.map((f, i) => (
              <div key={i} className={`home-format-card${i === 0 ? ' home-format-card--featured' : ''}`}>
                {i === 0 && (
                  <div className="home-format-card__badge-top">
                    <i className="fa-solid fa-star"></i>
                    {lang === 'fr' ? 'Le plus populaire' : 'Most popular'}
                  </div>
                )}
                <div className="home-format-card__icon-wrap">
                  <i className={i === 0 ? 'fa-solid fa-school' : 'fa-solid fa-sun'}></i>
                </div>
                <div className="badge badge-gold" style={{ marginBottom: 16 }}>{f.label}</div>
                <h3 className="heading-sm">{f.title}</h3>
                <p className="body-md text-muted" style={{ marginTop: 12 }}>{f.desc}</p>
                <ul className="home-format-card__features">
                  {(i === 0
                    ? (lang === 'fr'
                        ? ['Toute l\'année scolaire', 'Sessions hebdomadaires', 'Suivi individualisé']
                        : ['Full school year', 'Weekly sessions', 'Individual follow-up'])
                    : (lang === 'fr'
                        ? ['Vacances scolaires', 'Immersion intensive', 'Projets concrets']
                        : ['School holidays', 'Intensive immersion', 'Concrete projects'])
                  ).map((feat, fi) => (
                    <li key={fi}>
                      <i className="fa-solid fa-circle-check"></i>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/tarifs" className={`btn ${i === 0 ? 'btn-primary' : 'btn-outline-primary'}`} style={{ marginTop: 'auto' }}>
                  {t.common.learnMore}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section" aria-label="Appel à l'action">
        <div className="home-cta__inner">
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="home-cta__content">
              <i className="fa-solid fa-graduation-cap home-cta__icon"></i>
              <h2 className="heading-lg text-white" style={{ marginBottom: 16 }}>{h.ctaTitle}</h2>
              <p className="body-lg text-white" style={{ opacity: 0.8, maxWidth: 560, margin: '0 auto 36px' }}>{h.ctaSubtitle}</p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/tarifs" className="btn btn-secondary btn-lg">
                  <i className="fa-solid fa-rocket"></i>
                  {h.ctaBtn1}
                </Link>
                <Link to="/contact" className="btn btn-outline btn-lg">
                  {h.ctaBtn2}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
