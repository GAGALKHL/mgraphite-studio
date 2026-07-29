import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';
import SectionHeading from '@/components/ui/SectionHeading';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="relative pt-32 pb-24">
      <Helmet>
        <title>About | Mgraphite Studio</title>
        <meta name="description" content="Learn about Mgraphite Studio's philosophy and creative journey." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading tagline={t('about.tagline' as never)} title={t('about.title' as never)} />
            <div className="mt-8 space-y-6 text-base leading-relaxed text-white/60">
              <p>{t('about.story1' as never)}</p>
              <p>{t('about.story2' as never)}</p>
              <p>{t('about.story3' as never)}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-graphite-900">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
                alt="Creative workspace"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-graphite-950 p-6 shadow-2xl">
              <p className="font-display text-3xl text-sakura-400">3+</p>
              <p className="text-sm text-white/50">Years of Craft</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
