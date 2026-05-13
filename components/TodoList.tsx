import { Todo } from "@/app/daily-entry/page";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (
    id: string,
    title: string,
    description: string,
    category: Todo["category"],
  ) => void;
}

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-foreground text-lg font-semibold mb-1">
          No tasks yet
        </p>
        <p className="text-muted-foreground text-sm">
          Create a new task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
        />
      ))}
    </div>
  );
}
