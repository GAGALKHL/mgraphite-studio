import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';

export default function FavoriteButton() {
  const [saved, setSaved] = useState(false);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setSaved(!saved)}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-sakura-400/30"
    >
      <Bookmark className={`h-4 w-4 transition-colors ${saved ? 'fill-sakura-400 text-sakura-400' : 'text-white/50'}`} />
    </motion.button>
  );
}
