'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useLang } from '../../../contexts/LanguageContext';
import translations from '../../../data/translations';
import '../../../pages/PilierPage.css';

const pilierMap = {
  'programmation-robotique': 'programmation',
  'cybersecurite': 'cybersecurite',
  'intelligence-artificielle': 'ia',
  'innovation-technologique': 'innovation',
};

const levelColors = { Découverte: '#28A87D', Consolidation: '#5932E8', Expertise: '#C8991A', Discovery: '#28A87D', Mastery: '#C8991A' };
const levelBg = { Découverte: '#E8F7F2', Consolidation: '#EDE8FF', Expertise: '#FDF3DC', Discovery: '#E8F7F2' };
const levelIcons = { Découverte: '🔍', Consolidation: '⚙️', Expertise: '🏆', Discovery: '🔍' };

const allPiliers = [
  { key: 'programmation', to: '/notre-offre/programmation-robotique', icon: '🤖', color: '#5932E8' },
  { key: 'cybersecurite', to: '/notre-offre/cybersecurite', icon: '🛡️', color: '#E85932' },
  { key: 'ia', to: '/notre-offre/intelligence-artificielle', icon: '🧠', color: '#1A85C8' },
  { key: 'innovation', to: '/notre-offre/innovation-technologique', icon: '💡', color: '#28A87D' },
];

export default function PilierPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const router = useRouter();
  const t = translations[lang];
  const pilierKey = pilierMap[slug];
  const pilier = pilierKey ? t.piliers[pilierKey] : null;
  const pilierMeta = allPiliers.find(p => p.key === pilierKey);
  const otherPiliers = allPiliers.filter(p => p.key !== pilierKey);

  useEffect(() => {
    if (!pilierKey) {
      router.replace('/notre-offre');
      return;
    }
    document.title = `BOD1 EduTech — ${pilier.name}`;
    window.scrollTo(0, 0);
  }, [lang, pilier, pilierKey, router]);

  if (!pilierKey || !pilier) return null;

  return (
    <main>
      <section className="page-hero pilier-hero" style={{ '--pilier-color': pilierMeta.color }}>
        <div className="container page-hero__content">
          <span className="pilier-hero__tag">{pilier.heroTag}</span>
          <div className="pilier-hero__icon">{pilierMeta.icon}</div>
          <h1 className="heading-xl text-white" style={{ marginTop: 8 }}>{pilier.heroTitle}</h1>
          <p className="body-lg text-white" style={{ opacity: 0.82, maxWidth: 600, marginTop: 12 }}>{pilier.heroSubtitle}</p>
          <div className="pilier-hero__badge">{pilier.programme}</div>
          <nav className="page-hero__breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <Link href="/notre-offre">{t.nav.offre}</Link>
            <span>/</span>
            <span>{pilier.name}</span>
          </nav>
        </div>
      </section>

      <section className="section section--light">
        <div className="container pilier-desc">
          <div className="pilier-desc__text">
            <span className="section-tag" style={{ color: pilierMeta.color }}>
              {lang === 'fr' ? 'À propos du programme' : 'About the program'}
            </span>
            <h2 className="heading-md" style={{ marginTop: 12 }}>{pilier.name}</h2>
            <p className="body-lg text-muted" style={{ marginTop: 16 }}>{pilier.description}</p>
          </div>
          <div className="pilier-desc__cta">
            <Link href="/tarifs" className="btn btn-primary btn-lg">{t.common.register}</Link>
            <Link href="/contact" className="btn btn-outline-primary">{t.common.contact}</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">{lang === 'fr' ? 'Progression' : 'Progression'}</span>
            <h2 className="heading-lg" style={{ marginTop: 12 }}>
              {lang === 'fr' ? 'Les 3 niveaux du programme' : 'The 3 program levels'}
            </h2>
            <div className="section-divider center" />
          </div>
          <div className="pilier-levels">
            {pilier.niveaux.map((niveau, i) => {
              const lColor = levelColors[niveau.level] || '#5932E8';
              const lBg = levelBg[niveau.level] || '#EDE8FF';
              const lIcon = levelIcons[niveau.level] || '🎓';
              return (
                <article key={i} className="pilier-level-card" style={{ '--lcolor': lColor, '--lbg': lBg }}>
                  <div className="pilier-level-card__header">
                    <div className="pilier-level-card__icon">{lIcon}</div>
                    <div>
                      <span className="pilier-level-card__badge">{niveau.level}</span>
                      <p className="pilier-level-card__age">{niveau.age}</p>
                    </div>
                  </div>
                  <div className="pilier-level-card__body">
                    <div>
                      <h3 className="pilier-level-card__section-label">{lang === 'fr' ? 'Contenu' : 'Content'}</h3>
                      <p className="pilier-level-card__content">{niveau.content}</p>
                    </div>
                    <div>
                      <h3 className="pilier-level-card__section-label">{lang === 'fr' ? 'Compétences acquises' : 'Skills acquired'}</h3>
                      <p className="pilier-level-card__skills">{niveau.skills}</p>
                    </div>
                  </div>
                  <Link href="/tarifs" className="pilier-level-card__cta">
                    {lang === 'fr' ? "S'inscrire à ce niveau" : 'Register for this level'} →
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="heading-md">{lang === 'fr' ? 'Découvrez aussi nos autres programmes' : 'Also discover our other programs'}</h2>
          </div>
          <div className="pilier-others">
            {otherPiliers.map(p => {
              const other = t.piliers[p.key];
              return (
                <Link key={p.key} href={p.to} className="pilier-other-card" style={{ '--color': p.color }}>
                  <span className="pilier-other-card__icon">{p.icon}</span>
                  <span className="pilier-other-card__name">{other.name}</span>
                  <span className="pilier-other-card__arrow">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="heading-lg text-white" style={{ marginBottom: 16 }}>
            {lang === 'fr' ? `Prêt à vous lancer dans ${pilier.name} ?` : `Ready to dive into ${pilier.name}?`}
          </h2>
          <p className="body-lg text-white" style={{ opacity: 0.8, maxWidth: 500, margin: '0 auto 32px' }}>
            {lang === 'fr'
              ? 'Inscrivez votre enfant et commencez dès maintenant le parcours BOD1 EduTech.'
              : "Register your child and start the BOD1 EduTech journey now."}
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
