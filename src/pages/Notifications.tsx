import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Bell, MessageSquare, Heart, FolderPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Notification {
  id: string;
  type: 'comment' | 'like' | 'project';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'like', title: 'New Like', message: 'Someone liked your AVORA project.', date: '2 hours ago', read: false },
  { id: '2', type: 'comment', title: 'New Comment', message: 'Sarah Chen commented on Sakura War T-Shirt.', date: '5 hours ago', read: false },
  { id: '3', type: 'project', title: 'Project Update', message: 'Ryū Gin Packaging has been featured.', date: '1 day ago', read: true },
];

const iconMap = {
  like: Heart,
  comment: MessageSquare,
  project: FolderPlus,
};

export default function Notifications() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { state: { from: '/notifications' } });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sakura-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative pt-32 pb-24">
      <Helmet>
        <title>Notifications | Mgraphite Studio</title>
        <meta name="description" content="Your notifications and updates from Mgraphite Studio." />
      </Helmet>

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Bell className="h-8 w-8 text-sakura-400" />
            <h1 className="font-display text-4xl text-white">Notifications</h1>
          </div>
          <button className="text-sm text-sakura-400 hover:text-sakura-300">Mark all as read</button>
        </motion.div>

        <div className="space-y-3">
          <AnimatePresence>
            {mockNotifications.map((notif, index) => {
              const Icon = iconMap[notif.type];
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-start gap-4 rounded-xl border p-5 transition-all ${
                    notif.read ? 'border-white/5 bg-white/[0.02]' : 'border-sakura-400/20 bg-sakura-400/5'
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notif.read ? 'bg-white/5' : 'bg-sakura-400/10'}`}>
                    <Icon className={`h-5 w-5 ${notif.read ? 'text-white/40' : 'text-sakura-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${notif.read ? 'text-white/60' : 'text-white'}`}>{notif.title}</h4>
                      <span className="text-xs text-white/30">{notif.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-white/50">{notif.message}</p>
                  </div>
                  {!notif.read && <div className="h-2 w-2 shrink-0 rounded-full bg-sakura-400" />}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
