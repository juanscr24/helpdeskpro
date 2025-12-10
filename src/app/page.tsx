'use client';

import { LandingNavbar } from '@src/components/landing/LandingNavbar';
import { HeroSection } from '@src/components/landing/HeroSection';
import { ProblemSolutionSection } from '@src/components/landing/ProblemSolutionSection';
import { FeaturesSection } from '@src/components/landing/FeaturesSection';
import { RolesSection } from '@src/components/landing/RolesSection';
import { WorkflowSection } from '@src/components/landing/WorkflowSection';
import { BenefitsSection } from '@src/components/landing/BenefitsSection';
import { UseCasesSection } from '@src/components/landing/UseCasesSection';
import { TechSection } from '@src/components/landing/TechSection';
import { LandingFooter } from '@src/components/landing/LandingFooter';
import { PageTransition } from '@src/components/common';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <PageTransition>
        <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <RolesSection />
      <WorkflowSection />
      <BenefitsSection />
      <UseCasesSection />
      <TechSection />
      </PageTransition>
      <LandingFooter />
    </div>
  );
}
