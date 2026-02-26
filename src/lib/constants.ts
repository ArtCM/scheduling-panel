export const BUSINESS_HOURS = {
  START: 8,
  END: 18,
} as const

export const TIME_SLOTS = Array.from(
  { length: BUSINESS_HOURS.END - BUSINESS_HOURS.START },
  (_, i) => {
    const hour = BUSINESS_HOURS.START + i
    return `${hour.toString().padStart(2, '0')}:00`
  }
)

export const DURATION_OPTIONS = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
  { label: '1 hora', value: 60 },
  { label: '1h 30min', value: 90 },
  { label: '2 horas', value: 120 },
]

