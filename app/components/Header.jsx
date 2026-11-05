import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand-link" aria-label="Waleed Brothers certificate verification home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 36" fill="none">
              <path d="M16 2 29 7v9c0 8.3-5.3 14.4-13 18C8.3 30.4 3 24.3 3 16V7L16 2Z" fill="currentColor" />
              <path d="M16 6.5 24.5 9.7v6.1c0 5.8-3.3 10.1-8.5 13.1V6.5Z" fill="#850025" />
            </svg>
          </span>
          <span>
            <span className="brand-name">Haroon Brothers</span>
            <span className="brand-subtitle">Official Certificate Verification Portal</span>
          </span>
        </Link>
        <div className="security-badge" aria-label="SSL secured and verified database">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M6 7V5a4 4 0 1 1 8 0v2h1.25A1.75 1.75 0 0 1 17 8.75v7.5A1.75 1.75 0 0 1 15.25 18h-10A1.75 1.75 0 0 1 3.5 16.25v-7.5A1.75 1.75 0 0 1 5.25 7H6Zm2 0h4V5a2 2 0 1 0-4 0v2Z" />
          </svg>
          <span>SSL Secured &amp; Verified Database</span>
        </div>
      </div>
    </header>
  );
}