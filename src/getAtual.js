import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(timezone)

export default function getAtual() {
  const joker = dayjs()
  return [joker.toISOString(), joker.format(), dayjs.tz.guess()]
}
