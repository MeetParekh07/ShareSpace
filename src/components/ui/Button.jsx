
import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700",
  secondary:
    "bg-brand-50 text-brand-700 hover:bg-brand-100",
  outline:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  danger:
    "bg-red-600 text-white hover:bg-red-700",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 shadow-none",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    className,
    type = "button",
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium shadow-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
