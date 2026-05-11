"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Clock3,
  Flame,
  Search,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Topbar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );

      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 border-b border-white/10 bg-background/70 backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div className="flex items-center gap-6">
          {/* Greeting */}
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold">Welcome back, Tejas 👋</h2>

            <p className="text-sm text-muted-foreground">{date}</p>
          </div>

          {/* Search */}
          <div className="hidden lg:flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 min-w-[320px]">
            <Search size={18} className="text-muted-foreground" />

            <input
              type="text"
              placeholder="Search goals, habits, finance..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />

            <kbd className="rounded-md bg-white/10 px-2 py-1 text-xs text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Time */}
          <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
            <Clock3 size={16} className="text-primary" />

            <span className="text-sm font-medium">{time}</span>
          </div>

          {/* Streak */}
          <div className="hidden md:flex items-center gap-2 rounded-2xl border border-orange-500/20 bg-orange-500/10 px-4 py-2">
            <Flame size={16} className="text-orange-400" />

            <span className="text-sm font-semibold">12 Day Streak</span>
          </div>

          {/* AI Button */}
          <button className="hidden md:flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:scale-105">
            <Sparkles size={16} />
            AI Insights
          </button>

          {/* Notifications */}
          <button className="relative rounded-2xl border border-white/10 bg-white/5 p-3 transition-all hover:bg-white/10">
            <Bell size={18} className="text-muted-foreground" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          </button>

          {/* Profile */}
          <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition-all hover:bg-white/10">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>TJ</AvatarFallback>
            </Avatar>

            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">Tejas</p>
              <p className="text-xs text-muted-foreground">
                Level 7 Productivity
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden md:block text-muted-foreground"
            />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
