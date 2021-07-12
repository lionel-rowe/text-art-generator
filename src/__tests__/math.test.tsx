import { polynomial } from '../utils/math'

it('degree 0', () => {
	expect(polynomial(0)(0.75)).toBeCloseTo(0.5)
})

it('degree 1', () => {
	expect(polynomial(1)(0.75)).toBeCloseTo(0.75)
})

it('degree 2', () => {
	expect(polynomial(2)(0.75)).toBeCloseTo(0.875)
})

it('degree 3', () => {
	expect(polynomial(3)(0.75)).toBeCloseTo(0.9375)
})
