import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { FeatureCards } from "@/components/site/FeatureCards";
import { Demo } from "@/components/site/Demo";
import { HowItWorks, Benefits, DashboardPreview, Testimonials, Pricing, FAQ, FinalCTA, Footer } from "@/components/site/Sections";

const title = "SmartWork AI — Turn busywork into progress";
const description = "AI email generator, meeting notes summarizer, and task planner in one productivity suite.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureCards />
        <Demo />
        <HowItWorks />
        <Benefits />
        <DashboardPreview />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" />
    </>
  );
}
