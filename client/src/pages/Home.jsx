
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import WhyChoose from "../components/WhyChoose";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />    
      <Hero />
      <Features />
      <WhyChoose />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;