'use client';

import { useState, type FormEvent } from 'react';
import { verifyCertificate } from './lib/actions';
import CertificateCard from './components/CertificateCard';

const sampleReferences = [
  { reference: 'WB-2026-8891', status: 'Example' },
  { reference: 'WB-2025-1042', status: 'Example' },
  { reference: 'WB-2024-5530', status: 'Example' },
  { reference: 'WB-INVALID-000', status: 'Not Found' },
];

export default function HomePage() {
  const [refInput, setRefInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [notFoundRef, setNotFoundRef] = useState('');

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!refInput.trim() || loading) return;

    setLoading(true);
    setErrorMsg('');
    setNotFoundRef('');
    setResult(null);

    try {
      const res = await verifyCertificate(refInput);
      if (res.success) {
        setResult(res.data);
      } else {
        setErrorMsg(res.error ?? 'Unable to verify this certificate.');
        if (res.error === 'No certificate matching this reference number was found.') {
          setNotFoundRef(refInput.trim());
        }
      }
    } catch (error) {
      console.error('Certificate verification request failed:', error);
      setErrorMsg('Unable to verify this certificate right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSelect = (code: string) => {
    setRefInput(code);
  };

  return (
    <main className={notFoundRef ? 'not-found-main' : 'home-main'}>
      {notFoundRef ? (
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
              <strong>{notFoundRef}.</strong>
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

            <button
              type="button"
              className="not-found-button"
              onClick={() => {
                setNotFoundRef('');
                setErrorMsg('');
              }}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M4.1 7.1A7 7 0 1 1 3 11H1a9 9 0 1 0 1.5-5L1 4.5V10h5.5L4.1 7.1Z" />
              </svg>
              Try Another Search
            </button>
          </div>
        </section>
      ) : (
        <>
      <section className="verification-panel" aria-labelledby="verification-title">
        <div className="panel-accent" />
        <div className="panel-content">
          <div className="medal-emblem" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="currentColor">
              <path d="M24 3.5 27.3 6l4.1-.1 2.2 3.4 3.8 1.5.5 4 3 2.8-1.1 3.9 1.1 3.9-3 2.8-.5 4-3.8 1.5-2.2 3.4-4.1-.1L24 40.5l-3.3 2.4-4.1-.1-2.2-3.4-3.8-1.5-.5-4-3-2.8 1.1-3.9-1.1-3.9 3-2.8.5-4 3.8-1.5 2.2-3.4 4.1.1L24 3.5Z" />
              <circle cx="24" cy="22" r="8" fill="white" />
              <path d="m15.4 33.6-2.6 10 6.5-2.4 4.2 4.7 2-8.1-10.1-4.2Zm17.2 0 2.6 10-6.5-2.4-4.2 4.7-2-8.1 10.1-4.2Z" />
            </svg>
          </div>
          <h1 id="verification-title" className="panel-title">Verify Authentic Credentials</h1>
          <p className="panel-description">
            Enter the official Certificate Reference Number below to instantly validate the authenticity, issue date, and achievement status.
          </p>

          <form onSubmit={handleSearch} className="verify-form">
            <label className="reference-field">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 4h2v16H3V4Zm4 0h1v16H7V4Zm3 0h2v16h-2V4Zm4 0h1v16h-1V4Zm3 0h3v16h-3V4Zm5 0h1v16h-1V4Z" />
              </svg>
              <input
                type="text"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                placeholder="e.g., WB-2026-8891"
                aria-label="Certificate reference number"
                autoComplete="off"
                spellCheck={false}
                required
              />
            </label>
            <button type="submit" disabled={loading} className="verify-button">
              {loading ? (
                <>
                  <span className="loading-indicator" aria-hidden="true" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true">
                    <circle cx="10.8" cy="10.8" r="6.8" />
                    <path d="m16 16 5 5" />
                  </svg>
                  <span>Verify Now</span>
                </>
              )}
            </button>
          </form>

          <div className="sample-area">
            <span className="sample-label">
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M13.6 2.2a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 1 0 2.8l-1.3 1.3-4.2-4.2 1.3-1.3ZM11.2 4.6l4.2 4.2-8.8 8.8-5.1 1.1 1.1-5.1 8.6-9Z" />
              </svg>
              Sample References:
            </span>
            {sampleReferences.map(({ reference, status }) => (
              <button
                key={reference}
                type="button"
                onClick={() => handleQuickSelect(reference)}
                className="sample-reference"
              >
                {reference} ({status})
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="verification-feedback" aria-live="polite">
        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg shadow-sm mb-6 text-center">
            <p className="text-red-700 font-medium">{errorMsg}</p>
            <p className="text-xs text-red-500 mt-1">Please re-check your reference code and try again.</p>
          </div>
        )}

        {result && <CertificateCard data={result} />}
      </div>
        </>
      )}
    </main>
  );
}