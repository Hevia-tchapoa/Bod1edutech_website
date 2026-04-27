'use client';
import React from 'react';
import Link from 'next/link';
import { useLang } from '../contexts/LanguageContext';
import translations from '../data/translations';
import './Footer.css';

const socials = [
  { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/company/bod1edutech/', label: 'LinkedIn BOD1 EduTech' },
  { name: 'Facebook', icon: 'fa-brands fa-facebook-f', href: 'https://www.facebook.com/share/1DgzXuNvBf/', label: 'Facebook BOD1 EduTech' },
  { name: 'Instagram', icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/bod1edutech?igsh=MXh2YWtuYXppdWlxeg==', label: 'Instagram BOD1 EduTech' },
  { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', href: 'https://whatsapp.com/channel/0029VbCvGvv2UPB95TybB70V', label: 'WhatsApp BOD1 EduTech' },
];

const pilierLinks = [
  { to: '/notre-offre/programmation-robotique', fr: 'Programmation & Robotique', en: 'Programming & Robotics', icon: 'fa-solid fa-microchip' },
  { to: '/notre-offre/cybersecurite', fr: 'Cybersécurité', en: 'Cybersecurity', icon: 'fa-solid fa-shield-halved' },
  { to: '/notre-offre/intelligence-artificielle', fr: 'Intelligence Artificielle', en: 'Artificial Intelligence', icon: 'fa-solid fa-brain' },
  { to: '/notre-offre/innovation-technologique', fr: 'Innovation Technologique', en: 'Technological Innovation', icon: 'fa-solid fa-lightbulb' },
];

const aproposLinks = [
  { to: '/a-propos', fr: 'Présentation', en: 'Presentation' },
  { to: '/a-propos#vision', fr: 'Notre vision', en: 'Our vision' },
  { to: '/a-propos#equipe', fr: 'Équipe dirigeante', en: 'Leadership team' },
];

const infosLinks = [
  { to: '/tarifs', fr: 'Tarifs & Inscriptions', en: 'Pricing & Registration' },
  { to: '/carriere', fr: 'Carrière', en: 'Careers' },
  { to: '/mentions-legales', fr: 'Mentions légales', en: 'Legal notice' },
];

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__accent-line" />

      <div className="footer__top">
        <div className="container footer__top-inner">
          <div className="footer__brand">
            <Link href="/" className="footer__logo" aria-label="BOD1 EduTech">
              <img
                src="/images/logos/SVG/Logo_Blanc_autre.svg"
                alt="BOD1 EduTech"
                className="footer__logo-img"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <span className="footer__logo-fallback" style={{ display: 'none' }}>
                <span style={{ color: 'var(--white)' }}>BOD1</span>
                <span style={{ color: 'var(--secondary-light)' }}> EduTech</span>
              </span>
            </Link>
            <p className="footer__tagline">{t.footer.tagline}</p>
            <p className="footer__desc">{t.footer.description}</p>
            <div className="footer__contact-quick">
              <a href="mailto:contact@bodledutech.com" className="footer__contact-item">
                <i className="fa-solid fa-envelope"></i>
                contact@bodledutech.com
              </a>
              <a href="https://wa.me/237000000000" className="footer__contact-item">
                <i className="fa-brands fa-whatsapp"></i>
                WhatsApp
              </a>
            </div>
            <div className="footer__social">
              <p className="footer__social-label">{t.footer.social}</p>
              <div className="footer__social-links">
                {socials.map(s => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label={s.label} title={s.name}>
                    <i className={s.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">{t.footer.cols.apropos}</h3>
            <ul className="footer__links">
              {aproposLinks.map(l => (
                <li key={l.to}>
                  <Link href={l.to} className="footer__link">
                    <i className="fa-solid fa-arrow-right footer__link-arrow"></i>
                    {lang === 'fr' ? l.fr : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">{t.footer.cols.formations}</h3>
            <ul className="footer__links">
              {pilierLinks.map(l => (
                <li key={l.to}>
                  <Link href={l.to} className="footer__link footer__link--icon">
                    <i className={l.icon}></i>
                    {lang === 'fr' ? l.fr : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">{t.footer.cols.infos}</h3>
            <ul className="footer__links">
              {infosLinks.map(l => (
                <li key={l.to}>
                  <Link href={l.to} className="footer__link">
                    <i className="fa-solid fa-arrow-right footer__link-arrow"></i>
                    {lang === 'fr' ? l.fr : l.en}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="footer__location">
              <i className="fa-solid fa-location-dot"></i>
              <span>Cameroun · Douala</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__rights">{t.footer.rights}</p>
          <div className="footer__bottom-links">
            <Link href="/mentions-legales" className="footer__bottom-link">
              {lang === 'fr' ? 'Mentions légales' : 'Legal notice'}
            </Link>
            <Link href="/contact" className="footer__bottom-link">Contact</Link>
          </div>
        </div>
        <p className="footer__credit">
          {lang === 'fr' ? 'Site réalisé par' : 'Website designed by'}{' '}
          <span>Duran Tchuente</span>
        </p>
      </div>
    </footer>
  );
}
