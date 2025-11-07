export function getUploadState(dateTime: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const weddingDay = new Date(dateTime)
  weddingDay.setHours(0, 0, 0, 0)

  const dayAfterWedding = new Date(weddingDay)
  dayAfterWedding.setDate(weddingDay.getDate() + 1)

  if (today < weddingDay) return 'before'
  if (today.getTime() === weddingDay.getTime() || today.getTime() === dayAfterWedding.getTime()) {
    return 'allowed'
  }
  return 'after'
}

export type UploadState = 'before' | 'allowed' | 'after'
