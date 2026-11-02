import { describe, expect, it } from 'vitest'
import { SAVINGS_GOAL, formatManWon, formatWon, formatWonText, goalProgress, projectSavings } from './savings'

describe('projectSavings', () => {
  it('compounds monthly deposits as an ordinary annuity', () => {
    const rate = 0.042 / 12
    const expected = 650_000 * ((Math.pow(1 + rate, 12) - 1) / rate)
    expect(projectSavings(650_000)).toBeCloseTo(expected, 6)
    expect(Math.round(projectSavings(650_000))).toBe(7_951_916)
  })

  it('never exceeds simple deposit total grown by a full year of interest', () => {
    expect(projectSavings(650_000)).toBeLessThan(650_000 * 12 * 1.042)
    expect(projectSavings(650_000)).toBeGreaterThan(650_000 * 12)
  })

  it('falls back to plain deposits when the rate is zero', () => {
    expect(projectSavings(100_000, 12, 0)).toBe(1_200_000)
  })

  it('treats invalid input as zero instead of producing NaN', () => {
    expect(projectSavings(Number.NaN)).toBe(0)
    expect(projectSavings(-50_000)).toBe(0)
    expect(projectSavings(100_000, 0)).toBe(0)
    expect(projectSavings(100_000, Number.POSITIVE_INFINITY)).toBe(0)
  })
})

describe('goalProgress', () => {
  it('returns a whole percentage of the goal', () => {
    expect(goalProgress(SAVINGS_GOAL / 2)).toBe(50)
    expect(goalProgress(7_951_715)).toBe(80)
  })

  it('clamps to the 0–100 range and guards an invalid goal', () => {
    expect(goalProgress(SAVINGS_GOAL * 3)).toBe(100)
    expect(goalProgress(-1)).toBe(0)
    expect(goalProgress(1_000, 0)).toBe(0)
  })
})

describe('won formatting', () => {
  it('formats amounts for display and for assistive technology', () => {
    expect(formatWon(7_951_715.4)).toBe('₩7,951,715')
    expect(formatWonText(650_000)).toBe('650,000원')
    expect(formatManWon(650_000)).toBe('65만')
    expect(formatWon(Number.NaN)).toBe('₩0')
  })
})
