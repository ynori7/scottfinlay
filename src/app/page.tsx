import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/sections/AboutSection';
import CVSection from '@/components/sections/CVSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero leadIn="Hi, I'm Scott!" heading="It's Nice To Meet You" />
      <AboutSection />
      <CVSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </>
  );
}
