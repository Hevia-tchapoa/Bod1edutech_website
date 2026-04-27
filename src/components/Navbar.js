'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '../contexts/LanguageContext';
import translations from '../data/translations';
import './Navbar.css';

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [offreOpen, setOffreOpen] = useState(false);
  const [programmesOpen, setProgrammesOpen] = useState(false);
  const [aproposOpen, setAproposOpen] = useState(false);
  const pathname = usePathname();
  const offreRef = useRef(null);
  const programmesRef = useRef(null);
  const aproposRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOffreOpen(false);
    setProgrammesOpen(false);
    setAproposOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (offreRef.current && !offreRef.current.contains(e.target)) setOffreOpen(false);
      if (programmesRef.current && !programmesRef.current.contains(e.target)) setProgrammesOpen(false);
      if (aproposRef.current && !aproposRef.current.contains(e.target)) setAproposOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const piliers = [
    { to: '/notre-offre/programmation-robotique', label: t.nav.piliers.prog, icon: 'fa-solid fa-microchip' },
    { to: '/notre-offre/cybersecurite', label: t.nav.piliers.cyber, icon: 'fa-solid fa-shield-halved' },
    { to: '/notre-offre/intelligence-artificielle', label: t.nav.piliers.ia, icon: 'fa-solid fa-brain' },
    { to: '/notre-offre/innovation-technologique', label: t.nav.piliers.innov, icon: 'fa-solid fa-lightbulb' },
  ];

  const niveaux = [
    { to: '/nos-programmes#decouverte', label: t.nav.niveaux.decouverte, icon: 'fa-solid fa-seedling' },
    { to: '/nos-programmes#consolidation', label: t.nav.niveaux.consolidation, icon: 'fa-solid fa-gears' },
    { to: '/nos-programmes#expertise', label: t.nav.niveaux.expertise, icon: 'fa-solid fa-trophy' },
  ];

  const aproposLinks = [
    { to: '/a-propos#presentation', label: t.nav.aproposLinks.presentation, icon: 'fa-solid fa-building' },
    { to: '/a-propos#vision', label: t.nav.aproposLinks.vision, icon: 'fa-solid fa-binoculars' },
    { to: '/a-propos#equipe', label: t.nav.aproposLinks.equipe, icon: 'fa-solid fa-users' },
  ];

  const isActive = (path) => pathname === path;
  const isActivePrefix = (prefix) => pathname.startsWith(prefix);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="container navbar__inner">
        <Link href="/" className="navbar__logo" aria-label="BOD1 EduTech — Accueil">
          <img
            src="/images/logos/SVG/Logo_Blanc_autre.svg"
            alt="BOD1 EduTech"
            className="navbar__logo-img"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
          <span className="navbar__logo-fallback" style={{ display: 'none' }}>
            <span className="navbar__logo-b">BOD1</span>
            <span className="navbar__logo-edu"> EduTech</span>
          </span>
        </Link>

        <nav className="navbar__nav" aria-label="Navigation principale">
          <ul className="navbar__menu" role="menubar">
            <li role="none">
              <Link href="/" className={`navbar__link${isActive('/') ? ' navbar__link--active' : ''}`}>
                {t.nav.home}
              </Link>
            </li>

            <li className="navbar__dropdown-wrap" ref={offreRef} role="none">
              <button
                className={`navbar__link navbar__dropdown-btn${isActivePrefix('/notre-offre') ? ' navbar__link--active' : ''}`}
                onClick={() => { setOffreOpen(o => !o); setProgrammesOpen(false); setAproposOpen(false); }}
                aria-haspopup="true"
                aria-expanded={offreOpen}
              >
                {t.nav.offre}
                <i className={`fa-solid fa-chevron-down navbar__chevron${offreOpen ? ' open' : ''}`}></i>
              </button>
              {offreOpen && (
                <div className="navbar__dropdown" role="menu">
                  <Link href="/notre-offre" className="navbar__dropdown-header" role="menuitem">{t.nav.piliers.title}</Link>
                  {piliers.map(p => (
                    <Link key={p.to} href={p.to} className="navbar__dropdown-item" role="menuitem">
                      <span className="navbar__dropdown-icon"><i className={p.icon}></i></span>
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li className="navbar__dropdown-wrap" ref={programmesRef} role="none">
              <button
                className={`navbar__link navbar__dropdown-btn${isActivePrefix('/nos-programmes') ? ' navbar__link--active' : ''}`}
                onClick={() => { setProgrammesOpen(o => !o); setOffreOpen(false); setAproposOpen(false); }}
                aria-haspopup="true"
                aria-expanded={programmesOpen}
              >
                {t.nav.programmes}
                <i className={`fa-solid fa-chevron-down navbar__chevron${programmesOpen ? ' open' : ''}`}></i>
              </button>
              {programmesOpen && (
                <div className="navbar__dropdown" role="menu">
                  <Link href="/nos-programmes" className="navbar__dropdown-header" role="menuitem">{t.nav.niveaux.title}</Link>
                  {niveaux.map(n => (
                    <Link key={n.to} href={n.to} className="navbar__dropdown-item" role="menuitem">
                      <span className="navbar__dropdown-icon"><i className={n.icon}></i></span>
                      {n.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li className="navbar__dropdown-wrap" ref={aproposRef} role="none">
              <button
                className={`navbar__link navbar__dropdown-btn${isActivePrefix('/a-propos') ? ' navbar__link--active' : ''}`}
                onClick={() => { setAproposOpen(o => !o); setOffreOpen(false); setProgrammesOpen(false); }}
                aria-haspopup="true"
                aria-expanded={aproposOpen}
              >
                {t.nav.apropos}
                <i className={`fa-solid fa-chevron-down navbar__chevron${aproposOpen ? ' open' : ''}`}></i>
              </button>
              {aproposOpen && (
                <div className="navbar__dropdown" role="menu">
                  <Link href="/a-propos" className="navbar__dropdown-header" role="menuitem">BOD1 EduTech</Link>
                  {aproposLinks.map(a => (
                    <Link key={a.to} href={a.to} className="navbar__dropdown-item" role="menuitem">
                      <span className="navbar__dropdown-icon"><i className={a.icon}></i></span>
                      {a.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li role="none">
              <Link href="/tarifs" className={`navbar__link${isActive('/tarifs') ? ' navbar__link--active' : ''}`}>
                {t.nav.tarifs}
              </Link>
            </li>
            <li role="none">
              <Link href="/carriere" className={`navbar__link${isActive('/carriere') ? ' navbar__link--active' : ''}`}>
                {t.nav.carriere}
              </Link>
            </li>
            <li role="none">
              <Link href="/contact" className={`navbar__link${isActive('/contact') ? ' navbar__link--active' : ''}`}>
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="navbar__actions">
          <button
            className="navbar__lang"
            onClick={toggleLang}
            aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <i className="fa-solid fa-globe"></i>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <Link href="/tarifs" className="btn btn-secondary btn-sm navbar__cta">
            {t.nav.cta}
          </Link>
          <button
            className={`navbar__burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="navbar__mobile" role="dialog" aria-label="Menu mobile">
          <nav>
            <Link href="/" className="navbar__mobile-link">{t.nav.home}</Link>

            <div className="navbar__mobile-group">
              <Link href="/notre-offre" className="navbar__mobile-link navbar__mobile-link--parent">{t.nav.offre}</Link>
              {piliers.map(p => (
                <Link key={p.to} href={p.to} className="navbar__mobile-sublink">
                  <i className={p.icon}></i> {p.label}
                </Link>
              ))}
            </div>

            <div className="navbar__mobile-group">
              <Link href="/nos-programmes" className="navbar__mobile-link navbar__mobile-link--parent">{t.nav.programmes}</Link>
              {niveaux.map(n => (
                <Link key={n.to} href={n.to} className="navbar__mobile-sublink">
                  <i className={n.icon}></i> {n.label}
                </Link>
              ))}
            </div>

            <div className="navbar__mobile-group">
              <Link href="/a-propos" className="navbar__mobile-link navbar__mobile-link--parent">{t.nav.apropos}</Link>
              {aproposLinks.map(a => (
                <Link key={a.to} href={a.to} className="navbar__mobile-sublink">
                  <i className={a.icon}></i> {a.label}
                </Link>
              ))}
            </div>

            <Link href="/tarifs" className="navbar__mobile-link">{t.nav.tarifs}</Link>
            <Link href="/carriere" className="navbar__mobile-link">{t.nav.carriere}</Link>
            <Link href="/contact" className="navbar__mobile-link">{t.nav.contact}</Link>

            <div className="navbar__mobile-bottom">
              <button className="navbar__lang" onClick={toggleLang}>
                <i className="fa-solid fa-globe"></i>
                {lang === 'fr' ? 'Switch to English' : 'Passer en français'}
              </button>
              <Link href="/tarifs" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                {t.nav.cta}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
