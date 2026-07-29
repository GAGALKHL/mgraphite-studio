import { motion } from 'framer-motion';

interface SectionHeadingProps {
  tagline: string;
  title: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ tagline, title, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-sakura-400"
      >
        {tagline}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-display text-3xl text-white md:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
