import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { ScrollToTop } from "./components/ScrollToTop.jsx";
import AllergensPage from "./pages/AllergensPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DishPage from "./pages/DishPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import PressPage from "./pages/PressPage.jsx";
import ReviewsPage from "./pages/ReviewsPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/dish/:dishId" element={<DishPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/allergens" element={<AllergensPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
