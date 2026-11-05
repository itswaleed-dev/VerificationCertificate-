'use client';

import { useState } from 'react';

export default function CertificateCard({ data }) {
  const [copyMessage, setCopyMessage] = useState('');
  const isValid = data.certificate_status === 'VALID';
  const formattedDate = new Date(data.issue_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyMessage('Verification link copied.');
    } catch (error) {
      console.error('Unable to copy the verification link:', error);
      setCopyMessage('Could not copy the link. Please copy the page address manually.');
    }
  };

  return (
    <section className="certificate-result" aria-label="Certificate verification result">
      <div className={`verification-banner ${isValid ? 'is-valid' : 'is-inactive'}`}>
        <div className="verification-message">
          <span className="verification-check" aria-hidden="true">
            {isValid ? '✓' : '!'}
          </span>
          <span>
            <strong>{isValid ? 'Official Certificate Verified' : 'Certificate Record Found'}</strong>
            <small>
              {isValid
                ? 'This record is authentic and matches our official database.'
                : `This certificate is ${data.certificate_status.toLowerCase()}.`}
            </small>
          </span>
        </div>
        <div className="certificate-toolbar">
          <button type="button" className="certificate-action copy-action" onClick={handleCopyLink}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M8.2 11.8 11.8 8.2M6.5 13.5l-1 1a3 3 0 0 1-4.2-4.2l3-3a3 3 0 0 1 4.2 0m5-2 1-1a3 3 0 0 1 4.2 4.2l-3 3a3 3 0 0 1-4.2 0" transform="translate(1 1)" />
            </svg>
            Copy Link
          </button>
          <button type="button" className="certificate-action print-action" onClick={() => window.print()}>
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M5 2h10v4H5V2Zm10 10h2a1 1 0 0 0 1-1V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h2v-2h10v2Zm-9-1h8v7H6v-7Zm9-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
            </svg>
            Print / Save PDF
          </button>
        </div>
      </div>
      <p className="copy-feedback" aria-live="polite">{copyMessage}</p>

      <article className="certificate-card" aria-labelledby="certificate-recipient">
        <div className="certificate-inner">
          <div className="certificate-seal" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2 28 7v8c0 7.5-4.8 13-12 16C8.8 28 4 22.5 4 15V7l12-5Z" />
              <path d="m16 8-5 2v5c0 3.8 1.8 6.8 5 9V8Z" fill="white" />
            </svg>
          </div>

          <header className="certificate-heading">
            <h2>Haroon Brothers</h2>
            <p>Academy of Technology &amp; Professional Excellence</p>
            <span aria-hidden="true" />
          </header>

          <div className="certificate-title">
            <p>Certificate of Achievement</p>
            <span>This is to proudly certify that</span>
          </div>
          <h1 id="certificate-recipient" className="certificate-recipient">{data.student_name}</h1>
          <p className="certificate-statement">has successfully completed the prescribed curriculum in</p>
          <p className="certificate-course">{data.course_title}</p>
          <p className="certificate-grade">
            <strong>Grade / Distinction:</strong> {data.grade_or_score}
          </p>

          <dl className="certificate-details">
            <div>
              <dt>Reference Number</dt>
              <dd>{data.reference_number}</dd>
            </div>
            <div>
              <dt>Issue Date</dt>
              <dd>{formattedDate}</dd>
            </div>
            <div>
              <dt>Verification Status</dt>
              <dd className={isValid ? 'status-valid' : 'status-inactive'}>
                <span aria-hidden="true">{isValid ? '●' : '●'}</span>
                {data.certificate_status === 'VALID' ? 'Active & Verified' : data.certificate_status}
              </dd>
            </div>
          </dl>

          <div className="certificate-signatures">
            <div className="signature-block">
              <strong>{data.issuing_authority}</strong>
              <span>Authorized Registrar</span>
            </div>
            <div className="certificate-medallion" aria-label="Waleed Brothers official seal">
              <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <circle cx="24" cy="24" r="20" />
                <circle cx="24" cy="24" r="15" />
                <path d="m24 13 2.5 5.1 5.6.8-4.1 4 .9 5.6-4.9-2.6-4.9 2.6.9-5.6-4.1-4 5.6-.8L24 13Z" />
              </svg>
              <span>Official Seal</span>
            </div>
            <div className="signature-block signature-right">
              <strong>{data.issuing_authority}</strong>
              <span>Issuing Authority</span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
