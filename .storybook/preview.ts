import type { Preview } from '@storybook/react'
import '../src/styles.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    controls: { expanded: true },
    a11y: { disable: false },
  },
}

export default preview
