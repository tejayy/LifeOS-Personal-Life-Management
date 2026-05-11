"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard } from "@/components/stat-card";
import { TrendingUp, Calendar, Target } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Bar,
} from "recharts";

const monthlyData = [
  { month: "Jan", mood: 6.5, energy: 6, productivity: 7, health: 72 },
  { month: "Feb", mood: 7, energy: 6.5, productivity: 7.5, health: 75 },
  { month: "Mar", mood: 7.2, energy: 7, productivity: 8, health: 78 },
  { month: "Apr", mood: 7.5, energy: 7.2, productivity: 8.5, health: 82 },
  { month: "May", mood: 8, energy: 7.8, productivity: 9, health: 85 },
  { month: "Jun", mood: 8.2, energy: 8, productivity: 8.8, health: 87 },
];

const habitData = [
  { name: "Exercise", streak: 24, completion: 92 },
  { name: "Meditation", streak: 12, completion: 78 },
  { name: "Reading", streak: 8, completion: 65 },
  { name: "Journaling", streak: 18, completion: 88 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Analytics() {
  const avgMood = (
    monthlyData.reduce((sum, d) => sum + d.mood, 0) / monthlyData.length
  ).toFixed(1);
  const avgEnergy = (
    monthlyData.reduce((sum, d) => sum + d.energy, 0) / monthlyData.length
  ).toFixed(1);
  const avgProductivity = (
    monthlyData.reduce((sum, d) => sum + d.productivity, 0) / monthlyData.length
  ).toFixed(1);

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.section variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-2">Analytics & Insights</h1>
          <p className="text-muted-foreground">Track your progress over time</p>
        </motion.section>

        {/* Overview Stats */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <StatCard
            title="Avg Mood"
            value={avgMood}
            subtitle="Last 6 months"
            icon={<TrendingUp size={24} />}
            delay={0}
          />
          <StatCard
            title="Avg Energy"
            value={avgEnergy}
            subtitle="Last 6 months"
            icon={<Target size={24} />}
            delay={0.05}
          />
          <StatCard
            title="Avg Productivity"
            value={avgProductivity}
            subtitle="Last 6 months"
            icon={<Calendar size={24} />}
            delay={0.1}
          />
        </motion.section>

        {/* Trends Chart */}
        <motion.section variants={itemVariants}>
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">6-Month Trends</h3>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={monthlyData}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(20, 20, 30, 0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="health" fill="#60a5fa" radius={[8, 8, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#ec4899"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="#fbbf24"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* Habits & Streaks */}
        <motion.section variants={itemVariants}>
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6">Habit Streaks</h3>
            <div className="space-y-4">
              {habitData.map((habit, index) => (
                <motion.div
                  key={habit.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{habit.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {habit.completion}%
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {habit.streak} days
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${habit.completion}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Insights */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Your mood has improved by 25% over 6 months</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">→</span>
                <span>
                  Exercise habit has the highest completion rate (92%)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Energy levels correlate strongly with workout days</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Productivity peaks on Tuesdays and Thursdays</span>
              </li>
            </ul>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Keep up your exercise routine - it&apos;s working!</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Schedule important tasks for Tue/Thu</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Focus on meditation during low-energy weeks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Consider reading before bed to improve sleep</span>
              </li>
            </ul>
          </div>
        </motion.section>
      </motion.div>
    </DashboardLayout>
  );
}
