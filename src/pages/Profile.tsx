import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Calendar, Shield, Heart, FolderOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Profile() {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { state: { from: '/profile' } });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sakura-400 border-t-transparent" />
      </div>
    );
  }

  if (!user || !userData) return null;

  const stats = [
    { icon: Heart, label: 'Favorites', value: '12' },
    { icon: FolderOpen, label: 'Projects', value: '0' },
  ];

  return (
    <div className="relative pt-32 pb-24">
      <Helmet>
        <title>Profile | Mgraphite Studio</title>
        <meta name="description" content="Your Mgraphite Studio profile and activity." />
      </Helmet>

      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-8 md:p-12">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="relative">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="h-24 w-24 rounded-full border-2 border-sakura-400/30 object-cover" />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-sakura-400/30 bg-graphite-800">
                  <span className="text-2xl font-medium text-white">{user.displayName?.charAt(0) || 'U'}</span>
                </div>
              )}
              {userData.role === 'admin' && (
                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-sakura-400 text-graphite-950">
                  <Shield className="h-4 w-4" />
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-display text-3xl text-white">{user.displayName}</h1>
              <div className="mt-2 flex flex-col items-center gap-2 text-sm text-white/50 md:flex-row">
                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {user.email}</span>
                <span className="hidden md:inline text-white/20">|</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Joined {new Date(userData.createdAt).toLocaleDateString()}</span>
              </div>
              <span className="mt-3 inline-block rounded-full bg-sakura-400/10 px-3 py-1 text-xs font-medium capitalize text-sakura-400">{userData.role}</span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
                <stat.icon className="mx-auto mb-2 h-5 w-5 text-sakura-400" />
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
