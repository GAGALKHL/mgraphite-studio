import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-32">
      <Helmet>
        <title>Page Not Found | Mgraphite Studio</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
        <div className="relative mb-8 inline-block">
          <span className="font-display text-[10rem] font-bold leading-none text-white/[0.03]">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-6xl font-bold text-white/10">404</span>
          </div>
        </div>
        <h1 className="font-display text-3xl text-white">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-md text-white/50">
          The page you are looking for does not exist or has been moved. Every bloom begins with a line, but this one seems to have faded.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={() => window.history.back()} className="btn-outline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Go Back
          </button>
          <Link to="/" className="btn-primary flex items-center gap-2">
            <Home className="h-4 w-4" /> Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
