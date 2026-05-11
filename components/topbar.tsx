'use client';

import { motion } from 'framer-motion';
import { Clock, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Topbar() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass sticky top-0 z-30 border-b border-border/10 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <Clock size={18} />
          <span className="text-sm font-medium">{time || '00:00'}</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Bell size={20} className="text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </motion.button>
      </div>
    </motion.header>
  );
}
