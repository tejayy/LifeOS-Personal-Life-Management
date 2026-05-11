"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({
  className = "h-12 w-full",
  count = 1,
}: SkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`glass rounded-lg ${className}`}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
}
