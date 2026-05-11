"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard } from "@/components/stat-card";
import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Flame,
  Heart,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  BarChart,
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import { ProgressRing } from "@/components/progress-ring";
import { FinanceWidget } from "@/components/finance-widget";
import { HealthTracker } from "@/components/health-tracker";
import { HabitTracker } from "@/components/habit-tracker";

// Mock data
const portfolioData = [
  { date: "1", value: 45000 },
  { date: "5", value: 48000 },
  { date: "10", value: 42000 },
  { date: "15", value: 50000 },
  { date: "20", value: 52000 },
  { date: "25", value: 51000 },
  { date: "30", value: 55000 },
];

const healthData = [
  { date: "1", steps: 7200, calories: 2100 },
  { date: "5", steps: 8500, calories: 2200 },
  { date: "10", steps: 9200, calories: 2300 },
  { date: "15", steps: 6800, calories: 1900 },
  { date: "20", steps: 10200, calories: 2500 },
  { date: "25", steps: 9100, calories: 2400 },
  { date: "30", steps: 8800, calories: 2200 },
];

const spendingData = [
  { category: "Food", amount: 450 },
  { category: "Transport", amount: 280 },
  { category: "Entertainment", amount: 320 },
  { category: "Utilities", amount: 200 },
  { category: "Other", amount: 150 },
];

const tasks = [
  { id: 1, title: "Complete project report", completed: true },
  { id: 2, title: "Review team feedback", completed: true },
  { id: 3, title: "Schedule meeting", completed: false },
  { id: 4, title: "Update documentation", completed: false },
];

const habits = [
  {
    name: "Exercise",
    streak: 24,
    days: Array(30)
      .fill(false)
      .map((_, i) => i > 5),
  },
  {
    name: "Meditation",
    streak: 12,
    days: Array(30)
      .fill(false)
      .map((_, i) => i > 17),
  },
  {
    name: "Reading",
    streak: 8,
    days: Array(30)
      .fill(false)
      .map((_, i) => i > 22),
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function Dashboard() {
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Stats */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            title="Portfolio Value"
            value="$55,000"
            subtitle="↑ 8.2% this month"
            icon={<TrendingUp size={24} />}
            trend={{ value: 8.2, direction: "up" }}
            delay={0}
          />
          <StatCard
            title="Health Score"
            value="87"
            subtitle="Very Good"
            icon={<Heart size={24} />}
            trend={{ value: 2.3, direction: "up" }}
            delay={0.05}
          />
          <StatCard
            title="Tasks Today"
            value={`${completedTasks}/${tasks.length}`}
            subtitle="2 remaining"
            icon={<CheckCircle2 size={24} />}
            trend={{ value: 50, direction: "up" }}
            delay={0.1}
          />
          <StatCard
            title="Streaks"
            value="14"
            subtitle="Days active"
            icon={<Zap size={24} />}
            trend={{ value: 0, direction: "up" }}
            delay={0.15}
          />
        </motion.section>

        {/* Charts Sections */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Portfolio Chart */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Portfolio Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(20, 20, 30, 0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#a78bfa"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Health Chart */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Daily Activity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={healthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(20, 20, 30, 0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="steps" fill="#60a5fa" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* Tasks & Health Progress */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Tasks */}
          <div className="lg:col-span-2">
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Target size={20} /> Today&apos;s Tasks
                </h3>
                <span className="text-sm text-muted-foreground">
                  {completedTasks}/{tasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      readOnly
                      className="w-5 h-5 rounded border-border bg-white/10 accent-primary"
                    />
                    <span
                      className={`flex-1 ${
                        task.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Health Progress */}
          <div className="glass rounded-xl p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-6">Weekly Goals</h3>
            <div className="flex justify-around w-full">
              <ProgressRing percentage={87} label="Fitness" delay={0.5} />
              <ProgressRing percentage={72} label="Nutrition" delay={0.55} />
            </div>
          </div>
        </motion.section>

        {/* Financial Overview */}
        <motion.section variants={itemVariants}>
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle size={20} /> Monthly Spending
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={spendingData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
                <YAxis
                  type="category"
                  dataKey="category"
                  stroke="rgba(255,255,255,0.5)"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(20, 20, 30, 0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="amount" fill="#818cf8" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* Habits Section */}
        <motion.section variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap size={20} /> Current Habits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {habits.map((habit, index) => (
              <HabitTracker
                key={habit.name}
                name={habit.name}
                streak={habit.streak}
                days={habit.days}
                delay={0.6 + index * 0.05}
              />
            ))}
          </div>
        </motion.section>

        {/* Health Stats */}
        <motion.section variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity size={20} /> Health Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <HealthTracker
              label="Steps Today"
              value={8234}
              max={10000}
              unit=""
              icon={<Activity size={16} />}
              color="#60a5fa"
              delay={0.7}
            />
            <HealthTracker
              label="Calories Burned"
              value={2150}
              max={2500}
              unit=""
              icon={<Flame size={16} />}
              color="#f97316"
              delay={0.75}
            />
            <HealthTracker
              label="Water Intake"
              value={6}
              max={8}
              unit=" cups"
              icon={<Zap size={16} />}
              color="#06b6d4"
              delay={0.8}
            />
            <HealthTracker
              label="Sleep Duration"
              value={7.5}
              max={9}
              unit=" hrs"
              icon={<Heart size={16} />}
              color="#ec4899"
              delay={0.85}
            />
          </div>
        </motion.section>

        {/* Financial Overview */}
        <motion.section variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={20} /> Financial Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FinanceWidget
              title="Monthly Income"
              amount={5200}
              change={5.2}
              period="This month"
              delay={0.9}
            />
            <FinanceWidget
              title="Monthly Spending"
              amount={1400}
              change={-2.3}
              period="This month"
              delay={0.95}
            />
            <FinanceWidget
              title="Savings"
              amount={18500}
              change={8.7}
              period="YTD"
              delay={1}
            />
            <FinanceWidget
              title="Investments"
              amount={55000}
              change={12.4}
              period="Current value"
              delay={1.05}
            />
          </div>
        </motion.section>

        {/* Reflection & Daily Entry */}
        <motion.section variants={itemVariants}>
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar size={20} /> Daily Reflection
              </h3>
              <button className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors text-sm font-medium">
                Write Entry
              </button>
            </div>
            <p className="text-muted-foreground">
              &quot;Today was productive. Completed most of my tasks and had a
              great workout session. Looking forward to tomorrow!&quot;
            </p>
          </div>
        </motion.section>
      </motion.div>
    </DashboardLayout>
  );
}
