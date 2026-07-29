import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const { user, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/';

  useEffect(() => {
    if (user && !loading) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sakura-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-32">
      <Helmet>
        <title>Sign In | Mgraphite Studio</title>
        <meta name="description" content="Sign in to Mgraphite Studio to access your favorites and project history." />
      </Helmet>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sakura-400/10 text-sakura-400">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="font-display text-3xl text-white">Welcome Back</h1>
        <p className="mt-3 text-white/50">Sign in to access your favorites, notifications, and project history.</p>

        <button onClick={signInWithGoogle} className="btn-primary mx-auto mt-8 flex w-full items-center justify-center gap-3">
          <LogIn className="h-5 w-5" /> Continue with Google
        </button>

        <p className="mt-6 text-xs text-white/30">Secure authentication powered by Firebase. No passwords needed.</p>
      </motion.div>
    </div>
  );
}
