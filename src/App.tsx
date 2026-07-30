import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthProvider } from '@/hooks/useAuth';
import Layout from '@/components/layout/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Direct imports for instant first paint of core public pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Projects from '@/pages/Projects';
import Categories from '@/pages/Categories';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

// Lazy imports for secondary/authenticated routes
const SingleProject = lazy(() => import('@/pages/SingleProject'));
const Login = lazy(() => import('@/pages/Login'));
const Profile = lazy(() => import('@/pages/Profile'));
const Favorites = lazy(() => import('@/pages/Favorites'));
const Notifications = lazy(() => import('@/pages/Notifications'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const PublishProject = lazy(() => import('@/pages/PublishProject'));
const ManageProjects = lazy(() => import('@/pages/ManageProjects'));
const EditProject = lazy(() => import('@/pages/EditProject'));

function PageWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}

export default function App() {
  return (
    <AuthProvider>
      <Helmet>
        <title>Mgraphite Studio | Every Bloom Begins With A Line</title>
        <meta name="description" content="Premium graphic design studio crafting visual identities that last." />
      </Helmet>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Projects />} />
          <Route path="/works/:id" element={<PageWrapper><SingleProject /></PageWrapper>} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path="/favorites" element={<PageWrapper><Favorites /></PageWrapper>} />
          <Route path="/notifications" element={<PageWrapper><Notifications /></PageWrapper>} />
          <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
          <Route path="/admin/publish" element={<PageWrapper><PublishProject /></PageWrapper>} />
          <Route path="/admin/projects" element={<PageWrapper><ManageProjects /></PageWrapper>} />
          <Route path="/admin/edit/:id" element={<PageWrapper><EditProject /></PageWrapper>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}