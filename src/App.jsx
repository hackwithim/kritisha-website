import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (hash) {
      const id = decodeURIComponent(hash.replace('#', ''));
      const scrollToHash = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 200);
        }
      };

      const timer = setTimeout(scrollToHash, 50);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname, hash, key]);

  return null;
}
import Header from './components/Header';
import Footer from './components/Footer';
import EnquireModal from './components/EnquireModal';
import VideoModal from './components/VideoModal';
import CookieBanner from './components/CookieBanner';

import HomePage from './pages/HomePage';
import ExpertisePage from './pages/ExpertisePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import InsightsPage from './pages/InsightsPage';
import InsightDetailPage from './pages/InsightDetailPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';

import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageServices from './pages/admin/ManageServices';
import ManageProjects from './pages/admin/ManageProjects';
import ManageInsights from './pages/admin/ManageInsights';
import ManageCapabilities from './pages/admin/ManageCapabilities';
import ManageLeadership from './pages/admin/ManageLeadership';
import ManageCareers from './pages/admin/ManageCareers';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import SitemapPage from './pages/SitemapPage';
import ManageEnquiries from './pages/admin/ManageEnquiries';
import ManageSettings from './pages/admin/ManageSettings';
import ManageTollPlazas from './pages/admin/ManageTollPlazas';

import { getAdminAuth } from './lib/cmsStore';

function ProtectedAdminRoute({ children }) {
  const auth = getAdminAuth();
  if (!auth.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function PublicLayout({ children, onOpenEnquire }) {
  return (
    <>
      <Header onOpenEnquire={() => onOpenEnquire()} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer onOpenEnquire={() => onOpenEnquire()} />
      <CookieBanner />
    </>
  );
}

export default function App() {
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [enquireService, setEnquireService] = useState('');
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoData, setVideoData] = useState({ title: '', url: '' });

  const handleOpenEnquire = (serviceName = '') => {
    setEnquireService(serviceName);
    setEnquireOpen(true);
  };

  const handleOpenVideo = (title, url) => {
    setVideoData({ title, url });
    setVideoOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC WEBSITE ROUTES */}
        <Route
          path="/"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <HomePage onOpenEnquire={handleOpenEnquire} onOpenVideo={handleOpenVideo} />
            </PublicLayout>
          }
        />
        <Route
          path="/services"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <ExpertisePage onOpenEnquire={handleOpenEnquire} />
            </PublicLayout>
          }
        />
        <Route
          path="/services/:slug"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <ServiceDetailPage onOpenEnquire={handleOpenEnquire} />
            </PublicLayout>
          }
        />
        <Route
          path="/expertise"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <ExpertisePage onOpenEnquire={handleOpenEnquire} />
            </PublicLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <WorkPage onOpenVideo={handleOpenVideo} onOpenEnquire={handleOpenEnquire} />
            </PublicLayout>
          }
        />
        <Route
          path="/work"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <WorkPage onOpenVideo={handleOpenVideo} onOpenEnquire={handleOpenEnquire} />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <AboutPage onOpenEnquire={handleOpenEnquire} />
            </PublicLayout>
          }
        />
        <Route
          path="/insights"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <InsightsPage onOpenEnquire={handleOpenEnquire} />
            </PublicLayout>
          }
        />
        <Route
          path="/insights/:slug"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <InsightDetailPage onOpenEnquire={handleOpenEnquire} />
            </PublicLayout>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <ProjectDetailPage onOpenVideo={handleOpenVideo} onOpenEnquire={handleOpenEnquire} />
            </PublicLayout>
          }
        />
        <Route
          path="/careers"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <CareersPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <ContactPage />
            </PublicLayout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <PrivacyPolicyPage />
            </PublicLayout>
          }
        />
        <Route
          path="/terms-of-use"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <TermsOfUsePage />
            </PublicLayout>
          }
        />
        <Route
          path="/sitemap"
          element={
            <PublicLayout onOpenEnquire={handleOpenEnquire}>
              <SitemapPage />
            </PublicLayout>
          }
        />

        {/* ADMIN AUTH & DASHBOARD ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="toll-plazas" element={<ManageTollPlazas />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="insights" element={<ManageInsights />} />
          <Route path="capabilities" element={<ManageCapabilities />} />
          <Route path="leadership" element={<ManageLeadership />} />
          <Route path="careers" element={<ManageCareers />} />
          <Route path="enquiries" element={<ManageEnquiries />} />
          <Route path="settings" element={<ManageSettings />} />
        </Route>
      </Routes>

      {/* GLOBAL MODALS */}
      <EnquireModal
        isOpen={enquireOpen}
        onClose={() => setEnquireOpen(false)}
        initialService={enquireService}
      />
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoTitle={videoData.title}
        videoUrl={videoData.url}
      />
    </BrowserRouter>
  );
}
