"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface DateInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, label, error, ...props }, ref) => {
    // Smart Script: Get current date in YYYY-MM-DD format for the 'max' attribute
    const today = new Date().toISOString().split("T")[0];

    return (
      <div className="flex flex-col space-y-2 w-full">
        {label && (
          <label className="text-sm font-medium text-slate-700 ml-1">
            {label}
          </label>
        )}
        <input
          type="date"
          ref={ref}
          max={today} // Prevents picking future dates in supported browsers
          className={cn(
            "flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm",
            "ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm",
            error ? "border-red-500 focus-visible:ring-red-500" : "hover:border-slate-300",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 ml-1 font-medium">{error}</span>
        )}
      </div>
    )
  }
)
DateInput.displayName = "DateInput"

export { DateInput }
