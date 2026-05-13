"use client";

import SuggestionsPanel from "@/components/SuggestionsPanel";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  category: "health" | "work" | "personal" | "learning";
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "health" | "work" | "personal" | "learning"
  >("all");
  const [mounted, setMounted] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        }));
        setTodos(parsed);
      } catch (error) {
        console.error("Failed to load todos:", error);
      }
    }
    setMounted(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, mounted]);

  const addTodo = (
    title: string,
    description: string,
    category: Todo["category"],
  ) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      category,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const editTodo = (
    id: string,
    title: string,
    description: string,
    category: Todo["category"],
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, description, category } : todo,
      ),
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (selectedCategory !== "all" && todo.category !== selectedCategory)
      return false;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    health: todos.filter((t) => t.category === "health").length,
    work: todos.filter((t) => t.category === "work").length,
    personal: todos.filter((t) => t.category === "personal").length,
    learning: todos.filter((t) => t.category === "learning").length,
  };

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
        {/* Left Sidebar */}

        {/* Right Content Area */}
        <div className="md:col-span-6 space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground">Daily Entry</h2>
            <p className="text-sm text-muted-foreground">
              Organize your tasks and achieve your goals
            </p>
          </div>

          {/* Input */}
          <TodoInput onAddTodo={addTodo} />

          {/* Category Filter - Horizontal */}
          <div className="flex flex-wrap gap-2">
            {(["all", "health", "work", "personal", "learning"] as const).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full capitalize text-sm font-medium transition-all duration-200 border ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "bg-card text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {cat === "health" && "💪"} {cat === "work" && "💼"}{" "}
                  {cat === "personal" && "👤"} {cat === "learning" && "📚"}{" "}
                  {cat}
                </button>
              ),
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Todo List */}
            <div className="lg:col-span-2">
              <TodoList
                todos={filteredTodos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
                onEditTodo={editTodo}
              />
            </div>

            {/* Suggestions Panel */}
            <div className="lg:col-span-1">
              <SuggestionsPanel
                completedTodos={stats.completed}
                totalTodos={stats.total}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// function StatCard({
//   label,
//   value,
//   icon,
//   gradient,
// }: {
//   label: string;
//   value: number;
//   icon: string;
//   gradient: string;
// }) {
//   return (
//     <div
//       className={`bg-gradient-to-br ${gradient} rounded-2xl p-4 text-white shadow-lg shadow-${gradient.split("-")[1]}-500/20 border border-white/10 backdrop-blur-sm hover:shadow-xl hover:shadow-${gradient.split("-")[1]}-500/30 transition-all duration-300`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-xs font-medium text-white/70 mb-1">{label}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <span className="text-3xl">{icon}</span>
//       </div>
//     </div>
//   );
// }
