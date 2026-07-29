import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PenTool, Layers, Shirt, Package } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const serviceList = [
  {
    icon: PenTool,
    title: 'Logo Design',
    description: 'We create distinctive marks that capture the essence of your brand. From minimalist monograms to complex illustrative logos, each design is crafted to be memorable, scalable, and timeless.',
    features: ['Custom Typography', 'Vector Scalability', 'Brand Guidelines', 'Multiple Formats'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  },
  {
    icon: Layers,
    title: 'Brand Identity',
    description: 'A cohesive visual system that tells your story across every touchpoint. We develop comprehensive brand identities including color palettes, typography systems, stationery, and digital assets.',
    features: ['Color Systems', 'Typography', 'Stationery Design', 'Brand Guidelines'],
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80',
  },
  {
    icon: Shirt,
    title: 'T-Shirt Design',
    description: 'Wearable art that transforms fabric into a canvas of expression. Our apparel designs blend cultural motifs with contemporary aesthetics to create pieces that resonate with your audience.',
    features: ['Screen Print Ready', 'Vector Artwork', 'Color Separation', 'Mockups'],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
  },
  {
    icon: Package,
    title: 'Packaging Design',
    description: 'Unboxing experiences that create lasting emotional connections. We design packaging that protects, presents, and persuades — turning every delivery into a brand moment.',
    features: ['Structural Design', 'Print Ready', '3D Mockups', 'Sustainable Options'],
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
  },
];

export default function Services() {
  return (
    <div className="relative pt-32 pb-24">
      <Helmet>
        <title>Services | Mgraphite Studio</title>
        <meta name="description" content="Explore our design services: Logo Design, Brand Identity, T-Shirt Design, and Packaging Design." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading tagline="What We Offer" title="Creative Services." align="center" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/50">
          From concept to completion, we deliver design solutions that elevate your brand and captivate your audience.
        </p>

        <div className="mt-16 space-y-24">
          {serviceList.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-graphite-900">
                  <img src={service.image} alt={service.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sakura-400/10 text-sakura-400">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-3xl text-white">{service.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/60">{service.description}</p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/50">
                      <span className="h-1.5 w-1.5 rounded-full bg-sakura-400" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
