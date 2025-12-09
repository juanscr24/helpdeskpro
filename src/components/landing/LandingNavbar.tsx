import Link from 'next/link';
import { Button } from '@src/components/ui/Button';
import { SITE_INFO } from '@src/constants/landingContent';

export const LandingNavbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{SITE_INFO.name}</h1>
              <p className="text-xs text-gray-500">{SITE_INFO.tagline}</p>
            </div>
          </div>
          <Link href="/login">
            <Button className="bg-primary-900 hover:bg-primary-800 text-white">
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
