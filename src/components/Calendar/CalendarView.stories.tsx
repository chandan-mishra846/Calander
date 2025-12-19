import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CalendarView } from './CalendarView'
import { CalendarEvent } from '../../types/calendar.types'
import { sampleEvents, manyEvents } from '../../data/sampleEvents'

const meta: Meta<typeof CalendarView> = {
  title: 'Calendar/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CalendarView>

/**
 * Default calendar view with sample events showing current month
 */
export const Default: Story = {
  render: () => {
    const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)

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
  },
}

/**
 * Empty calendar with no events
 */
export const EmptyState: Story = {
  render: () => {
    const [events, setEvents] = useState<CalendarEvent[]>([])

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
      />
    )
  },
}

/**
 * Week view showing time slots and scheduled events
 */
export const WeekView: Story = {
  render: () => {
    const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)

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
        initialView="week"
        initialDate={new Date(2024, 11, 18)}
      />
    )
  },
}

/**
 * Calendar with many events (20+) demonstrating performance
 */
export const WithManyEvents: Story = {
  render: () => {
    const [events, setEvents] = useState<CalendarEvent[]>(manyEvents)

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
  },
}

/**
 * Interactive demo with full event management functionality
 */
export const InteractiveDemo: Story = {
  render: () => {
    const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)

    const handleEventAdd = (event: CalendarEvent) => {
      setEvents(prev => [...prev, event])
      console.log('Event added:', event)
    }

    const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
      setEvents(prev =>
        prev.map(event => (event.id === id ? { ...event, ...updates } : event))
      )
      console.log('Event updated:', id, updates)
    }

    const handleEventDelete = (id: string) => {
      setEvents(prev => prev.filter(event => event.id !== id))
      console.log('Event deleted:', id)
    }

    return (
      <div>
        <div className="bg-primary-50 border-b border-primary-200 p-4">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            Interactive Demo
          </h3>
          <p className="text-sm text-primary-700 mb-2">
            Try these interactions:
          </p>
          <ul className="text-sm text-primary-700 space-y-1 list-disc list-inside">
            <li>Click any day to create a new event</li>
            <li>Click an existing event to edit or delete it</li>
            <li>Use keyboard navigation (Tab, Enter, Arrows)</li>
            <li>Toggle between Month and Week views</li>
            <li>Navigate months using Previous/Next buttons</li>
          </ul>
        </div>
        <CalendarView
          events={events}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
          initialDate={new Date(2024, 11, 18)}
        />
      </div>
    )
  },
}

/**
 * Mobile responsive view demonstration
 */
export const MobileView: Story = {
  render: () => {
    const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)

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
      <div className="max-w-md mx-auto">
        <CalendarView
          events={events}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
          initialDate={new Date(2024, 11, 18)}
        />
      </div>
    )
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

/**
 * Accessibility demonstration with keyboard navigation
 */
export const AccessibilityDemo: Story = {
  render: () => {
    const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)

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
      <div>
        <div className="bg-success-50 border-b border-success-200 p-4">
          <h3 className="text-lg font-semibold text-success-900 mb-2">
            Accessibility Features
          </h3>
          <p className="text-sm text-success-700 mb-2">
            This calendar is fully accessible:
          </p>
          <ul className="text-sm text-success-700 space-y-1 list-disc list-inside">
            <li><strong>Keyboard Navigation:</strong> Tab through elements, Enter/Space to activate</li>
            <li><strong>ARIA Labels:</strong> Screen readers announce dates and events</li>
            <li><strong>Focus Management:</strong> Visible focus indicators on all interactive elements</li>
            <li><strong>Semantic HTML:</strong> Proper roles and attributes</li>
            <li><strong>Color Contrast:</strong> WCAG 2.1 AA compliant</li>
          </ul>
        </div>
        <CalendarView
          events={events}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
          initialDate={new Date(2024, 11, 18)}
        />
      </div>
    )
  },
}
