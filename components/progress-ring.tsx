"use client";

import { motion } from "framer-motion";

interface ProgressRingProps {
  percentage: number;
  label: string;
  size?: number;
  delay?: number;
}

export function ProgressRing({
  percentage,
  label,
  size = 120,
  delay = 0,
}: ProgressRingProps) {
  const radius = (size - 10) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="flex flex-col items-center gap-3"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{ transform: "rotate(-90deg)" }}
          className="absolute inset-0"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-border"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-primary transition-all duration-500"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">{percentage}%</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">{label}</p>
    </motion.div>
  );
}
