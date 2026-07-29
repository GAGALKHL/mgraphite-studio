import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/mgraphite_graphicdesign/' },
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/213540903959' },
    { icon: Mail, label: 'Email', href: 'mailto:mgraphitestudio@gmail.com' },
  ];

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Works', to: '/works' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-graphite-950">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-display text-3xl font-bold text-white">
                M<span className="text-sakura-400">graphite</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              Every bloom begins with a line. We craft visual identities that transform darkness into art.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-sakura-400/30 hover:text-sakura-400"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="group flex items-center gap-1 text-sm text-white/40 transition-colors hover:text-sakura-400">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">Contact</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li>Algeria</li>
              <li>
                <a href="mailto:mgraphitestudio@gmail.com" className="transition-colors hover:text-sakura-400">
                  mgraphitestudio@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+213540903959" className="transition-colors hover:text-sakura-400">
                  +213 540 903 959
                </a>
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row"
        >
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Mgraphite Studio. {t('footer.rights' as never)}
          </p>
          <p className="text-xs text-white/20">{t('footer.crafted' as never)}</p>
        </motion.div>
      </div>
    </footer>
  );
}
