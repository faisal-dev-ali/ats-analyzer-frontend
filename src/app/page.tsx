import { HeroSection } from "@/components/landing/hero-section";
import { FeatureSection } from "@/components/landing/feature-section";
import { ATSPreview } from "@/components/landing/ats-preview";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <HeroSection />
      <FeatureSection />
      <ATSPreview />
    </main>
  );
}
