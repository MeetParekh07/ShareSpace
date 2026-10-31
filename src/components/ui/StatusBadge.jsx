import { cn } from "../../utils/cn"

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  borrowed: "bg-sky-50 text-sky-700 border-sky-200",
  completed: "bg-slate-100 text-slate-700 border-slate-200",
}

const statusLabels = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  borrowed: "Borrowed",
  completed: "Completed",
}

function StatusBadge({ status, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        statusStyles[status],
        className,
      )}
    >
      {statusLabels[status] || status}
    </span>
  )
}

export default StatusBadge
