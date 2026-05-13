"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Todo } from "@/app/daily-entry/page";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    title: string,
    description: string,
    category: Todo["category"],
  ) => void;
}

const CATEGORY_ICONS: Record<Todo["category"], string> = {
  health: "💪",
  work: "💼",
  personal: "👤",
  learning: "📚",
};

const CATEGORY_COLORS: Record<
  Todo["category"],
  { bg: string; border: string; text: string }
> = {
  health: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
  },
  work: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-400",
  },
  personal: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
  },
  learning: {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-400",
  },
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || "",
  );
  const [editCategory, setEditCategory] = useState(todo.category);

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle, editDescription, editCategory);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setEditCategory(todo.category);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-card backdrop-blur-xl rounded-2xl border border-border p-5">
        <div className="space-y-3">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
            className="bg-card/50 border-border text-foreground placeholder-muted-foreground rounded-xl h-10"
          />
          <Input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description (optional)"
            className="bg-card/50 border-border text-foreground placeholder-muted-foreground rounded-xl h-10"
          />
          <select
            value={editCategory}
            onChange={(e) =>
              setEditCategory(e.target.value as Todo["category"])
            }
            className="w-full bg-card/50 border border-border text-foreground rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="health">💪 Health</option>
            <option value="work">💼 Work</option>
            <option value="personal">👤 Personal</option>
            <option value="learning">📚 Learning</option>
          </select>
          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              onClick={handleSaveEdit}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl h-9"
            >
              <Check className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button
              size="sm"
              onClick={handleCancelEdit}
              className="flex-1 bg-card hover:bg-card/80 text-foreground border border-border rounded-xl h-9"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const colors = CATEGORY_COLORS[todo.category];

  return (
    <div
      className={`bg-card backdrop-blur-xl rounded-2xl border border-border p-5 transition-all duration-200 hover:shadow-xl hover:shadow-primary/10 hover:border-border/80 ${
        todo.completed ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className="mt-1.5"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <h3
                className={`font-semibold text-base transition-all ${
                  todo.completed
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`text-sm mt-2 transition-all ${
                    todo.completed
                      ? "text-muted-foreground/50"
                      : "text-muted-foreground"
                  }`}
                >
                  {todo.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className={`${colors.bg} ${colors.border} ${colors.text} px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1`}
              >
                {CATEGORY_ICONS[todo.category]} {todo.category}
              </span>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(todo.id)}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
