import { useState, useCallback } from 'react'
import { CalendarEvent } from '../types/calendar.types'

export const useEventManager = (initialEvents: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const addEvent = useCallback((event: CalendarEvent) => {
    setEvents(prev => [...prev, event])
  }, [])

  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev =>
      prev.map(event => (event.id === id ? { ...event, ...updates } : event))
    )
  }, [])

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id))
    setSelectedEvent(null)
  }, [])

  const selectEvent = useCallback((event: CalendarEvent | null) => {
    setSelectedEvent(event)
  }, [])

  return {
    events,
    selectedEvent,
    addEvent,
    updateEvent,
    deleteEvent,
    selectEvent,
  }
}
