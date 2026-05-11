"use client";

import { motion } from "framer-motion";

interface HealthTrackerProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
}

export function HealthTracker({
  label,
  value,
  max,
  unit,
  icon,
  color = "#a78bfa",
  delay = 0,
}: HealthTrackerProps) {
  const percentage = (value / max) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass rounded-xl p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <div className="p-1.5 bg-white/10 rounded-lg">{icon}</div>}
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-sm font-bold text-primary">
          {value.toLocaleString()}
          {unit}
        </span>
      </div>

      <div className="relative h-2 bg-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.1, duration: 0.8 }}
          style={{ backgroundColor: color }}
          className="h-full rounded-full"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        {value} of {max} {unit}
      </p>
    </motion.div>
  );
}
