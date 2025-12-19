import { CalendarEvent } from '../types/calendar.types'
import { isSameDay, startOfDay } from './date'

/**
 * Gets events for a specific date
 */
export const getEventsForDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter(event => {
    const eventStart = startOfDay(event.startDate)
    const eventEnd = startOfDay(event.endDate)
    const targetDay = startOfDay(date)
    
    return targetDay >= eventStart && targetDay <= eventEnd
  })
}

/**
 * Checks if an event overlaps with a given time range
 */
export const isEventInTimeRange = (
  event: CalendarEvent,
  date: Date,
  startHour: number,
  endHour: number
): boolean => {
  if (!isSameDay(event.startDate, date)) return false
  
  const eventStartHour = event.startDate.getHours()
  const eventEndHour = event.endDate.getHours()
  
  return eventStartHour < endHour && eventEndHour > startHour
}

/**
 * Gets the position and height for an event in the week view
 */
export const getEventPosition = (event: CalendarEvent, date: Date) => {
  const startHour = event.startDate.getHours()
  const startMinute = event.startDate.getMinutes()
  const endHour = event.endDate.getHours()
  const endMinute = event.endDate.getMinutes()
  
  const top = (startHour * 60 + startMinute) / 60 // in hours
  const duration = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / 60
  
  return { top, height: duration }
}

/**
 * Default event colors
 */
export const EVENT_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // orange
  '#8b5cf6', // purple
  '#ef4444', // red
  '#06b6d4', // cyan
  '#ec4899', // pink
  '#6366f1', // indigo
]

/**
 * Validates event data
 */
export const validateEvent = (event: Partial<CalendarEvent>): string[] => {
  const errors: string[] = []
  
  if (!event.title || event.title.trim().length === 0) {
    errors.push('Title is required')
  }
  
  if (event.title && event.title.length > 100) {
    errors.push('Title must be 100 characters or less')
  }
  
  if (event.description && event.description.length > 500) {
    errors.push('Description must be 500 characters or less')
  }
  
  if (!event.startDate) {
    errors.push('Start date is required')
  }
  
  if (!event.endDate) {
    errors.push('End date is required')
  }
  
  if (event.startDate && event.endDate && event.endDate < event.startDate) {
    errors.push('End date must be after start date')
  }
  
  return errors
}
