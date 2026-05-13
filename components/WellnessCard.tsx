interface WellnessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  completed?: boolean;
}

export default function WellnessCard({
  title,
  description,
  icon,
  color,
  completed,
}: WellnessCardProps) {
  return (
    <div
      className={`rounded-xl p-4 border transition-all duration-300 backdrop-blur-sm ${
        completed
          ? "bg-green-500/15 border-green-500/40 opacity-85 shadow-lg shadow-green-500/20"
          : "bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 p-2 rounded-lg ${completed ? "bg-green-500/20" : "bg-primary/10"}`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3
            className={`font-semibold text-sm transition-all ${completed ? "text-muted-foreground line-through" : "text-foreground"}`}
          >
            {title}
          </h3>
          <p
            className={`text-xs mt-1.5 transition-all ${completed ? "text-muted-foreground/50" : "text-muted-foreground"}`}
          >
            {description}
          </p>
          {completed && (
            <span className="text-xs text-green-400 font-semibold mt-2 block animate-pulse">
              ✓ Completed today
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
