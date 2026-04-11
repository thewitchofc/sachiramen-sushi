import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { ScrollToTop } from "./components/ScrollToTop.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DishPage from "./pages/DishPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import PressPage from "./pages/PressPage.jsx";
import ReviewsPage from "./pages/ReviewsPage.jsx";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
