import { cn } from "../../utils/cn"

function Card({ as: Component = "div", className, children, ...props }) {
  return (
    <Component
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-5 shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Card
