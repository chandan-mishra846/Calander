# Calendar View Component

A fully functional, accessible Calendar View component built from scratch with React, TypeScript, and Tailwind CSS. This component demonstrates production-quality code, enterprise-grade UI/UX patterns, and accessibility-first approach.

## 🔗 Live Links

- Live Demo: [Open App](https://calander-xi.vercel.app/)
- Storybook: [Open Storybook](https://calendar-storybook-mu.vercel.app/)

## 📦 Installation

```bash
npm install
```

## 🚀 Quick Start

### Run Storybook (Recommended)

```bash
npm run storybook
```

Open http://localhost:6006 to explore all component stories and interactions.

### Run Development Server

```bash
npm run dev
```

## ❗ Requirements

- Node.js 18+ (recommended for Vite 5)
- npm 9+

## 🏗️ Architecture

This project follows a scalable component architecture:

- **Component-Based**: Calendar split into MonthView, WeekView, CalendarCell, and EventModal
- **Custom Hooks**: `useCalendar` and `useEventManager` for state management
- **Utility Functions**: Date and event manipulation helpers
- **Primitive Components**: Reusable Button, Modal, and Select components
- **Type Safety**: Full TypeScript coverage with strict mode enabled

### Folder Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarView.tsx         # Main component
│   │   ├── MonthView.tsx            # Month grid view
│   │   ├── WeekView.tsx             # Week time slots view
│   │   ├── CalendarCell.tsx         # Individual day cell
│   │   └── EventModal.tsx           # Add/Edit event modal
│   └── primitives/
│       ├── Button.tsx               # Reusable button
│       ├── Modal.tsx                # Reusable modal
│       └── Select.tsx               # Reusable select
├── hooks/
│   ├── useCalendar.ts               # Calendar state management
│   └── useEventManager.ts           # Event CRUD operations
├── utils/
│   ├── date.ts                      # Date manipulation
│   └── event.utils.ts               # Event helpers
├── types/
│   └── calendar.types.ts            # TypeScript definitions
└── data/
    └── sampleEvents.ts              # Sample data
```

## ✨ Features

### Core Features
- ✅ **Month View**: 42-cell grid showing complete weeks with events
- ✅ **Week View**: Time-slot based view (00:00 - 23:00) with event positioning
- ✅ **Event Management**: Create, edit, and delete events with validation
- ✅ **Navigation**: Previous/Next month, Today button, Month/Year display
- ✅ **View Toggle**: Switch between Month and Week views
- ✅ **Interactive**: Click days to create events, click events to edit
- ✅ **Event Details**: Title, description, date/time, color, category

### Advanced Features
- ✅ **Keyboard Navigation**: Full keyboard accessibility
- ✅ **ARIA Implementation**: Screen reader compatible
- ✅ **Focus Management**: Proper focus indicators and trap in modals
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Performance Optimized**: React.memo, useCallback, useMemo
- ✅ **Form Validation**: Client-side validation with error messages
- ✅ **Today Indicator**: Visual highlight for current date
- ✅ **Event Count Badge**: Shows "+X more" when >3 events per day

## 📖 Storybook Stories

1. **Default** - Current month with sample events
2. **Empty State** - Calendar with no events
3. **Week View** - Week view with time slots demonstration
4. **With Many Events** - Calendar with 20+ events (performance test)
5. **Interactive Demo** - Fully functional playground
6. **Mobile View** - Responsive mobile layout
7. **Accessibility Demo** - Keyboard navigation demonstration

## 🎨 Design System

Built with Tailwind CSS following modern SaaS design principles:

- **Clean & Minimal**: Focus on content, remove visual noise
- **Consistent Spacing**: 4px base unit via Tailwind spacing scale
- **Clear Hierarchy**: Typography and color establish importance
- **Purposeful Color**: Color communicates state and action
- **Smooth Interactions**: Subtle hover and focus states

### Color Palette
- **Primary**: Blue shades for actions and selected states
- **Neutral**: Grays for text and borders
- **Success**: Green for positive actions
- **Warning**: Orange for warnings
- **Error**: Red for errors and destructive actions

## ♿ Accessibility

WCAG 2.1 AA compliant with:

- **Keyboard Navigation**: Tab, Enter, Space, Escape, Arrow keys
- **ARIA Attributes**: Proper roles, labels, and live regions
- **Focus Management**: Visible focus indicators on all interactive elements
- **Semantic HTML**: Correct element types and structure
- **Color Contrast**: Minimum 4.5:1 ratio for all text
- **Screen Reader**: Announces dates, events, and actions

### Keyboard Shortcuts
- `Tab` / `Shift+Tab`: Navigate between elements
- `Enter` / `Space`: Activate focused element
- `Escape`: Close modals
- Arrow keys: Navigate calendar cells

## 🛠️ Technologies

### Required Stack
- **React** ^18.3.1 - Component framework
- **TypeScript** ^5.6.3 - Type-safe development
- **Tailwind CSS** ^3.4.13 - Utility-first styling
- **Vite** ^5.0.8 - Build tooling
- **Storybook** ^8.1.0 - Component documentation

### Allowed Utilities
- **date-fns** ^3.0.0 - Date manipulation only
- **clsx** ^2.1.0 - Conditional class management

### Explicitly NOT Used
- ❌ No component libraries (Radix, Shadcn, MUI, etc.)
- ❌ No CSS-in-JS (styled-components, emotion)
- ❌ No AI-generated UI tools
- ❌ No pre-built calendar libraries

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server
npm run storybook        # Start Storybook

# Production
npm run build            # Build for production
npm run build-storybook  # Build Storybook static site
npm run preview          # Preview production build
```

## 🧪 Code Quality

- **TypeScript Strict Mode**: Enabled with no `any` types
- **Component Architecture**: Single responsibility, composable components
- **Performance**: Memoization with React.memo, useCallback, useMemo
- **Clean Code**: Self-documenting with strategic comments
- **Type Safety**: Comprehensive interfaces and type definitions

## 📝 Event Interface

```typescript
interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  color?: string
  category?: string
}
```

## 🎯 Usage Example

```tsx
import { CalendarView } from './components/Calendar'
import { useState } from 'react'

function App() {
  const [events, setEvents] = useState([])

  return (
    <CalendarView
      events={events}
      onEventAdd={(event) => setEvents([...events, event])}
      onEventUpdate={(id, updates) => {
        setEvents(events.map(e => e.id === id ? {...e, ...updates} : e))
      }}
      onEventDelete={(id) => {
        setEvents(events.filter(e => e.id !== id))
      }}
    />
  )
}
```

## 📞 Contact

[Chandan Mishra]  
[chandan.mishra23456@gmail.com]  


---

Built with ❤️ for Uzence Design System Component Library
