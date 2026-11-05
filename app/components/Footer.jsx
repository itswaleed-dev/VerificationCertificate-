import { cacheLife } from 'next/cache';

export default async function Footer() {
  'use cache';
  cacheLife('days');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] text-gray-400 py-8 border-t border-gray-800 text-xs mt-12 print:hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="footer" >
          <p className="footer">Waleed Brothers Official Portal</p>
          <p className="mt-1">Secure Certificate Validation & Credential Management System.</p>
        </div>
        <div className="footer">
          <p>&copy; {year} Waleed Brothers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}