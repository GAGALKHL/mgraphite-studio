import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, Instagram, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { sendProjectRequest } from '@/lib/emailjs';
import SectionHeading from '@/components/ui/SectionHeading';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await sendProjectRequest(data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      label: t('contact.whatsapp' as never),
      value: '+213 540 903 959',
      href: 'https://wa.me/213540903959',
    },
    {
      icon: Instagram,
      label: t('contact.instagram' as never),
      value: '@mgraphite_graphicdesign',
      href: 'https://www.instagram.com/mgraphite_graphicdesign/',
    },
    {
      icon: Mail,
      label: t('contact.emailme' as never),
      value: 'mgraphitestudio@gmail.com',
      href: 'mailto:mgraphitestudio@gmail.com',
    },
  ];

  return (
    <div className="relative pt-32 pb-24">
      <Helmet>
        <title>Contact | Mgraphite Studio</title>
        <meta name="description" content="Have a project in mind? Let's create something amazing together. Contact Mgraphite Studio." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading tagline={t('contact.tagline' as never)} title={t('contact.title' as never)} />
            <p className="mt-6 text-white/60">{t('contact.subtitle' as never)}</p>

            <div className="mt-12 space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-sakura-400/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sakura-400/10 text-sakura-400">
                    <method.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{method.label}</p>
                    <p className="text-sm text-white/50">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <input {...register('name')} placeholder={t('contact.name' as never)} className="input-field" />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register('email')} type="email" placeholder={t('contact.email' as never)} className="input-field" />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <select {...register('service')} className="input-field appearance-none">
                  <option value="">{t('contact.service' as never)}</option>
                  <option value="Logo Design">Logo Design</option>
                  <option value="Brand Identity">Brand Identity</option>
                  <option value="T-Shirt Design">T-Shirt Design</option>
                  <option value="Packaging Design">Packaging Design</option>
                  <option value="Other">Other</option>
                </select>
                {errors.service && <p className="mt-1 text-xs text-red-400">{errors.service.message}</p>}
              </div>

              <div>
                <textarea {...register('message')} rows={5} placeholder={t('contact.message' as never)} className="input-field resize-none" />
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
              </div>

              <button type="submit" disabled={loading} className="btn-primary flex w-full items-center justify-center gap-2 disabled:opacity-50">
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-graphite-950 border-t-transparent" />
                ) : (
                  <>
                    {t('contact.send' as never)} <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-lg bg-green-500/10 p-4 text-sm text-green-400">
                  <CheckCircle className="h-4 w-4" /> {t('form.success' as never)}
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" /> {t('form.error' as never)}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
