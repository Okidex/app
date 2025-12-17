"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-white border rounded-xl shadow-sm", className)}
      classNames={{
        // ... (Previous styles for table, head_row, etc.)
        
        // 2025 Layout Styling for Dropdowns
        caption_dropdowns: "flex justify-center gap-2 font-medium",
        dropdown: "rdp-dropdown bg-transparent focus:outline-none cursor-pointer hover:bg-gray-100 p-1 rounded-md text-sm transition-colors",
        dropdown_month: "font-semibold",
        dropdown_year: "font-semibold",
        
        // Ensure nav buttons don't overlap dropdowns
        caption: "flex justify-center pt-1 relative items-center px-10 h-9",
        caption_label: "hidden", // Hide static label when dropdown is active
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      // CRITICAL: Enables both Month and Year selectors
      captionLayout="dropdown" 
      // Defines the range of years available in the picker
      fromYear={1900} 
      toYear={new Date().getFullYear() + 50}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
