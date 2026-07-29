import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, LogOut, User, Shield, Bell, Heart } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';

const navLinks = [
  { to: '/', label: 'nav.home' },
  { to: '/works', label: 'nav.works' },
  { to: '/services', label: 'nav.services' },
  { to: '/about', label: 'nav.about' },
  { to: '/contact', label: 'nav.contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();
  const { user, userData, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-white">
              M<span className="text-sakura-400">graphite</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium transition-colors ${
                  location.pathname === link.to ? 'text-sakura-400' : 'text-white/70 hover:text-white'
                }`}
              >
                {t(link.label as never)}
                {location.pathname === link.to && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sakura-400" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-sakura-400/30 hover:text-sakura-400"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/favorites" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-sakura-400/30 hover:text-sakura-400">
                  <Heart className="h-4 w-4" />
                </Link>
                <Link to="/notifications" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-sakura-400/30 hover:text-sakura-400">
                  <Bell className="h-4 w-4" />
                </Link>
                <div className="relative group">
                  <button className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-4 w-4 text-white/60" />
                    )}
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-xl border border-white/10 bg-graphite-900 p-2 opacity-0 shadow-xl transition-all group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                    <Link to="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                      <User className="h-4 w-4" /> {t('nav.signIn' as never)}
                    </Link>
                    {userData?.role === 'admin' && (
                      <Link to="/admin" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                        <Shield className="h-4 w-4" /> {t('nav.admin' as never)}
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      <LogOut className="h-4 w-4" /> {t('nav.signOut' as never)}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-xs">
                {t('nav.signIn' as never)}
              </Link>
            )}

            <Link to="/contact" className="btn-primary text-xs">
              {t('nav.startProject' as never)}
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-40 border-b border-white/10 bg-graphite-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    location.pathname === link.to ? 'bg-sakura-400/10 text-sakura-400' : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {t(link.label as never)}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-white/5 pt-4">
                {user && (
                  <>
                    <Link to="/profile" className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-white/70 hover:bg-white/5">
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <Link to="/favorites" className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-white/70 hover:bg-white/5">
                      <Heart className="h-4 w-4" /> Favorites
                    </Link>
                    {userData?.role === 'admin' && (
                      <Link to="/admin" className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-white/70 hover:bg-white/5">
                        <Shield className="h-4 w-4" /> {t('nav.admin' as never)}
                      </Link>
                    )}
                  </>
                )}
                <Link to="/contact" className="btn-primary mt-2 text-center text-sm">
                  {t('nav.startProject' as never)}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
