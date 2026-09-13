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

  it('uses the latest resume contact links', () => {
    render(<App />)

    expect(screen.getAllByRole('link', { name: 'EMAIL' })[0]).toHaveAttribute('href', 'mailto:taeyoungkdev@gmail.com')
    expect(screen.getAllByRole('link', { name: 'PHONE' })[0]).toHaveAttribute('href', 'tel:+821052303787')
    expect(screen.getAllByRole('link', { name: 'LINKEDIN' })[0]).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/taeyoung-kim-9b743140b/',
    )
    expect(screen.getAllByRole('link', { name: 'TECH BLOG' })[0]).toHaveAttribute('href', 'https://www.taeyoungkim.dev/ko')
  })
})
