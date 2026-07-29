import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PenTool, Layers, Shirt, Package, ArrowUpRight } from 'lucide-react';

const categories = [
  {
    id: 'logo-design',
    title: 'Logo Design',
    description: 'Unique marks that capture the essence of your brand in a single glance.',
    icon: PenTool,
    count: 18,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    description: 'Complete visual systems that tell cohesive stories across every touchpoint.',
    icon: Layers,
    count: 12,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80',
  },
  {
    id: 'tshirt-design',
    title: 'T-Shirt Design',
    description: 'Wearable art that transforms fabric into a canvas of expression.',
    icon: Shirt,
    count: 24,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
  },
  {
    id: 'packaging-design',
    title: 'Packaging Design',
    description: 'Unboxing experiences that create lasting emotional connections.',
    icon: Package,
    count: 9,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
  },
];

export default function Categories() {
  return (
    <div className="relative pt-32 pb-24">
      <Helmet>
        <title>Categories | Mgraphite Studio</title>
        <meta name="description" content="Explore our work across logo design, brand identity, apparel, and packaging disciplines." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-sakura-400">Browse by Discipline</span>
          <h1 className="font-display text-4xl text-white md:text-5xl">Categories</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/50">
            Explore our work across different creative disciplines. Each category represents a unique approach to visual storytelling.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/works?category=${cat.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-graphite-900"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={cat.image} alt={cat.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-transparent" />
                  <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                    <cat.icon className="h-6 w-6 text-sakura-400" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-display text-2xl text-white">{cat.title}</h3>
                      <span className="text-sm text-white/40">{cat.count} projects</span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/50">{cat.description}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-sakura-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Explore Projects <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
