import { forwardRef, useId } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../utils/cn"
import {
  controlClass,
  controlErrorClass,
  controlFocusClass,
} from "./controlStyles"
import FormField from "./FormField"

const Select = forwardRef(function Select(
  {
    id,
    label,
    hint,
    error,
    options = [],
    placeholder,
    className,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const selectId = id || generatedId

  return (
    <FormField id={selectId} label={label} hint={hint} error={error}>
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          aria-invalid={Boolean(error)}
          className={cn(
            controlClass,
            controlFocusClass,
            "appearance-none pr-10",
            error && controlErrorClass,
            className,
          )}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
      </div>
    </FormField>
  )
})

export default Select
