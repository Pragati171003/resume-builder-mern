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
import DashboardPage from './pages/Dashboard'; 
import PrivateRoute from './layout/PrivateRoute';
import EditorPage from './pages/EditorPage'
import PreviewPage from './pages/PreviewPage';
import EditorLayout from './layout/EditorLayout';
import ResumeTemplateGrid from './pages/ResumeTemplateGrid.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="templates" element={<ResumeTemplateGrid />} />
        <Route path="faq-page" element={<FAQ />} />
        <Route path="all-faqs" element={<AllFAQsPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/*<Route path="/build-resume" element={<ResumeForm />} />*/}
        <Route path="/templates-preview" element={<ResumeTemplateGrid />} />
      </Route>
      
      <Route path="/" element={<EditorLayout />}>
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      </Route>
      <Route path="/editor/:resumeId" element={<PrivateRoute><EditorPage /></PrivateRoute>} />
      <Route path="/build-resume" element={<PrivateRoute><EditorPage /></PrivateRoute>} />
      <Route path="/editor" element={<PrivateRoute><EditorPage /></PrivateRoute>} />
      <Route path="/preview" element={<PrivateRoute><PreviewPage /></PrivateRoute>} />
    </Routes>
  );
}

export default AppRoutes;