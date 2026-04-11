import { Link } from "react-router-dom";
import { About } from "../components/About.jsx";
import { CustomerTestimonials } from "../components/CustomerTestimonials.jsx";
import { Hero } from "../components/Hero.jsx";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <CustomerTestimonials />
      <section className="section section--light home-menu-cta">
        <div className="container home-menu-cta__inner">
          <Link
            to="/menu"
            className="btn btn-outline btn-home-menu"
            aria-label="מעבר לתפריט המלא"
          >
            לתפריט המלא
          </Link>
        </div>
      </section>
    </>
  );
}
