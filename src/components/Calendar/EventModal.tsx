import React, { useState, useEffect } from 'react'
import { CalendarEvent } from '../../types/calendar.types'
import { Modal } from '../primitives/Modal'
import { Button } from '../primitives/Button'
import { validateEvent, EVENT_COLORS } from '../../utils/event.utils'
import clsx from 'clsx'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (event: CalendarEvent) => void
  onDelete?: (id: string) => void
  event?: CalendarEvent | null
  initialDate?: Date
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  event,
  initialDate,
}) => {
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    startDate: initialDate || new Date(),
    endDate: initialDate ? new Date(initialDate.getTime() + 3600000) : new Date(),
    color: EVENT_COLORS[0],
    category: '',
  })
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (event) {
      setFormData(event)
    } else if (initialDate) {
      const endDate = new Date(initialDate)
      endDate.setHours(initialDate.getHours() + 1)
      setFormData({
        title: '',
        description: '',
        startDate: initialDate,
        endDate,
        color: EVENT_COLORS[0],
        category: '',
      })
    }
  }, [event, initialDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateEvent(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    const eventToSave: CalendarEvent = {
      id: event?.id || `evt-${Date.now()}`,
      title: formData.title!,
      description: formData.description,
      startDate: formData.startDate!,
      endDate: formData.endDate!,
      color: formData.color,
      category: formData.category,
    }

    onSave(eventToSave)
    onClose()
    setFormData({
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      color: EVENT_COLORS[0],
      category: '',
    })
    setErrors([])
  }

  const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const handleDateTimeChange = (field: 'startDate' | 'endDate', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: new Date(value),
    }))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event ? 'Edit Event' : 'Create Event'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
            Title <span className="text-error-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            maxLength={100}
            className={clsx(
              'w-full px-3 py-2 border rounded-lg transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              'border-neutral-300'
            )}
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Event title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            maxLength={500}
            rows={3}
            className={clsx(
              'w-full px-3 py-2 border rounded-lg transition-colors resize-none',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              'border-neutral-300'
            )}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Event description (optional)"
          />
          <div className="text-xs text-neutral-500 mt-1">
            {formData.description?.length || 0}/500
          </div>
        </div>

        {/* Start Date/Time */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-1">
            Start Date & Time <span className="text-error-500">*</span>
          </label>
          <input
            type="datetime-local"
            id="startDate"
            className={clsx(
              'w-full px-3 py-2 border rounded-lg transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              'border-neutral-300'
            )}
            value={formData.startDate ? formatDateTimeLocal(formData.startDate) : ''}
            onChange={(e) => handleDateTimeChange('startDate', e.target.value)}
            required
          />
        </div>

        {/* End Date/Time */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-1">
            End Date & Time <span className="text-error-500">*</span>
          </label>
          <input
            type="datetime-local"
            id="endDate"
            className={clsx(
              'w-full px-3 py-2 border rounded-lg transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              'border-neutral-300'
            )}
            value={formData.endDate ? formatDateTimeLocal(formData.endDate) : ''}
            onChange={(e) => handleDateTimeChange('endDate', e.target.value)}
            required
          />
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {EVENT_COLORS.map(color => (
              <button
                key={color}
                type="button"
                className={clsx(
                  'w-8 h-8 rounded-full transition-transform hover:scale-110',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                  formData.color === color && 'ring-2 ring-neutral-900 scale-110'
                )}
                style={{ backgroundColor: color }}
                onClick={() => setFormData(prev => ({ ...prev, color }))}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
            Category
          </label>
          <select
            id="category"
            className={clsx(
              'w-full px-3 py-2 border rounded-lg transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              'border-neutral-300'
            )}
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">None</option>
            <option value="Meeting">Meeting</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
          </select>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-3">
            <ul className="text-sm text-error-700 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <div>
            {event && onDelete && (
              <Button
                type="button"
                variant="danger"
                onClick={() => {
                  onDelete(event.id)
                  onClose()
                }}
              >
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {event ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
