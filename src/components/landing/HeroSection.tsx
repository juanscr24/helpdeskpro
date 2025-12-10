import Link from 'next/link';
import { Button } from '@src/components/ui/Button';
import { SITE_INFO } from '@src/constants/landingContent';

export const HeroSection = () => {
  return (
    <section className="py-20 bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-5xl font-bold mb-6">¿Qué es {SITE_INFO.name}?</h2>
            <p className="text-xl text-primary-100 leading-relaxed mb-8">
              {SITE_INFO.description}
            </p>
            <div className="flex gap-4">
              <Link href="/register">
                <Button variant='primary' className="bg-accent-500 hover:bg-accent-600 text-white">
                  Comenzar Gratis
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-primary-800 rounded-2xl p-8 flex items-center justify-center h-96">
            <svg className="w-48 h-48 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
