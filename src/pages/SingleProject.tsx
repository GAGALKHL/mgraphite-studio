import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import LikeButton from '@/components/ui/LikeButton';
import FavoriteButton from '@/components/ui/FavoriteButton';
import CommentSection from '@/components/ui/CommentSection';
import ProjectCard from '@/components/ui/ProjectCard';

const projectData: Record<string, {
  title: string;
  category: string;
  description: string;
  story: string;
  imageUrl: string;
  gallery: string[];
  tags: string[];
  date: string;
  likes: number;
}> = {
  'avora': {
    title: 'AVORA',
    category: 'Logo Design',
    description: 'A geometric monogram that embodies elegance and modern sophistication.',
    story: 'AVORA approached us with a vision: to create a mark that feels both ancient and futuristic. Drawing inspiration from sacred geometry and Japanese minimalism, we crafted a symbol that balances sharp angles with organic flow.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    ],
    tags: ['Logo', 'Minimalism', 'Geometry', 'Luxury'],
    date: '2026-06-15',
    likes: 124,
  },
  'kage-branding': {
    title: 'Kage Branding',
    category: 'Brand Identity',
    description: 'Complete visual identity for a premium Japanese tea house.',
    story: 'Kage, meaning "shadow" in Japanese, represents the interplay of light and darkness. We developed a full brand system including stationery, packaging, and environmental graphics.',
    imageUrl: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
    ],
    tags: ['Branding', 'Japanese', 'Tea', 'Luxury'],
    date: '2026-05-20',
    likes: 89,
  },
  'sakura-war': {
    title: 'Sakura War T-Shirt',
    category: 'T-Shirt Design',
    description: 'Limited edition apparel design blending samurai aesthetics with modern streetwear.',
    story: 'The Sakura War collection was born from a desire to merge historical Japanese warrior culture with contemporary fashion. Each design element was hand-illustrated.',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    ],
    tags: ['Apparel', 'Streetwear', 'Illustration', 'Limited'],
    date: '2026-04-10',
    likes: 256,
  },
  'ryu-gin': {
    title: 'Ryū Gin Packaging',
    category: 'Packaging Design',
    description: 'Premium packaging design for a craft gin inspired by Japanese dragons.',
    story: 'Ryū Gin needed packaging that would stand out in the crowded premium spirits market. We created a bottle design featuring an embossed dragon that wraps around the glass.',
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
      'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=800&q=80',
      'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=800&q=80',
    ],
    tags: ['Packaging', 'Spirits', 'Premium', 'Japanese'],
    date: '2026-03-05',
    likes: 178,
  },
};

const relatedProjects = [
  { id: 'nebula-tech', title: 'Nebula Tech', category: 'Logo Design', imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80' },
  { id: 'zen-garden', title: 'Zen Garden', category: 'Brand Identity', imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80' },
  { id: 'sakura-sake', title: 'Sakura Sake', category: 'Packaging Design', imageUrl: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=800&q=80' },
];

export default function SingleProject() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectData[id] : null;

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-32">
        <div className="text-center">
          <h2 className="font-display text-3xl text-white">Project Not Found</h2>
          <Link to="/works" className="mt-4 inline-block text-sakura-400 hover:underline">View all projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-32 pb-24">
      <Helmet>
        <title>{project.title} | Mgraphite Studio</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link to="/works" className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-sakura-400">
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-graphite-900">
              <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {project.gallery.map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="aspect-square overflow-hidden rounded-xl bg-graphite-900">
                  <img src={img} alt={`${project.title} gallery ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
            <div>
              <span className="mb-2 inline-block rounded-full bg-sakura-400/10 px-3 py-1 text-xs font-medium text-sakura-400">{project.category}</span>
              <h1 className="font-display text-4xl text-white md:text-5xl">{project.title}</h1>
            </div>
            <p className="text-lg text-white/70">{project.description}</p>
            <div className="flex items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {project.date}</span>
              <button className="flex items-center gap-1.5 transition-colors hover:text-sakura-400"><Share2 className="h-4 w-4" /> Share</button>
            </div>
            <div className="flex items-center gap-4">
              <LikeButton initialLikes={project.likes} />
              <FavoriteButton />
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="mb-3 font-display text-lg text-white">The Story</h3>
              <p className="text-sm leading-relaxed text-white/60">{project.story}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                  <Tag className="h-3 w-3" /> {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <CommentSection projectId={id || ''} />
        </div>

        <div className="mt-24">
          <h3 className="mb-8 font-display text-2xl text-white">Related Projects</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((p, i) => (
              <ProjectCard key={p.id} {...p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
