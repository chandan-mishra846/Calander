import React, { useCallback } from 'react'
import { CalendarEvent } from '../../types/calendar.types'
import { isToday, isSameMonth } from '../../utils/date'
import { getEventsForDate } from '../../utils/event.utils'
import clsx from 'clsx'

interface CalendarCellProps {
  date: Date
  events: CalendarEvent[]
  currentMonth: Date
  isSelected: boolean
  onClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

export const CalendarCell: React.FC<CalendarCellProps> = React.memo(({
  date,
  events,
  currentMonth,
  isSelected,
  onClick,
  onEventClick,
}) => {
  const dayEvents = getEventsForDate(events, date)
  const isTodayDate = isToday(date)
  const isCurrentMonth = isSameMonth(date, currentMonth)
  const dayNumber = date.getDate()

  const handleClick = useCallback(() => {
    onClick(date)
  }, [date, onClick])

  const handleEventClick = useCallback((event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation()
    onEventClick(event)
  }, [onEventClick])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }, [handleClick])

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${date.toLocaleDateString()}, ${dayEvents.length} events`}
      aria-pressed={isSelected}
      className={clsx(
        'border border-neutral-200 min-h-32 p-2 transition-colors cursor-pointer',
        'hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        isSelected && 'ring-2 ring-primary-600',
        !isCurrentMonth && 'bg-neutral-50'
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex justify-between items-start mb-1">
        {isTodayDate ? (
          <span className="w-7 h-7 bg-primary-500 rounded-full text-white text-sm font-medium flex items-center justify-center">
            {dayNumber}
          </span>
        ) : (
          <span
            className={clsx(
              'text-sm font-medium',
              isCurrentMonth ? 'text-neutral-900' : 'text-neutral-400'
            )}
          >
            {dayNumber}
          </span>
        )}
      </div>
      
      <div className="space-y-1 overflow-hidden">
        {dayEvents.slice(0, 3).map((event: CalendarEvent) => (
          <div
            key={event.id}
            role="button"
            tabIndex={0}
            className="text-xs px-2 py-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity"
            style={{ backgroundColor: event.color || '#3b82f6', color: '#fff' }}
            onClick={(e) => handleEventClick(event, e)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                onEventClick(event)
              }
            }}
            aria-label={`Event: ${event.title}`}
          >
            {event.title}
          </div>
        ))}
        {dayEvents.length > 3 && (
          <button
            className="text-xs text-primary-600 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded px-1"
            onClick={(e) => {
              e.stopPropagation()
              onClick(date)
            }}
            aria-label={`${dayEvents.length - 3} more events`}
          >
            +{dayEvents.length - 3} more
          </button>
        )}
      </div>
    </div>
  )
})

CalendarCell.displayName = 'CalendarCell'
