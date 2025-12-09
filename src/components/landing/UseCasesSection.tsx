import { USE_CASES } from '@src/constants/landingContent';

export const UseCasesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Casos de Uso</h2>
          <p className="text-xl text-gray-600">Ideal para cualquier organización que valore el soporte de calidad</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {USE_CASES.map((useCase, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 flex items-start">
              <span className="text-accent-500 text-2xl mr-4 shrink-0">✓</span>
              <span className="text-gray-800 font-medium">{useCase}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
