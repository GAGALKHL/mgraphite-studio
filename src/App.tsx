import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthProvider } from '@/hooks/useAuth';
import Layout from '@/components/layout/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Projects = lazy(() => import('@/pages/Projects'));
const SingleProject = lazy(() => import('@/pages/SingleProject'));
const Categories = lazy(() => import('@/pages/Categories'));
const Services = lazy(() => import('@/pages/Services'));
const Contact = lazy(() => import('@/pages/Contact'));
const Login = lazy(() => import('@/pages/Login'));
const Profile = lazy(() => import('@/pages/Profile'));
const Favorites = lazy(() => import('@/pages/Favorites'));
const Notifications = lazy(() => import('@/pages/Notifications'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const PublishProject = lazy(() => import('@/pages/PublishProject'));
const ManageProjects = lazy(() => import('@/pages/ManageProjects'));
const EditProject = lazy(() => import('@/pages/EditProject'));
const NotFound = lazy(() => import('@/pages/NotFound'));

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
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/works" element={<PageWrapper><Projects /></PageWrapper>} />
          <Route path="/works/:id" element={<PageWrapper><SingleProject /></PageWrapper>} />
          <Route path="/categories" element={<PageWrapper><Categories /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path="/favorites" element={<PageWrapper><Favorites /></PageWrapper>} />
          <Route path="/notifications" element={<PageWrapper><Notifications /></PageWrapper>} />
          <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
          <Route path="/admin/publish" element={<PageWrapper><PublishProject /></PageWrapper>} />
          <Route path="/admin/projects" element={<PageWrapper><ManageProjects /></PageWrapper>} />
          <Route path="/admin/edit/:id" element={<PageWrapper><EditProject /></PageWrapper>} />
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}