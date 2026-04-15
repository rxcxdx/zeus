import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(timezone)

const zone = dayjs.tz.guess()

export default function getZone() {
  return zone
}
