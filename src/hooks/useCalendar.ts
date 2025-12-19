import { useState, useCallback } from 'react'
import { CalendarView } from '../types/calendar.types'
import { addMonths } from '../utils/date'

interface CalendarState {
  currentDate: Date
  view: CalendarView
  selectedDate: Date | null
}

export const useCalendar = (initialDate: Date = new Date(), initialView: CalendarView = 'month') => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: initialView,
    selectedDate: null,
  })

  const goToNextMonth = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: addMonths(prev.currentDate, 1),
    }))
  }, [])

  const goToPreviousMonth = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: addMonths(prev.currentDate, -1),
    }))
  }, [])

  const goToToday = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(),
      selectedDate: new Date(),
    }))
  }, [])

  const setView = useCallback((view: CalendarView) => {
    setState(prev => ({ ...prev, view }))
  }, [])

  const setSelectedDate = useCallback((date: Date | null) => {
    setState(prev => ({ ...prev, selectedDate: date }))
  }, [])

  const setCurrentDate = useCallback((date: Date) => {
    setState(prev => ({ ...prev, currentDate: date }))
  }, [])

  return {
    ...state,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
    setView,
    setSelectedDate,
    setCurrentDate,
  }
}
