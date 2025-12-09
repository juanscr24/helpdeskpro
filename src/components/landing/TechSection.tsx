import { TECHNOLOGIES } from '@src/constants/landingContent';

export const TechSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tecnologías Modernas</h2>
          <p className="text-xl text-gray-600">Construido con las mejores herramientas del mercado</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {TECHNOLOGIES.map((tech, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-primary-900 font-bold text-lg">{tech}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
