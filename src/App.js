import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLang } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NosOffres from './pages/NosOffres';
import PilierPage from './pages/PilierPage';
import NosProgrammes from './pages/NosProgrammes';
import APropos from './pages/APropos';
import Tarifs from './pages/Tarifs';
import Carriere from './pages/Carriere';
import Contact from './pages/Contact';
import MentionsLegales from './pages/MentionsLegales';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  const { lang } = useLang();
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16, textAlign: 'center', padding: '0 20px' }}>
      <div style={{ fontSize: '5rem' }}>🔍</div>
      <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--primary)' }}>404</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
        {lang === 'fr' ? 'Page introuvable.' : 'Page not found.'}
      </p>
      <a href="/" className="btn btn-primary btn-lg" style={{ marginTop: 8 }}>
        {lang === 'fr' ? "← Retour à l'accueil" : '← Back to home'}
      </a>
    </main>
  );
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notre-offre" element={<NosOffres />} />
        <Route path="/notre-offre/:slug" element={<PilierPage />} />
        <Route path="/nos-programmes" element={<NosProgrammes />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/tarifs" element={<Tarifs />} />
        <Route path="/carriere" element={<Carriere />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </BrowserRouter>
  );
}
