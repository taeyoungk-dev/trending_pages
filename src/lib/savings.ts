/** Annual model rate used by the Signal Bank simulator (illustrative, not financial advice). */
export const MODEL_ANNUAL_RATE = 0.042
/** 12-month savings goal shown in the Signal Bank visual. */
export const SAVINGS_GOAL = 10_000_000

const toSafeAmount = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0)

/**
 * Future value of equal monthly deposits made at the end of each month,
 * compounded monthly at `annualRate` (ordinary annuity).
 */
export function projectSavings(monthly: number, months = 12, annualRate = MODEL_ANNUAL_RATE): number {
  const deposit = toSafeAmount(monthly)
  const periods = Number.isFinite(months) && months > 0 ? Math.floor(months) : 0
  if (deposit === 0 || periods === 0) return 0
  const rate = Number.isFinite(annualRate) && annualRate > 0 ? annualRate / 12 : 0
  if (rate === 0) return deposit * periods
  return deposit * ((Math.pow(1 + rate, periods) - 1) / rate)
}

/** Progress toward `goal` as a whole percentage clamped to 0–100. */
export function goalProgress(amount: number, goal = SAVINGS_GOAL): number {
  const safeGoal = toSafeAmount(goal)
  if (safeGoal === 0) return 0
  return Math.min(100, Math.round((toSafeAmount(amount) / safeGoal) * 100))
}

export const formatWon = (value: number) => `₩${Math.round(toSafeAmount(value)).toLocaleString('ko-KR')}`

/** Screen-reader friendly amount, e.g. "650,000원". */
export const formatWonText = (value: number) => `${Math.round(toSafeAmount(value)).toLocaleString('ko-KR')}원`

/** Compact Korean unit used in tight stat cells, e.g. 650000 → "65만". */
export const formatManWon = (value: number) => `${Math.round(toSafeAmount(value) / 10_000).toLocaleString('ko-KR')}만`
