"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { motion } from "framer-motion";
import {
  Brain,
  BookOpen,
  Droplets,
  Dumbbell,
  Flame,
  Heart,
  Moon,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Trophy,
  ChevronRight,
} from "lucide-react";
import { useMemo, useState } from "react";

const moods = [
  { emoji: "😭", label: "Bad" },
  { emoji: "😔", label: "Low" },
  { emoji: "😐", label: "Okay" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😄", label: "Happy" },
  { emoji: "🤩", label: "Amazing" },
];

const habits = [
  {
    id: "wake",
    label: "Wake Early",
    icon: Flame,
    xp: 10,
  },
  {
    id: "workout",
    label: "Workout",
    icon: Dumbbell,
    xp: 20,
  },
  {
    id: "study",
    label: "Study",
    icon: Brain,
    xp: 15,
  },
  {
    id: "water",
    label: "3L Water",
    icon: Droplets,
    xp: 10,
  },
  {
    id: "reading",
    label: "Read Book",
    icon: BookOpen,
    xp: 15,
  },
  {
    id: "sleep",
    label: "Sleep Early",
    icon: Moon,
    xp: 10,
  },
];

export default function DailyEntryPage() {
  const [selectedMood, setSelectedMood] = useState(4);

  const [reflection, setReflection] = useState("");

  const [completedHabits, setCompletedHabits] = useState([
    "wake",
    "study",
    "water",
  ]);

  const progress = useMemo(() => {
    return Math.round((completedHabits.length / habits.length) * 100);
  }, [completedHabits]);

  const totalXP = useMemo(() => {
    return habits
      .filter((habit) => completedHabits.includes(habit.id))
      .reduce((acc, curr) => acc + curr.xp, 0);
  }, [completedHabits]);

  const toggleHabit = (id: string) => {
    setCompletedHabits((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <DashboardLayout>
      <div className="mx-auto space-y-6 pb-32">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-primary/20 via-background to-background p-8"
        >
          {/* Glow */}
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
                <Sparkles size={14} />
                Building Your Dream Life
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                Daily Check-In ✨
              </h1>

              <p className="mt-3 text-muted-foreground">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs text-muted-foreground">
                    Current Streak
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-lg font-bold">
                    🔥 14 Days
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs text-muted-foreground">XP Earned</p>

                  <p className="mt-1 text-lg font-bold">+{totalXP} XP</p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-primary/20 bg-black/30 backdrop-blur-xl">
                <svg className="absolute inset-0 h-full w-full -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="10"
                    fill="none"
                  />

                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * progress) / 100}
                    strokeLinecap="round"
                  />

                  <defs>
                    <linearGradient id="gradient">
                      <stop stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="text-center">
                  <h2 className="text-4xl font-bold">{progress}%</h2>

                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mood */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Heart size={20} className="text-red-400" />
                How are you feeling?
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Track your emotional wellness
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
              Mood Score: {selectedMood + 5}/10
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
            {moods.map((mood, index) => {
              const active = selectedMood === index;

              return (
                <button
                  key={index}
                  onClick={() => setSelectedMood(index)}
                  className={`group rounded-3xl border p-5 transition-all duration-300 ${
                    active
                      ? "scale-105 border-primary bg-primary/15 shadow-2xl shadow-primary/20"
                      : "border-white/10 bg-white/5 hover:scale-105 hover:bg-white/10"
                  }`}
                >
                  <div className="text-4xl transition-transform group-hover:scale-110">
                    {mood.emoji}
                  </div>

                  <p className="mt-3 text-sm font-medium">{mood.label}</p>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Habits */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <CheckCircle2 size={20} className="text-green-400" />
                Daily Habits
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Complete habits to gain XP & streaks
              </p>
            </div>

            <div className="hidden rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-400 md:block">
              {completedHabits.length}/{habits.length} Completed
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {habits.map((habit) => {
              const active = completedHabits.includes(habit.id);

              return (
                <button
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition-all duration-300 ${
                    active
                      ? "border-primary/20 bg-primary/10 shadow-lg shadow-primary/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {/* Glow */}
                  {active && (
                    <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-2xl p-3 ${
                          active ? "bg-primary/20" : "bg-white/10"
                        }`}
                      >
                        <habit.icon
                          size={20}
                          className={
                            active ? "text-primary" : "text-muted-foreground"
                          }
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold">{habit.label}</h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                          +{habit.xp} XP
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all ${
                        active
                          ? "border-primary bg-primary text-black"
                          : "border-white/20"
                      }`}
                    >
                      {active && "✓"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {[
            {
              title: "Energy",
              value: "8/10",
              icon: Sparkles,
              color: "text-yellow-400",
            },
            {
              title: "Focus",
              value: "7/10",
              icon: Brain,
              color: "text-blue-400",
            },
            {
              title: "Growth",
              value: "+18%",
              icon: TrendingUp,
              color: "text-green-400",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>

                  <h2 className="mt-2 text-4xl font-bold">{card.value}</h2>
                </div>

                <div className="rounded-2xl bg-white/5 p-3">
                  <card.icon size={22} className={card.color} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Brain size={20} className="text-purple-400" />
                Reflection Journal
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Write one thing you learned today
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400 md:flex">
              <Trophy size={16} />
              Self Awareness +5 XP
            </div>
          </div>

          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Today was productive because..."
            className="min-h-[180px] w-full rounded-3xl border border-white/10 bg-black/20 p-5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
          />

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Keep it short, real & honest ✨
            </p>

            <p className="text-sm text-muted-foreground">
              {reflection.length}/300
            </p>
          </div>
        </motion.div>

        {/* Save */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="fixed bottom-6 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 px-6"
        >
          <button className="group flex w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-primary to-pink-500 px-6 py-5 text-lg font-semibold text-white shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02]">
            Save Daily Entry
            <ChevronRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
