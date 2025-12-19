import React from 'react'
import { CalendarEvent } from '../../types/calendar.types'
import { getCalendarGrid, formatDate } from '../../utils/date'
import { CalendarCell } from './CalendarCell'

interface MonthViewProps {
  currentDate: Date
  events: CalendarEvent[]
  selectedDate: Date | null
  onDateClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  selectedDate,
  onDateClick,
  onEventClick,
}) => {
  const calendarGrid = getCalendarGrid(currentDate)

  return (
    <div className="flex-1 flex flex-col">
      {/* Weekday headers */}
      <div role="row" className="grid grid-cols-7 border-b border-neutral-200">
        {WEEKDAYS.map(day => (
          <div
            key={day}
            role="columnheader"
            className="p-2 text-center text-sm font-semibold text-neutral-700 border-r last:border-r-0 border-neutral-200"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 flex-1 border-l border-neutral-200">
        {calendarGrid.map((date, index) => (
          <CalendarCell
            key={index}
            date={date}
            events={events}
            currentMonth={currentDate}
            isSelected={selectedDate ? date.toDateString() === selectedDate.toDateString() : false}
            onClick={onDateClick}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  )
}
