import { Routes, Route } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import HomePage from './pages/Homepage';
import FeaturesPage from './pages/FeaturesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQ from './layout/FAQ';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="faq-page" element={<FAQ />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;