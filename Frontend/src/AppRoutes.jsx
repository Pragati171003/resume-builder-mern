import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import MainLayout from './layout/MainLayout';
import HomePage from './pages/Homepage';
import FeaturesPage from './pages/FeaturesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQ from './layout/FAQ';
import AllFAQsPage from './pages/AllFAQsPage';
import { Loginpage } from './pages/Loginpage';
import SignUpPage from './pages/SignUpPage';
import ResumeForm from './pages/ResumeForm';
import DashboardPage from './pages/Dashboard';
import PrivateRoute from './layout/PrivateRoute';
import EditorPage from './pages/EditorPage';
import PreviewPage from './pages/PreviewPage';
import EditorLayout from './layout/EditorLayout';
import ResumeTemplateGrid from './pages/ResumeTemplateGrid.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

function AppRoutes() {
  const location = useLocation();
  const flipVariants = {
    initial: { rotateY: -90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: 90, opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="templates" element={<ResumeTemplateGrid />} />
          <Route path="faq-page" element={<FAQ />} />
          <Route path="all-faqs" element={<AllFAQsPage />} />
          <Route path="forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Animated Routes */}
          <Route
            path="/login"
            element={
              <motion.div
                variants={flipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <Loginpage />
              </motion.div>
            }
          />
          <Route
            path="/signup"
            element={
              <motion.div
                variants={flipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <SignUpPage />
              </motion.div>
            }
          />

          {/* Example: if you want ResumeForm also animated */}
          {/* <Route
            path="/build-resume"
            element={
              <motion.div
                variants={flipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <ResumeForm />
              </motion.div>
            }
          /> */}
        </Route>

        <Route path="/" element={<EditorLayout />}>
          <Route
            path="/dashboard"
            element={
                <DashboardPage />
            }
          />
        </Route>

        <Route
          path="/editor/:resumeId"
          element={
              <EditorPage />
          }
        />
        <Route
          path="/build-resume"
          element={
              <EditorPage />
          }
        />
        <Route
          path="/editor"
          element={
              <EditorPage />
          }
        />
        <Route
          path="/preview"
          element={
              <PreviewPage />
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
