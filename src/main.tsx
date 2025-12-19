import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { CalendarView } from './components/Calendar'
import { CalendarEvent } from './types/calendar.types'

// Sample events for demo
const initialEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Team Standup',
    description: 'Daily sync with the team',
    startDate: new Date(2024, 11, 18, 9, 0),
    endDate: new Date(2024, 11, 18, 9, 30),
    color: '#3b82f6',
    category: 'Meeting',
  },
  {
    id: 'evt-2',
    title: 'Design Review',
    description: 'Review new component designs',
    startDate: new Date(2024, 11, 18, 14, 0),
    endDate: new Date(2024, 11, 18, 15, 30),
    color: '#10b981',
    category: 'Design',
  },
  {
    id: 'evt-3',
    title: 'Client Presentation',
    startDate: new Date(2024, 11, 19, 10, 0),
    endDate: new Date(2024, 11, 19, 11, 30),
    color: '#f59e0b',
    category: 'Meeting',
  },
]

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents(prev => [...prev, event])
  }

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev =>
      prev.map(event => (event.id === id ? { ...event, ...updates } : event))
    )
  }

  const handleEventDelete = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id))
  }

  return (
    <CalendarView
      events={events}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
      initialDate={new Date(2024, 11, 18)}
    />
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
