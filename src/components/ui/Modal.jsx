import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import Button from "./Button"

function Modal({ open, onClose, title, children, footer }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    closeRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  const titleId = "modal-title"

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-navy/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-lg rounded-xl border border-slate-200 bg-white p-5 shadow-lg"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-lg font-semibold text-navy">
            {title}
          </h2>
          <Button
            ref={closeRef}
            variant="outline"
            size="sm"
            onClick={onClose}
            aria-label="Close"
            className="h-8 w-8 px-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-slate-600">{children}</div>
        {footer ? (
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
