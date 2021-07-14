import { polynomial, exponential } from '../utils/math'

describe('polynomial', () => {
	describe('< 0.5', () => {
		it('degree 0', () => {
			expect(polynomial(0)(0.25)).toBeCloseTo(0.5)
		})

		it('degree 1', () => {
			expect(polynomial(1)(0.25)).toBeCloseTo(0.25)
		})

		it('degree 2', () => {
			expect(polynomial(2)(0.25)).toBeCloseTo(0.125)
		})

		it('degree 3', () => {
			expect(polynomial(3)(0.25)).toBeCloseTo(0.0625)
		})
	})

	describe('> 0.5', () => {
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
	})
})

describe('exponential', () => {
	it('0', () => {
		expect(exponential(0)).toBeCloseTo(0.1)
	})

	it('100', () => {
		expect(exponential(100)).toBeCloseTo(10)
	})
})
