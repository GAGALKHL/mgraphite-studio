import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

interface Comment {
  id: string;
  userName: string;
  userPhoto: string;
  text: string;
  date: string;
}

const mockComments: Comment[] = [
  {
    id: '1',
    userName: 'Sarah Chen',
    userPhoto: 'https://i.pravatar.cc/150?u=sarah',
    text: 'Absolutely stunning work! The attention to detail in the Sakura War collection is incredible.',
    date: '2 days ago',
  },
  {
    id: '2',
    userName: 'Marcus Rivera',
    userPhoto: 'https://i.pravatar.cc/150?u=marcus',
    text: 'The AVORA logo perfectly captures the essence of modern luxury. Would love to collaborate.',
    date: '5 days ago',
  },
];

export default function CommentSection({ projectId: _projectId }: { projectId: string }) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      userName: 'Guest User',
      userPhoto: 'https://i.pravatar.cc/150?u=guest',
      text: text.trim(),
      date: 'Just now',
    };
    setComments([newComment, ...comments]);
    setText('');
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <MessageCircle className="h-5 w-5 text-sakura-400" />
        <h3 className="font-display text-xl text-white">Comments</h3>
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/40">{comments.length}</span>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts..."
          className="input-field flex-1"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sakura-400 text-graphite-950 transition-opacity disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      <div className="space-y-4">
        <AnimatePresence>
          {comments.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <img src={c.userPhoto} alt={c.userName} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{c.userName}</span>
                  <span className="text-xs text-white/30">{c.date}</span>
                </div>
                <p className="mt-1 text-sm text-white/60">{c.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
