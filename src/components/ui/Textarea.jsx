import { forwardRef, useId } from "react"
import { cn } from "../../utils/cn"
import {
  controlClass,
  controlErrorClass,
  controlFocusClass,
} from "./controlStyles"
import FormField from "./FormField"

const Textarea = forwardRef(function Textarea(
  { id, label, hint, error, className, rows = 4, ...props },
  ref,
) {
  const generatedId = useId()
  const textareaId = id || generatedId

  return (
    <FormField id={textareaId} label={label} hint={hint} error={error}>
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={cn(
          controlClass,
          controlFocusClass,
          "min-h-24 resize-y",
          error && controlErrorClass,
          className,
        )}
        {...props}
      />
    </FormField>
  )
})

export default Textarea
