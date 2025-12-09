import { SITE_INFO } from '@src/constants/landingContent';
import Link from 'next/link';

export const LandingFooter = () => {
  return (
    <footer className="bg-primary-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Información de la empresa */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{SITE_INFO.name}</h3>
            <p className="text-gray-300 mb-4">{SITE_INFO.tagline}</p>
            <p className="text-gray-400 text-sm">
              Transformando la manera en que las empresas gestionan su soporte técnico
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-bold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-300 hover:text-white transition-colors">
                  Registrarse
                </Link>
              </li>
              <li>
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">
                  Beneficios
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <span className="mr-2">📧</span>
                <a href={`mailto:${SITE_INFO.email}`} className="hover:text-white transition-colors">
                  {SITE_INFO.email}
                </a>
              </li>
              <li className="text-gray-300">
                <span className="mr-2">🌐</span>
                <span>Disponible 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {SITE_INFO.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
