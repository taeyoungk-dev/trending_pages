import { describe, expect, it } from 'vitest'
import { PARALLAX_KEY_STEP, PARALLAX_LIMIT, clamp, nudgeOffset, pointerToOffset } from './motion'

const rect = { left: 100, top: 50, width: 400, height: 200 }

describe('pointerToOffset', () => {
  it('maps the stage centre to a neutral offset', () => {
    expect(pointerToOffset(300, 150, rect)).toEqual({ x: 0, y: 0 })
  })

  it('reaches the limit at the stage edges', () => {
    expect(pointerToOffset(500, 250, rect)).toEqual({ x: PARALLAX_LIMIT, y: PARALLAX_LIMIT })
    expect(pointerToOffset(100, 50, rect)).toEqual({ x: -PARALLAX_LIMIT, y: -PARALLAX_LIMIT })
  })

  it('stays bounded when the pointer is outside the stage', () => {
    const offset = pointerToOffset(5_000, -5_000, rect)
    expect(offset).toEqual({ x: PARALLAX_LIMIT, y: -PARALLAX_LIMIT })
  })

  it('returns neutral for an empty rect instead of dividing by zero', () => {
    expect(pointerToOffset(10, 10, { left: 0, top: 0, width: 0, height: 0 })).toEqual({ x: 0, y: 0 })
  })
})

describe('nudgeOffset', () => {
  it('moves by one step per arrow key', () => {
    expect(nudgeOffset({ x: 0, y: 0 }, 'ArrowLeft')).toEqual({ x: -PARALLAX_KEY_STEP, y: 0 })
    expect(nudgeOffset({ x: 0, y: 0 }, 'ArrowDown')).toEqual({ x: 0, y: PARALLAX_KEY_STEP })
  })

  it('clamps at the limit and resets with Home', () => {
    expect(nudgeOffset({ x: PARALLAX_LIMIT, y: 0 }, 'ArrowRight')).toEqual({ x: PARALLAX_LIMIT, y: 0 })
    expect(nudgeOffset({ x: 40, y: -30 }, 'Home')).toEqual({ x: 0, y: 0 })
  })

  it('ignores keys it does not handle', () => {
    expect(nudgeOffset({ x: 0, y: 0 }, 'Enter')).toBeNull()
  })
})

describe('clamp', () => {
  it('bounds finite values and neutralises NaN', () => {
    expect(clamp(500, 120)).toBe(120)
    expect(clamp(-500, 120)).toBe(-120)
    expect(clamp(Number.NaN, 120)).toBe(0)
  })
})
