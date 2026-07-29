import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface LikeButtonProps {
  initialLikes?: number;
}

export default function LikeButton({ initialLikes = 0 }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialLikes);

  const handleLike = () => {
    setLiked(!liked);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleLike}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-colors hover:border-sakura-400/30"
    >
      <Heart className={`h-4 w-4 transition-colors ${liked ? 'fill-sakura-400 text-sakura-400' : 'text-white/50'}`} />
      <span className="text-sm text-white/60">{formatNumber(count)}</span>
    </motion.button>
  );
}
