"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, useNavigation } from "react-day-picker"

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
      className={cn("p-3 bg-white border rounded-md shadow-sm", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        // Header container: mimics Google Calendar's top bar
        caption: "flex justify-between items-center px-2 pt-1 pb-2",
        caption_label: "flex items-center gap-1 text-sm font-semibold text-gray-900",
        caption_dropdowns: "flex gap-1 items-center",
        // Navigation buttons
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
        ),
        // Overriding absolute positioning to keep it within the flex flow
        nav_button_previous: "relative",
        nav_button_next: "relative",
        
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-medium text-[0.75rem] uppercase",
        row: "flex w-full mt-1",
        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal hover:bg-blue-50 hover:text-blue-600 rounded-full"
        ),
        day_selected:
          "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white rounded-full",
        day_today: "bg-blue-50 text-blue-700 font-bold",
        day_outside: "text-gray-400 opacity-50",
        day_disabled: "text-gray-300",
        day_hidden: "invisible",
        // Dropdown styles for Month/Year selector
        dropdown: "bg-transparent focus:outline-none cursor-pointer hover:bg-gray-100 p-1 rounded",
        dropdown_month: "font-semibold",
        dropdown_year: "font-semibold ml-1",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      // Enables the Year/Month pickers
      captionLayout="dropdown" 
      fromYear={1960}
      toYear={new Date().getFullYear() + 20}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
