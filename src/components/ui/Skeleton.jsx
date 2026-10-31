import { cn } from "../../utils/cn"

const variants = {
  line: "h-4 w-full rounded-md",
  title: "h-7 w-1/3 rounded-md",
  avatar: "h-10 w-10 rounded-full",
  card: "h-32 w-full rounded-xl",
}

function Skeleton({ variant = "line", className }) {
  return (
    <div
      className={cn("animate-pulse bg-slate-200", variants[variant], className)}
      aria-hidden="true"
    />
  )
}

export default Skeleton
