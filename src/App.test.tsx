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

  it('returns focus to the opener and unlocks scrolling when the dialog closes', () => {
    render(<App />)

    const trigger = screen.getByRole('button', { name: /Signal Bank 인터랙션/ })
    trigger.focus()
    fireEvent.click(trigger)
    const dialog = screen.getByRole('dialog', { name: /Signal Bank/ })
    expect(within(dialog).getByRole('button', { name: /CLOSE/ })).toHaveFocus()
    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(document.body.style.overflow).toBe('')
  })

  it('closes the dialog when the backdrop is pressed but not when its content is', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Wildline 인터랙션/ }))
    const dialog = screen.getByRole('dialog', { name: /Wildline/ })
    fireEvent.mouseDown(within(dialog).getByText(/레이어마다/))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.mouseDown(dialog)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('recalculates the savings projection and its visual from the slider', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Signal Bank 인터랙션/ }))
    const dialog = screen.getByRole('dialog', { name: /Signal Bank/ })
    const slider = within(dialog).getByLabelText(/^월 저축액/)
    expect(slider).toHaveAttribute('aria-valuetext', '650,000원')
    expect(within(dialog).getAllByText('₩7,951,916')).toHaveLength(2)

    fireEvent.change(slider, { target: { value: '1000000' } })
    expect(slider).toHaveAttribute('aria-valuetext', '1,000,000원')
    expect(within(dialog).getAllByText('₩12,233,716')).toHaveLength(2)
    expect(within(dialog).getByText('100%')).toBeInTheDocument()
  })

  it('filters stays and toggles favorite state in the interaction', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Stay Atlas 인터랙션/ }))
    const dialog = screen.getByRole('dialog', { name: /Stay Atlas/ })
    const forest = within(dialog).getByRole('button', { name: 'FOREST' })
    fireEvent.click(forest)
    expect(forest).toHaveAttribute('aria-pressed', 'true')
    expect(within(dialog).getByRole('button', { name: 'ALL' })).toHaveAttribute('aria-pressed', 'false')
    expect(within(dialog).getByText('1 STAYS')).toBeInTheDocument()
    expect(within(dialog).getByText('Goseong')).toBeInTheDocument()
    expect(within(dialog).queryByText('Jeju')).not.toBeInTheDocument()

    fireEvent.click(within(dialog).getByRole('button', { name: 'Goseong 즐겨찾기' }))
    expect(within(dialog).getByRole('button', { name: 'Goseong 즐겨찾기 해제' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(within(dialog).getByRole('button', { name: 'Goseong 즐겨찾기 해제' }))
    expect(within(dialog).getByRole('button', { name: 'Goseong 즐겨찾기' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('moves Wildline layers with the keyboard within a bounded range', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Wildline 인터랙션/ }))
    const stage = screen.getByRole('group', { name: /Wildline 패럴랙스/ })
    const nearestLayerX = () => {
      const match = stage.querySelector<HTMLElement>('.layer-3')?.style.transform.match(/translateX\((-?[\d.]+)px\)/)
      return match ? Number(match[1]) : Number.NaN
    }

    expect(nearestLayerX()).toBeCloseTo(0)
    fireEvent.keyDown(stage, { key: 'ArrowRight' })
    expect(nearestLayerX()).toBeCloseTo(5.4)
    for (let press = 0; press < 20; press += 1) fireEvent.keyDown(stage, { key: 'ArrowRight' })
    expect(nearestLayerX()).toBeCloseTo(21.6)
    fireEvent.keyDown(stage, { key: 'Home' })
    expect(nearestLayerX()).toBeCloseTo(0)
  })

  it('exposes the mobile menu state and closes it with Escape', () => {
    render(<App />)

    // The menu button is only visible below 720px; query it regardless of the jsdom viewport.
    const menuButton = screen.getByRole('button', { name: '메뉴', hidden: true })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    expect(menuButton).toHaveAttribute('aria-controls', 'primary-navigation')

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton).toHaveFocus()
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
