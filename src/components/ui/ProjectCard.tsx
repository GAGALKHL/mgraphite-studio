import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  index?: number;
}

export default function ProjectCard({ id, title, category, imageUrl, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/works/${id}`} className="group relative block overflow-hidden rounded-2xl bg-graphite-900">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-sakura-400">{category}</span>
          <h3 className="font-display text-xl text-white">{title}</h3>
        </div>
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-md transition-all group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-white" />
        </div>
      </Link>
    </motion.div>
  );
}
