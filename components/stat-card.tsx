"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  delay?: number;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.4,
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.06]"
    >
      {/* Glow Effects */}
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-primary/[0.03]" />

      {/* Content */}
      <div className="relative z-10">
        {/* Top */}
        <div className="flex items-start justify-between">
          {/* Left */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <h3 className="mt-3 text-4xl font-bold tracking-tight">{value}</h3>

            {subtitle && (
              <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Icon */}
          {icon && (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary shadow-lg shadow-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10">
              {icon}
            </div>
          )}
        </div>

        {/* Bottom */}
        {trend && (
          <div className="mt-6 flex items-center justify-between">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                trend.direction === "up"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {trend.direction === "up" ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              {Math.abs(trend.value)}%
            </div>

            <p className="text-xs text-muted-foreground">vs last week</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
