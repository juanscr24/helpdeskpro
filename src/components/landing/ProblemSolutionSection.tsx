import { PROBLEMS, SOLUTIONS } from '@src/constants/landingContent';
import { ItemCard } from './ItemCard';

export const ProblemSolutionSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* El Problema */}
          <div>
            <div className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-4">
              El Problema
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Las empresas que manejan soporte técnico enfrentan:
            </h3>
            <div className="space-y-4">
              {PROBLEMS.map((problem, index) => (
                <ItemCard key={index} icon={problem.icon} text={problem.text} variant="problem" />
              ))}
            </div>
          </div>

          {/* La Solución */}
          <div>
            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
              Nuestra Solución
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              HelpDeskPro ofrece:
            </h3>
            <div className="space-y-4">
              {SOLUTIONS.map((solution, index) => (
                <ItemCard key={index} icon={solution.icon} text={solution.text} variant="solution" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
