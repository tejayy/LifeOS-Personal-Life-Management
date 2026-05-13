"use client";

import { useEffect, useState } from "react";
import {
  Droplet,
  Footprints,
  Moon,
  Apple,
  Brain,
  Heart,
  Zap,
  Clock,
  Smile,
  Wind,
} from "lucide-react";
import WellnessCard from "./WellnessCard";

interface SuggestionItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  priority: number;
}

interface SuggestionsPanelProps {
  completedTodos: number;
  totalTodos: number;
}

export default function SuggestionsPanel({
  completedTodos,
  totalTodos,
}: SuggestionsPanelProps) {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [completedSuggestions, setCompletedSuggestions] = useState<Set<string>>(
    new Set(),
  );

  // Load completed suggestions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("completedSuggestions");
    if (saved) {
      setCompletedSuggestions(new Set(JSON.parse(saved)));
    }
  }, []);

  // Generate suggestions based on time and habits
  useEffect(() => {
    const hour = new Date().getHours();
    const completionRate = totalTodos > 0 ? completedTodos / totalTodos : 0;

    const allSuggestions: SuggestionItem[] = [
      {
        id: "water",
        title: "Drink 3L of Water",
        description:
          "Stay hydrated throughout the day for better energy and focus",
        icon: <Droplet className="w-5 h-5 text-blue-400" />,
        color: "bg-blue-500/10 border-blue-500/30",
        priority: 1,
      },
      {
        id: "exercise",
        title: "Exercise for 30 mins",
        description: "Get moving to boost your mood and physical health",
        icon: <Footprints className="w-5 h-5 text-red-400" />,
        color: "bg-red-500/10 border-red-500/30",
        priority: 1,
      },
      {
        id: "sleep",
        title: "Get 7-8 Hours Sleep",
        description: "Quality sleep is essential for recovery and productivity",
        icon: <Moon className="w-5 h-5 text-purple-400" />,
        color: "bg-purple-500/10 border-purple-500/30",
        priority: hour >= 22 || hour < 6 ? 1 : 3,
      },
      {
        id: "nutrition",
        title: "Eat Balanced Meals",
        description: "Fuel your body with nutritious whole foods",
        icon: <Apple className="w-5 h-5 text-green-400" />,
        color: "bg-green-500/10 border-green-500/30",
        priority: 2,
      },
      {
        id: "meditation",
        title: "Meditate for 10 mins",
        description: "Reduce stress and improve mental clarity",
        icon: <Brain className="w-5 h-5 text-indigo-400" />,
        color: "bg-indigo-500/10 border-indigo-500/30",
        priority: 2,
      },
      {
        id: "heartrate",
        title: "Check Your Health",
        description: "Monitor your vital signs and overall wellness",
        icon: <Heart className="w-5 h-5 text-pink-400" />,
        color: "bg-pink-500/10 border-pink-500/30",
        priority: 3,
      },
      {
        id: "energy",
        title: "Take Short Breaks",
        description: "Rest every hour to maintain energy and focus",
        icon: <Zap className="w-5 h-5 text-yellow-400" />,
        color: "bg-yellow-500/10 border-yellow-500/30",
        priority: 2,
      },
      {
        id: "schedule",
        title: "Plan Tomorrow",
        description: "Prepare your schedule for better organization",
        icon: <Clock className="w-5 h-5 text-orange-400" />,
        color: "bg-orange-500/10 border-orange-500/30",
        priority: hour >= 20 ? 1 : 3,
      },
      {
        id: "mindfulness",
        title: "Practice Gratitude",
        description: "Reflect on things you&apos;re grateful for today",
        icon: <Smile className="w-5 h-5 text-cyan-400" />,
        color: "bg-cyan-500/10 border-cyan-500/30",
        priority: 2,
      },
      {
        id: "breathing",
        title: "Deep Breathing",
        description: "Take 5 deep breaths to calm your mind",
        icon: <Wind className="w-5 h-5 text-emerald-400" />,
        color: "bg-emerald-500/10 border-emerald-500/30",
        priority: 2,
      },
    ];

    // Sort by priority and completion rate
    const sorted = allSuggestions.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return Math.random() - 0.5;
    });

    // Show top suggestions based on completion rate
    const topCount = completionRate > 0.7 ? 4 : completionRate > 0.4 ? 5 : 6;
    setSuggestions(sorted.slice(0, topCount));
  }, [completedTodos, totalTodos]);

  const handleMarkComplete = (id: string) => {
    const newCompleted = new Set(completedSuggestions);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedSuggestions(newCompleted);
    localStorage.setItem(
      "completedSuggestions",
      JSON.stringify([...newCompleted]),
    );
  };

  const completionRate =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Progress Card - Premium */}
      <div className="bg-gradient-to-br from-primary to-accent rounded-2xl border border-primary/30 p-6 shadow-xl shadow-primary/10 backdrop-blur-xl">
        <h2 className="text-xl font-bold text-primary-foreground mb-5">
          📈 Your Progress
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-3">
              <span className="text-sm font-medium text-primary-foreground/80">
                Tasks Completed
              </span>
              <span className="text-sm font-bold text-primary-foreground">
                {completedTodos}/{totalTodos}
              </span>
            </div>
            <div className="w-full bg-primary-foreground/10 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary-foreground via-primary-foreground to-primary-foreground h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
          <div className="text-center pt-2">
            <span className="text-3xl font-bold text-primary-foreground">
              {completionRate}%
            </span>
            <p className="text-xs text-primary-foreground/70 mt-2 font-medium">
              {completionRate >= 80
                ? "🎉 Keep up the amazing work!"
                : completionRate >= 50
                  ? "⚡ Great progress, keep going!"
                  : "💪 You got this, start with one task!"}
            </p>
          </div>
        </div>
      </div>

      {/* Wellness Suggestions */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-2">
          ✨ Smart Suggestions
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Personalized wellness tips for your journey
        </p>
        <div className="space-y-2">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => handleMarkComplete(suggestion.id)}
              className="cursor-pointer transition-all duration-200 transform hover:scale-102"
            >
              <WellnessCard
                title={suggestion.title}
                description={suggestion.description}
                icon={suggestion.icon}
                color={suggestion.color}
                completed={completedSuggestions.has(suggestion.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Motivation Quote */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-2xl p-5 backdrop-blur-sm">
        <p className="text-sm text-foreground italic text-center leading-relaxed">
          {
            [
              "💎 Your health is your wealth. Take care of yourself first.",
              "🚀 Progress, not perfection. Every small step counts.",
              "🌟 You&apos;re building the life you deserve, one task at a time.",
              "🔥 Consistency is the key to transformation.",
              "🌈 Your future self will thank you for the effort today.",
            ][Math.floor(Math.random() * 5)]
          }
        </p>
      </div>
    </div>
  );
}
