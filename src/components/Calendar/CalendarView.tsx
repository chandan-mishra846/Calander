import React, { useState, useCallback } from 'react'
import { CalendarEvent, CalendarViewProps } from '../../types/calendar.types'
import { MonthView } from './MonthView'
import { WeekView } from './WeekView'
import { EventModal } from './EventModal'
import { Button } from '../primitives/Button'
import { useCalendar } from '../../hooks/useCalendar'
import { formatDate } from '../../utils/date'
import clsx from 'clsx'

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = 'month',
  initialDate,
}) => {
  const {
    currentDate,
    view,
    selectedDate,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
    setView,
    setSelectedDate,
  } = useCalendar(initialDate, initialView)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [modalInitialDate, setModalInitialDate] = useState<Date | undefined>()

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date)
    setModalInitialDate(date)
    setSelectedEvent(null)
    setIsModalOpen(true)
  }, [setSelectedDate])

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event)
    setModalInitialDate(undefined)
    setIsModalOpen(true)
  }, [])

  const handleTimeSlotClick = useCallback((date: Date, hour: number) => {
    const slotDate = new Date(date)
    slotDate.setHours(hour, 0, 0, 0)
    setSelectedDate(slotDate)
    setModalInitialDate(slotDate)
    setSelectedEvent(null)
    setIsModalOpen(true)
  }, [setSelectedDate])

  const handleSaveEvent = useCallback((event: CalendarEvent) => {
    if (selectedEvent) {
      onEventUpdate(event.id, event)
    } else {
      onEventAdd(event)
    }
    setIsModalOpen(false)
    setSelectedEvent(null)
  }, [selectedEvent, onEventAdd, onEventUpdate])

  const handleDeleteEvent = useCallback((id: string) => {
    onEventDelete(id)
    setIsModalOpen(false)
    setSelectedEvent(null)
  }, [onEventDelete])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedEvent(null)
    setModalInitialDate(undefined)
  }, [])

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200 p-4">
        <div className="flex items-center justify-between">
          {/* Title and Navigation */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-neutral-900">Calendar</h1>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={goToPreviousMonth} aria-label="Previous month">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              
              <Button variant="ghost" size="sm" onClick={goToNextMonth} aria-label="Next month">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              
              <Button variant="secondary" size="sm" onClick={goToToday}>
                Today
              </Button>
            </div>

            <div className="text-xl font-semibold text-neutral-900">
              {formatDate(currentDate, 'MMMM yyyy')}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
              <button
                className={clsx(
                  'px-4 py-2 text-sm font-medium transition-colors',
                  view === 'month'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-50'
                )}
                onClick={() => setView('month')}
                aria-label="Month view"
                aria-pressed={view === 'month'}
              >
                Month
              </button>
              <button
                className={clsx(
                  'px-4 py-2 text-sm font-medium transition-colors border-l border-neutral-300',
                  view === 'week'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-50'
                )}
                onClick={() => setView('week')}
                aria-label="Week view"
                aria-pressed={view === 'week'}
              >
                Week
              </button>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setModalInitialDate(new Date())
                setSelectedEvent(null)
                setIsModalOpen(true)
              }}
            >
              + Add Event
            </Button>
          </div>
        </div>
      </header>

      {/* Calendar Content */}
      <main className="flex-1 overflow-hidden">
        {view === 'month' ? (
          <MonthView
            currentDate={currentDate}
            events={events}
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        ) : (
          <WeekView
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
            onTimeSlotClick={handleTimeSlotClick}
          />
        )}
      </main>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        event={selectedEvent}
        initialDate={modalInitialDate}
      />
    </div>
  )
}
