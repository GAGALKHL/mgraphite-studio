import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Pencil, Trash2, Search, FolderOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  featured: boolean;
  createdAt: string;
}

const mockProjects: ProjectItem[] = [
  { id: 'avora', title: 'AVORA', category: 'Logo Design', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80', featured: true, createdAt: '2026-06-15' },
  { id: 'kage-branding', title: 'Kage Branding', category: 'Brand Identity', imageUrl: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=200&q=80', featured: true, createdAt: '2026-05-20' },
  { id: 'sakura-war', title: 'Sakura War T-Shirt', category: 'T-Shirt Design', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80', featured: true, createdAt: '2026-04-10' },
  { id: 'ryu-gin', title: 'Ryū Gin Packaging', category: 'Packaging Design', imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&q=80', featured: true, createdAt: '2026-03-05' },
  { id: 'nebula-tech', title: 'Nebula Tech', category: 'Logo Design', imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=200&q=80', featured: false, createdAt: '2026-02-15' },
];

export default function ManageProjects() {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState(mockProjects);

  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'admin')) {
      navigate('/');
    }
  }, [user, userData, loading, navigate]);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((p) => p.id !== id));
    }
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
        <title>Manage Projects | Mgraphite Studio</title>
        <meta name="description" content="Edit, update, and manage your portfolio projects." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <FolderOpen className="h-8 w-8 text-sakura-400" />
            <h1 className="font-display text-3xl text-white">Manage Projects</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." className="input-field pl-10" />
          </div>
        </motion.div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-white/40">Project</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-white/40">Category</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-white/40">Featured</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-white/40">Date</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-white/40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((project) => (
                  <motion.tr key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={project.imageUrl} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <span className="text-sm font-medium text-white">{project.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{project.category}</td>
                    <td className="px-6 py-4">
                      {project.featured && <span className="rounded-full bg-sakura-400/10 px-2 py-1 text-xs text-sakura-400">Featured</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/40">{project.createdAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/edit/${project.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-colors hover:bg-sakura-400/10 hover:text-sakura-400">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button onClick={() => handleDelete(project.id)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-colors hover:bg-red-400/10 hover:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="py-12 text-center text-sm text-white/40">No projects found.</div>}
        </div>
      </div>
    </div>
  );
}
