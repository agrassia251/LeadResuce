import { createFileRoute } from "@tanstack/react-router";
import NavBar from "~/components/landing/NavBar";
import Hero from "~/components/landing/Hero";
import Industries from "~/components/landing/Industries";
import Problem from "~/components/landing/Problem";
import HowItWorks from "~/components/landing/HowItWorks";
import Features from "~/components/landing/Features";
import DashboardPreview from "~/components/landing/DashboardPreview";
import Testimonials from "~/components/landing/Testimonials";
import Pricing from "~/components/landing/Pricing";
import CTA from "~/components/landing/CTA";
import Footer from "~/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Industries />
        <Problem />
        <HowItWorks />
        <Features />
        <DashboardPreview />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
