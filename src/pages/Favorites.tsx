import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Heart, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ProjectCard from '@/components/ui/ProjectCard';

const mockFavorites = [
  { id: 'avora', title: 'AVORA', category: 'Logo Design', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80' },
  { id: 'sakura-war', title: 'Sakura War T-Shirt', category: 'T-Shirt Design', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
  { id: 'ryu-gin', title: 'Ryū Gin Packaging', category: 'Packaging Design', imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80' },
];

export default function Favorites() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { state: { from: '/favorites' } });
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
        <title>Favorites | Mgraphite Studio</title>
        <meta name="description" content="Your saved favorite projects from Mgraphite Studio." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex items-center gap-4">
          <Heart className="h-8 w-8 text-sakura-400" />
          <h1 className="font-display text-4xl text-white">Your Favorites</h1>
        </motion.div>

        {mockFavorites.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockFavorites.map((project, index) => (
              <ProjectCard key={project.id} {...project} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart className="mb-4 h-16 w-16 text-white/10" />
            <h3 className="font-display text-xl text-white">No favorites yet</h3>
            <p className="mt-2 text-white/50">Start exploring and save projects you love.</p>
            <button onClick={() => navigate('/works')} className="btn-primary mt-6 flex items-center gap-2">
              Explore Projects <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
