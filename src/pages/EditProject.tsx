import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { createUploadWidget } from '@/lib/cloudinary';

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  featured: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

const mockProject = {
  id: 'avora',
  title: 'AVORA',
  category: 'Logo Design',
  description: 'A geometric monogram that embodies elegance and modern sophistication.',
  imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  featured: true,
};

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(mockProject.imageUrl);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'admin')) {
      navigate('/');
    }
  }, [user, userData, loading, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: mockProject.title,
      category: mockProject.category,
      description: mockProject.description,
      featured: mockProject.featured,
    },
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
    console.log({ id, ...data, imageUrl });
    navigate('/admin/projects');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sakura-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative pt-32 pb-24">
      <Helmet>
        <title>Edit Project | Mgraphite Studio</title>
        <meta name="description" content="Update project details and assets." />
      </Helmet>

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => navigate('/admin/projects')} className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-sakura-400">
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </button>

          <h1 className="font-display text-3xl text-white">Edit Project</h1>
          <p className="mt-2 text-white/50">Update project details.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Project Image</label>
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={uploading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] py-8 transition-all hover:border-sakura-400/30"
              >
                <img src={imageUrl} alt="Preview" className="h-32 w-auto rounded-lg object-cover" />
              </button>
            </div>

            <div>
              <input {...register('title')} placeholder="Project Title" className="input-field" />
              {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
            </div>

            <div>
              <select {...register('category')} className="input-field appearance-none">
                <option value="Logo Design">Logo Design</option>
                <option value="Brand Identity">Brand Identity</option>
                <option value="T-Shirt Design">T-Shirt Design</option>
                <option value="Packaging Design">Packaging Design</option>
              </select>
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
              <Save className="h-4 w-4" /> Save Changes
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
