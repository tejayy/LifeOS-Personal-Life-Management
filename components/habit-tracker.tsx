"use client";

import { motion } from "framer-motion";

interface HabitTrackerProps {
  name: string;
  streak: number;
  days: boolean[];
  delay?: number;
}

export function HabitTracker({
  name,
  streak,
  days,
  delay = 0,
}: HabitTrackerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-sm">{name}</h4>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
          {streak} day streak
        </span>
      </div>

      <div className="flex gap-1">
        {days.map((completed, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + index * 0.02 }}
            className={`w-6 h-6 rounded-sm transition-all ${
              completed
                ? "bg-primary/60 border border-primary/80"
                : "bg-white/5 border border-border/30"
            }`}
            title={`Day ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
