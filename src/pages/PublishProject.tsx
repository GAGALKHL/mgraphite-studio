import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, ImagePlus, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { createUploadWidget } from '@/lib/cloudinary';

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  featured: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function PublishProject() {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'admin')) {
      navigate('/');
    }
  }, [user, userData, loading, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleImageUpload = () => {
    setUploading(true);
    try {
      const widget = createUploadWidget(
        (url) => { setImageUrl(url); setUploading(false); },
        () => setUploading(false)
      );
      widget.open();
    } catch {
      setUploading(false);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log({ ...data, imageUrl });
    setPublished(true);
    setTimeout(() => navigate('/admin'), 1500);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sakura-400 border-t-transparent" />
      </div>
    );
  }

  if (published) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-32">
        <Helmet><title>Project Published | Mgraphite Studio</title></Helmet>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-400" />
          <h2 className="font-display text-3xl text-white">Project Published</h2>
          <p className="mt-2 text-white/50">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative pt-32 pb-24">
      <Helmet>
        <title>Publish Project | Mgraphite Studio</title>
        <meta name="description" content="Add a new project to the Mgraphite Studio portfolio." />
      </Helmet>

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl text-white">Publish New Project</h1>
          <p className="mt-2 text-white/50">Add a new project to your portfolio.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Project Image</label>
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={uploading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] py-12 transition-all hover:border-sakura-400/30 hover:bg-white/[0.04]"
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="h-48 w-auto rounded-lg object-cover" />
                ) : (
                  <>
                    <ImagePlus className="h-8 w-8 text-white/30" />
                    <span className="text-sm text-white/50">{uploading ? 'Uploading...' : 'Click to upload image'}</span>
                  </>
                )}
              </button>
            </div>

            <div>
              <input {...register('title')} placeholder="Project Title" className="input-field" />
              {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
            </div>

            <div>
              <select {...register('category')} className="input-field appearance-none">
                <option value="">Select Category</option>
                <option value="Logo Design">Logo Design</option>
                <option value="Brand Identity">Brand Identity</option>
                <option value="T-Shirt Design">T-Shirt Design</option>
                <option value="Packaging Design">Packaging Design</option>
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category.message}</p>}
            </div>

            <div>
              <textarea {...register('description')} rows={5} placeholder="Project Description" className="input-field resize-none" />
              {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" {...register('featured')} id="featured" className="h-4 w-4 rounded border-white/20 bg-white/5 text-sakura-400" />
              <label htmlFor="featured" className="text-sm text-white/70">Feature this project on homepage</label>
            </div>

            <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2">
              <Upload className="h-4 w-4" /> Publish Project
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
