"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface FinanceWidgetProps {
  title: string;
  amount: number;
  change: number;
  period: string;
  delay?: number;
}

export function FinanceWidget({
  title,
  amount,
  change,
  period,
  delay = 0,
}: FinanceWidgetProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass rounded-xl p-6 flex flex-col gap-4"
    >
      <h4 className="text-sm text-muted-foreground font-medium">{title}</h4>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold">${amount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{period}</p>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.1 }}
          className={`p-2 rounded-lg ${
            isPositive
              ? "bg-green-500/20 text-green-500"
              : "bg-red-500/20 text-red-500"
          }`}
        >
          {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
        </motion.div>
      </div>

      <div
        className={`text-xs font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}
      >
        {isPositive ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
      </div>
    </motion.div>
  );
}
