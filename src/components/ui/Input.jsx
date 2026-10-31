import { forwardRef, useId } from "react"
import { cn } from "../../utils/cn"
import {
  controlClass,
  controlErrorClass,
  controlFocusClass,
} from "./controlStyles"
import FormField from "./FormField"

const Input = forwardRef(function Input(
  { id, label, hint, error, className, type = "text", ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id || generatedId

  return (
    <FormField id={inputId} label={label} hint={hint} error={error}>
      <input
        ref={ref}
        id={inputId}
        type={type}
        aria-invalid={Boolean(error)}
        className={cn(
          controlClass,
          controlFocusClass,
          error && controlErrorClass,
          className,
        )}
        {...props}
      />
    </FormField>
  )
})

export default Input
