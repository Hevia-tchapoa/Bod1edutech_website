'use client';
import Link from 'next/link';
import { useLang } from '../contexts/LanguageContext';

export default function NotFound() {
  const { lang } = useLang();
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '40px 24px' }}>
      <h1 className="heading-xl" style={{ marginBottom: 16 }}>404</h1>
      <p className="body-lg text-muted" style={{ marginBottom: 32 }}>
        {lang === 'fr' ? 'Cette page n\'existe pas.' : 'This page does not exist.'}
      </p>
      <Link href="/" className="btn btn-primary">
        {lang === 'fr' ? "Retour à l'accueil" : 'Back to home'}
      </Link>
    </main>
  );
}
