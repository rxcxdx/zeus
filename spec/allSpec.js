import isISOmonth from '../src/isISOmonth.js'

describe('Várias Specs', () => {

  it('isISOmonth Spec', () => {
    expect(isISOmonth('2026-03')).toBe(true)
    expect(isISOmonth('2026-03-01')).toBe(false)
  })

})
