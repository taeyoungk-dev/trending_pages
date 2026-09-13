import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Trending Pages portfolio', () => {
  it('presents all three source projects as one portfolio', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Signal Bank' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Stay Atlas' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Wildline' })).toBeInTheDocument()
  })

  it('opens and closes a keyboard-accessible interactive experience', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Signal Bank 인터랙션/ }))
    expect(screen.getByRole('dialog', { name: /Signal Bank/ })).toBeInTheDocument()
    expect(screen.getByLabelText(/^월 저축액/)).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('filters stays and persists favorite state in the interaction', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Stay Atlas 인터랙션/ }))
    const dialog = screen.getByRole('dialog', { name: /Stay Atlas/ })
    fireEvent.click(within(dialog).getByRole('button', { name: 'FOREST' }))
    expect(within(dialog).getByText('Goseong')).toBeInTheDocument()
    expect(within(dialog).queryByText('Jeju')).not.toBeInTheDocument()
  })
})
