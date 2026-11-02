import { useEffect, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.(REDUCED_MOTION_QUERY).matches === true
}

/** Tracks the user's reduced-motion preference and reacts to changes. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(prefersReducedMotion)

  useEffect(() => {
    const query = window.matchMedia?.(REDUCED_MOTION_QUERY)
    if (!query) return
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  return reduced
}

/**
 * Scrolls to a section and moves keyboard focus there so screen-reader and
 * keyboard users continue from the destination. Honors reduced motion.
 */
export function scrollToSection(selector: string): void {
  const target = document.querySelector<HTMLElement>(selector)
  if (!target) return
  target.scrollIntoView?.({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  target.focus({ preventScroll: true })
}

/** Maximum raw parallax offset (px) from the stage centre. */
export const PARALLAX_LIMIT = 120
/** Keyboard nudge per arrow key press (px of raw offset). */
export const PARALLAX_KEY_STEP = 30

export type Offset = { x: number; y: number }

export const clamp = (value: number, limit: number) => (Number.isFinite(value) ? Math.max(-limit, Math.min(limit, value)) : 0)

/** Converts a pointer position into a bounded offset from the centre of `rect`. */
export function pointerToOffset(clientX: number, clientY: number, rect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>, limit = PARALLAX_LIMIT): Offset {
  if (rect.width <= 0 || rect.height <= 0) return { x: 0, y: 0 }
  const x = ((clientX - rect.left - rect.width / 2) / (rect.width / 2)) * limit
  const y = ((clientY - rect.top - rect.height / 2) / (rect.height / 2)) * limit
  return { x: clamp(x, limit), y: clamp(y, limit) }
}

/** Applies an arrow-key nudge; returns null for keys that are not handled. */
export function nudgeOffset(offset: Offset, key: string, step = PARALLAX_KEY_STEP, limit = PARALLAX_LIMIT): Offset | null {
  switch (key) {
    case 'ArrowLeft': return { x: clamp(offset.x - step, limit), y: offset.y }
    case 'ArrowRight': return { x: clamp(offset.x + step, limit), y: offset.y }
    case 'ArrowUp': return { x: offset.x, y: clamp(offset.y - step, limit) }
    case 'ArrowDown': return { x: offset.x, y: clamp(offset.y + step, limit) }
    case 'Home': return { x: 0, y: 0 }
    default: return null
  }
}
