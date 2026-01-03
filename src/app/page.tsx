import { PageLayout } from "@/components/layout";
import {
  Hero,
  HowItWorks,
  FeaturedLaunches,
  TopDevelopers,
  SuccessStories,
  CTA,
} from "@/components/sections";

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <HowItWorks />
      <FeaturedLaunches />
      <TopDevelopers />
      <SuccessStories />
      <CTA />
    </PageLayout>
  );
}
