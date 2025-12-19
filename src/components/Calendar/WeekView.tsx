import React from 'react'
import { CalendarEvent } from '../../types/calendar.types'
import { getWeekDays, formatDate, isSameDay, TIME_SLOTS, formatTimeSlot } from '../../utils/date'
import { getEventPosition } from '../../utils/event.utils'
import clsx from 'clsx'

interface WeekViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  onTimeSlotClick: (date: Date, hour: number) => void
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onEventClick,
  onTimeSlotClick,
}) => {
  const weekDays = getWeekDays(currentDate)

  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(event.startDate, date))
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Day headers */}
      <div className="grid grid-cols-8 border-b border-neutral-200 sticky top-0 bg-white z-10">
        <div className="w-16 border-r border-neutral-200"></div>
        {weekDays.map(day => (
          <div
            key={day.toISOString()}
            className="p-2 text-center border-r last:border-r-0 border-neutral-200"
          >
            <div className="text-xs text-neutral-600">
              {formatDate(day, 'EEE')}
            </div>
            <div
              className={clsx(
                'text-2xl font-semibold mt-1',
                isSameDay(day, new Date())
                  ? 'text-primary-600'
                  : 'text-neutral-900'
              )}
            >
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Time slots and events */}
      <div className="flex-1 relative">
        <div className="grid grid-cols-8">
          {/* Time labels */}
          <div className="border-r border-neutral-200">
            {TIME_SLOTS.map(hour => (
              <div
                key={hour}
                className="h-16 border-b border-neutral-200 px-2 py-1 text-xs text-neutral-600"
              >
                {formatTimeSlot(hour)}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map(day => {
            const dayEvents = getEventsForDay(day)
            
            return (
              <div key={day.toISOString()} className="relative border-r last:border-r-0 border-neutral-200">
                {/* Time slot grid */}
                {TIME_SLOTS.map(hour => (
                  <div
                    key={hour}
                    className="h-16 border-b border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors"
                    onClick={() => onTimeSlotClick(day, hour)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${formatDate(day, 'PPP')} at ${formatTimeSlot(hour)}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onTimeSlotClick(day, hour)
                      }
                    }}
                  />
                ))}

                {/* Events */}
                {dayEvents.map(event => {
                  const { top, height } = getEventPosition(event, day)
                  
                  return (
                    <div
                      key={event.id}
                      className="absolute left-1 right-1 rounded px-2 py-1 text-xs cursor-pointer hover:opacity-90 transition-opacity overflow-hidden"
                      style={{
                        top: `${top * 4}rem`,
                        height: `${height * 4}rem`,
                        minHeight: '2rem',
                        backgroundColor: event.color || '#3b82f6',
                        color: '#fff',
                        zIndex: 1,
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onEventClick(event)
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Event: ${event.title} at ${formatTimeSlot(event.startDate.getHours())}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          onEventClick(event)
                        }
                      }}
                    >
                      <div className="font-semibold truncate">{event.title}</div>
                      <div className="text-xs opacity-90 truncate">
                        {formatTimeSlot(event.startDate.getHours())} - {formatTimeSlot(event.endDate.getHours())}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
