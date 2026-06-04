import { Star } from "lucide-react";

const Stars = ({ value }) => {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => {
          const filled = i < full || (i === full && hasHalf);

          return (
            <Star
              key={i}
              className={`h-3 w-3 ${
                filled ? "fill-foreground text-foreground" : "text-muted-foreground/40"
              }`}
            />
          );
        })}
      </div>
      <span className="ml-1 text-xs font-light text-muted-foreground">{value.toFixed(1)}</span>
    </div>
  );
};

export default Stars;
