import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';

const allProjects = [
  { id: 'avora', title: 'AVORA', category: 'Logo Design', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80' },
  { id: 'kage-branding', title: 'Kage Branding', category: 'Brand Identity', imageUrl: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80' },
  { id: 'sakura-war', title: 'Sakura War T-Shirt', category: 'T-Shirt Design', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
  { id: 'ryu-gin', title: 'Ryū Gin Packaging', category: 'Packaging Design', imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80' },
  { id: 'nebula-tech', title: 'Nebula Tech', category: 'Logo Design', imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80' },
  { id: 'zen-garden', title: 'Zen Garden', category: 'Brand Identity', imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80' },
  { id: 'midnight-rose', title: 'Midnight Rose', category: 'T-Shirt Design', imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80' },
  { id: 'sakura-sake', title: 'Sakura Sake', category: 'Packaging Design', imageUrl: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=800&q=80' },
];

const categories = ['All', 'Logo Design', 'Brand Identity', 'T-Shirt Design', 'Packaging Design'];

export default function Projects() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allProjects.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative pt-32 pb-24">
      <Helmet>
        <title>Works | Mgraphite Studio</title>
        <meta name="description" content="Browse our portfolio of logo design, brand identity, apparel, and packaging projects." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading tagline={t('works.tagline' as never)} title={t('works.title' as never)} />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-sakura-400 text-graphite-950'
                    : 'border border-white/10 text-white/60 hover:border-sakura-400/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="input-field w-full pl-10 sm:w-64"
            />
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} {...project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <SlidersHorizontal className="mx-auto mb-4 h-12 w-12 text-white/10" />
            <p className="text-white/40">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
