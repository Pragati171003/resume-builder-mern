import { Routes, Route } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import HomePage from './pages/Homepage';
import FeaturesPage from './pages/FeaturesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQ from './layout/FAQ';
import AllFAQsPage from './pages/AllFAQsPage';
import { Loginpage } from './pages/Loginpage';
import SignUpPage  from './pages/SignUpPage';
import ResumeForm from './pages/ResumeForm';
import TemplatesPage from './pages/TemplatesPage';
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="faq-page" element={<FAQ />} />
        <Route path="all-faqs" element={<AllFAQsPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/build-resume" element={<ResumeForm />} />
        <Route path="/templates-preview" element={<TemplatesPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;