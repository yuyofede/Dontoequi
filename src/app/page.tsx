import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Motion from "@/components/Motion";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
      <ScrollProgress />
    </>
  );
}