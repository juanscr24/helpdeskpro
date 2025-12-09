import { WORKFLOW_STEPS } from '@src/constants/landingContent';

export const WorkflowSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Flujo de Trabajo</h2>
          <p className="text-xl text-gray-600">Un proceso simple y efectivo de principio a fin</p>
        </div>

        <div className="relative">
          {/* Línea conectora en desktop */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gray-200" style={{ width: 'calc(100% - 200px)', margin: '0 100px' }}></div>
          
          <div className="grid md:grid-cols-7 gap-4">
            {WORKFLOW_STEPS.map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-primary-900 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 relative z-10">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
