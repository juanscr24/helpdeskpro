import { BENEFITS } from '@src/constants/landingContent';

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Beneficios Clave</h2>
          <p className="text-xl text-gray-600">Mejora tu servicio de soporte con resultados medibles</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
              <div className={`text-${benefit.color} text-3xl mb-4`}>●</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
