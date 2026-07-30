import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronRight, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import SakuraParticles from '@/components/effects/SakuraParticles';

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    { icon: '✦', title: t('services.logo.title' as never), desc: t('services.logo.desc' as never), to: '/categories' },
    { icon: '◈', title: t('services.brand.title' as never), desc: t('services.brand.desc' as never), to: '/categories' },
    { icon: '✧', title: t('services.apparel.title' as never), desc: t('services.apparel.desc' as never), to: '/categories' },
  ];

  const projects = [
    { id: 'avora', title: 'AVORA', category: 'Logo Design', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80' },
    { id: 'kage-branding', title: 'Kage Branding', category: 'Brand Identity', imageUrl: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80' },
    { id: 'sakura-war', title: 'Sakura War T-Shirt', category: 'T-Shirt Design', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
    { id: 'ryu-gin', title: 'Ryū Gin Packaging', category: 'Packaging Design', imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80' },
  ];

  const stats = [
    { value: '50+', label: t('stats.projects' as never) },
    { value: '30+', label: t('stats.clients' as never) },
    { value: '3+', label: t('stats.experience' as never) },
    { value: '100%', label: t('stats.satisfaction' as never) },
  ];

  return (
    <div className="relative">
      <Helmet>
        <title>Mgraphite Studio | Every Bloom Begins With A Line</title>
        <meta name="description" content="Premium graphic design studio crafting visual identities, logos, and creative apparel. Based in Algeria." />
      </Helmet>

      <SakuraParticles />

      {/* Hero */}
      <motion.section
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,170,186,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(100,100,100,0.05)_0%,_transparent_60%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-sakura-400">
                {t('hero.tagline' as never)}
              </span>
              <h1 className="font-display text-5xl leading-[1.1] text-white md:text-6xl lg:text-7xl">
                Designs That<br />
                <span className="text-gradient-sakura">Leave A Mark.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/50">
                {t('hero.subtitle' as never)}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/works" className="btn-primary flex items-center gap-2">
                  {t('hero.cta.portfolio' as never)} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="btn-outline flex items-center gap-2">
                  {t('hero.cta.contact' as never)} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-graphite-950 bg-graphite-800 text-xs font-medium text-white/60">
                      <Users className="h-4 w-4" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-lg font-bold text-white">50+</p>
                  <p className="text-xs text-white/40">{t('hero.clients' as never)}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-lg">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sakura-400/20 to-transparent blur-3xl" />
                <img
                  src="/hero-logo.png"
                  alt="Mgraphite Studio Logo - A graphite pencil forming the letter M with sakura blossoms"
                  className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading tagline={t('services.tagline' as never)} title={t('services.title' as never)} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Link
                  to={service.to}
                  className="group block h-full rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-300 hover:border-sakura-400/20 hover:bg-white/[0.04]"
                >
                  <span className="mb-4 block text-3xl text-sakura-400">{service.icon}</span>
                  <h3 className="font-display text-xl text-white">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{service.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm text-sakura-400 opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ChevronRight className="h-3 w-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <SectionHeading tagline={t('works.tagline' as never)} title={t('works.title' as never)} />
            <Link to="/works" className="mb-2 hidden items-center gap-1 text-sm text-sakura-400 transition-colors hover:text-sakura-300 md:flex">
              {t('works.viewAll' as never)} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} {...project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:grid-cols-4 md:p-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-4xl text-sakura-400 md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
