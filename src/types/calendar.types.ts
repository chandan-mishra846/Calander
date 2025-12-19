export interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  color?: string
  category?: string
}

export type CalendarView = 'month' | 'week'

export interface CalendarViewProps {
  events: CalendarEvent[]
  onEventAdd: (event: CalendarEvent) => void
  onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void
  onEventDelete: (id: string) => void
  initialView?: CalendarView
  initialDate?: Date
}
