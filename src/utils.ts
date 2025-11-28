export const parseTime = (timeStr: string): number => {
  const [start] = timeStr.split(' - ')
  const [h, m] = start.split(':').map(Number)
  return h * 60 + m
}

export const parseEndTime = (timeStr: string): number => {
  const [, end] = timeStr.split(' - ')
  const [h, m] = end.split(':').map(Number)
  return h * 60 + m
}

export const formatCountdown = (minutes: number): string | null => {
  if (minutes < 0) return null
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}