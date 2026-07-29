import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Shield, Plus, FolderOpen, Users, TrendingUp, BarChart3 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminDashboard() {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'admin')) {
      navigate('/');
    }
  }, [user, userData, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sakura-400 border-t-transparent" />
      </div>
    );
  }

  const stats = [
    { icon: FolderOpen, label: 'Total Projects', value: '50+' },
    { icon: Users, label: 'Users', value: '120' },
    { icon: TrendingUp, label: 'Views', value: '15.2k' },
    { icon: BarChart3, label: 'Engagement', value: '89%' },
  ];

  const actions = [
    { icon: Plus, label: 'Publish Project', href: '/admin/publish', desc: 'Add a new project to the portfolio' },
    { icon: FolderOpen, label: 'Manage Projects', href: '/admin/projects', desc: 'Edit or remove existing projects' },
  ];

  return (
    <div className="relative pt-32 pb-24">
      <Helmet>
        <title>Admin Dashboard | Mgraphite Studio</title>
        <meta name="description" content="Manage your studio portfolio, projects, and content." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sakura-400/10 text-sakura-400">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-3xl text-white">Admin Dashboard</h1>
            <p className="text-sm text-white/50">Manage your studio portfolio</p>
          </div>
        </motion.div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6">
              <stat.icon className="mb-3 h-6 w-6 text-sakura-400" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="mb-6 font-display text-xl text-white">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {actions.map((action, i) => (
            <motion.div key={action.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
              <Link
                to={action.href}
                className="group flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-sakura-400/20 hover:bg-white/[0.04]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sakura-400/10 text-sakura-400 transition-all group-hover:bg-sakura-400/20">
                  <action.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{action.label}</h3>
                  <p className="mt-1 text-sm text-white/50">{action.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
