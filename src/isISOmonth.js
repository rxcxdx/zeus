const regex = RegExp('^\\d{4}-\\d{2}$')

export default function isISOmonth(v) {
  return regex.test(v)
}
