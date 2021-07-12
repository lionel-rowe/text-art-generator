export const polynomial = (degree: number) => (x: number) =>
	x < 0.5
		? Math.pow(2, degree - 1) * Math.pow(x, degree)
		: 1 - Math.pow(-2 * x + 2, degree) / 2

// converts numbers in range 0..100 into numbers in range 0.1..10
// to be suitable for usage as brightness/contrast values
export const exponential = (n: number) => 10 ** (n / 50 - 1)
