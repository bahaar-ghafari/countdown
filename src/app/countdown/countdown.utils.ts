import { padWithZeros } from '../app.utils'

export function getTimeRemaining(targetDate: Date | null): string {
  if (!targetDate) return ''
  const now = new Date().getTime()
  const distance = targetDate.getTime() - now

  if (distance < 0) {
    return 'The event has passed!'
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  return `${padWithZeros(days, 3)} days, ${padWithZeros(hours, 2)} h, ${padWithZeros(minutes, 2)} m, ${padWithZeros(seconds, 2)} s`
}
