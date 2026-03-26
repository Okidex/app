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
    /**
     * Smart Script: Local Time Synchronization
     * Using 'sv-SE' locale is a standard 2025 trick to get YYYY-MM-DD format 
     * based on the user's computer clock without UTC offset issues.
     */
    const today = new Date().toLocaleDateString('sv-SE');

    /**
     * Validation Script: Manual Entry Block
     * Prevents users from manually typing a year that makes the date occur in the future.
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedDate = e.target.value;
      if (selectedDate > today) {
        e.target.value = today; // Force reset to today if they bypass the max attribute
      }
      props.onChange?.(e);
    };

    return (
      <div className="flex flex-col space-y-2 w-full">
        {label && (
          <label 
            htmlFor={props.id} 
            className="text-sm font-medium text-slate-700 ml-1"
          >
            {label}
          </label>
        )}
        <input
          type="date"
          ref={ref}
          max={today}
          onChange={handleInputChange}
          className={cn(
            "flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm",
            "ring-offset-white transition-all shadow-sm antialiased",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Dark mode support (standard for late 2025 UI)
            "dark:bg-slate-950 dark:border-slate-800 dark:text-slate-50",
            error ? "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500" : "hover:border-slate-300",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 ml-1 font-medium animate-in fade-in slide-in-from-top-1">
            {error}
          </span>
        )}
      </div>
    )
  }
)
DateInput.displayName = "DateInput"

export { DateInput }
