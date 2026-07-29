import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from '../effects/ScrollProgress';

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-graphite-950 text-white">
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
