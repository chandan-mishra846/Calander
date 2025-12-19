import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays as addDaysFns,
  addMonths as addMonthsFns,
  isSameDay as isSameDayFns,
  isSameMonth as isSameMonthFns,
  isToday as isTodayFns,
  eachDayOfInterval,
  startOfDay as startOfDayFns,
} from 'date-fns'

export const startOfDay = startOfDayFns
export const isSameDay = isSameDayFns
export const isSameMonth = isSameMonthFns
export const isToday = isTodayFns
export const addDays = addDaysFns
export const addMonths = addMonthsFns

/**
 * Formats a date to a readable string
 */
export const formatDate = (date: Date, formatStr: string = 'PPP'): string => {
  return format(date, formatStr)
}

/**
 * Gets the calendar grid (42 cells for month view)
 */
export const getCalendarGrid = (date: Date): Date[] => {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 })
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 })
  
  const days = eachDayOfInterval({ start, end })
  
  // Ensure we always have 42 cells (6 weeks)
  while (days.length < 42) {
    days.push(addDaysFns(days[days.length - 1], 1))
  }
  
  return days.slice(0, 42)
}

/**
 * Gets days in a week starting from a given date
 */
export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 0 })
  return eachDayOfInterval({
    start,
    end: addDaysFns(start, 6),
  })
}

/**
 * Calculates the number of days between two dates
 */
export const daysBetween = (start: Date, end: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.floor((end.getTime() - start.getTime()) / msPerDay)
}

/**
 * Gets all days in a month
 */
export const getDaysInMonth = (date: Date): Date[] => {
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  })
}

/**
 * Time slot helpers for week view
 */
export const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => i)

export const formatTimeSlot = (hour: number): string => {
  return format(new Date(2000, 0, 1, hour, 0), 'HH:mm')
}
