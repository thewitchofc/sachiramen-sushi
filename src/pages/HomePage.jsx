import { About } from "../components/About.jsx";
import { CustomerTestimonials } from "../components/CustomerTestimonials.jsx";
import { Hero } from "../components/Hero.jsx";

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <div className="home-after-hero">
        <About />
        <CustomerTestimonials />
      </div>
    </div>
  );
}
