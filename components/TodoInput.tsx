"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Todo } from "@/app/daily-entry/page";

interface TodoInputProps {
  onAddTodo: (
    title: string,
    description: string,
    category: Todo["category"],
  ) => void;
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Todo["category"]>("personal");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title, description, category);
      setTitle("");
      setDescription("");
      setCategory("personal");
      setShowForm(false);
    }
  };

  return (
    <div className="bg-card backdrop-blur-xl rounded-2xl border border-border p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center gap-3 px-6 py-4 rounded-xl border-2 border-dashed border-primary/40 hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 group"
        >
          <Plus className="w-5 h-5 group-hover:scale-125 transition-transform duration-200" />
          <span className="font-medium">
            Add a new task to organize your life...
          </span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Task Title
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Drink 3 liters of water"
              autoFocus
              className="bg-card/50 border-border text-foreground placeholder-muted-foreground rounded-xl h-11"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Description (optional)
            </label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about this task"
              className="bg-card/50 border-border text-foreground placeholder-muted-foreground rounded-xl h-11"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Todo["category"])}
              className="w-full bg-card/50 border border-border text-foreground rounded-xl px-4 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="health">💪 Health & Wellness</option>
              <option value="work">💼 Work & Career</option>
              <option value="personal">👤 Personal & Life</option>
              <option value="learning">📚 Learning & Growth</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/20 text-primary-foreground font-semibold rounded-xl h-10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
            <Button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 bg-card hover:bg-card/80 text-foreground border border-border font-semibold rounded-xl h-10"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
