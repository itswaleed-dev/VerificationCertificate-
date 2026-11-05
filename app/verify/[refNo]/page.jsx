import { verifyCertificate } from '../../lib/actions';
import CertificateCard from '../../components/CertificateCard';
import Link from 'next/link';

export const instant = false;

export default async function VerifyResultPage({ params }) {
  const { refNo } = await params;
  const res = await verifyCertificate(refNo);

  return (
    <main className={res.success ? 'min-h-[80vh] flex flex-col items-center justify-center px-4 py-12' : 'not-found-main'}>
      {res.success ? (
        <div className="max-w-3xl w-full">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/" className="result-back-link text-xs font-semibold text-[#800020] hover:underline flex items-center gap-1">
              &larr; Back to Search Portal
            </Link>
            <span className="text-xs text-gray-400 font-mono">ID: {refNo}</span>
          </div>
          <CertificateCard data={res.data} />
        </div>
      ) : (
        <section className="not-found-card" aria-labelledby="not-found-title">
          <div className="not-found-accent" />
          <div className="not-found-content">
            <div className="not-found-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M24 5 44 40H4L24 5Z" fill="currentColor" />
                <path d="M24 17v11" stroke="white" strokeWidth="4" strokeLinecap="round" />
                <circle cx="24" cy="34" r="2.2" fill="white" />
              </svg>
            </div>
            <h1 id="not-found-title">Certificate Not Found</h1>
            <p className="not-found-description">
              We could not find any official certificate matching the reference code:{' '}
              <strong>{refNo}.</strong>
            </p>

            <div className="not-found-reasons">
              <h2>
                <span aria-hidden="true">i</span>
                Common Reasons:
              </h2>
              <ul>
                <li>Typo in the reference ID (e.g., mistaking &apos;O&apos; for &apos;0&apos;).</li>
                <li>The certificate has not yet been processed or published.</li>
                <li>
                  Hyphens or prefixes were omitted (Required format: <code>WB-YYYY-XXXX</code>).
                </li>
              </ul>
            </div>

            <Link href="/" className="not-found-button">
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M4.1 7.1A7 7 0 1 1 3 11H1a9 9 0 1 0 1.5-5L1 4.5V10h5.5L4.1 7.1Z" />
              </svg>
              Try Another Search
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}