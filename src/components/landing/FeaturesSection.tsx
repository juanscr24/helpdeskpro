import { MAIN_FEATURES } from '@src/constants/landingContent';
import { FeatureCard } from './FeatureCard';

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Características Principales</h2>
          <p className="text-xl text-gray-600">Todo lo que necesitas para gestionar soporte técnico profesionalmente</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MAIN_FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
