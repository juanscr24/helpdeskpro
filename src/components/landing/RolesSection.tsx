import { CLIENT_FEATURES, AGENT_FEATURES } from '@src/constants/landingContent';

export const RolesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Funcionalidades por Rol</h2>
          <p className="text-xl text-gray-600">Herramientas especializadas para cada tipo de usuario</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Panel Cliente */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">👤</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Panel Cliente</h3>
                <p className="text-gray-600">Gestiona tus solicitudes fácilmente</p>
              </div>
            </div>
            
            <ul className="space-y-4">
              {CLIENT_FEATURES.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-secondary-600 text-xl mr-3">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel Agente */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">🎧</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Panel Agente</h3>
                <p className="text-gray-600">Herramientas profesionales de soporte</p>
              </div>
            </div>
            
            <ul className="space-y-4">
              {AGENT_FEATURES.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
