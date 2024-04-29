// A flag representing the 53rd bit in a 64-bit bigint, often used for special operations or to detect specific conditions.
const highBitFlag = 0x20000000000000n // Value: 9007199254740992

export function GetVariableLong(x: number | bigint, signed = true): bigint | null {
	const value = BigInt(x)
	// Check if the value is within the range for 64-bit integers.
	// If it's out of this range, return null.
	if (value < -9223372036854776000n || value > 9223372036854776000n) return null
	return DoubleToLong(value, signed)
}
export function GetVariableInt(x: number | bigint): bigint | null {
	const value = BigInt(x)
	// Check if the value is within the valid range for a 32-bit signed integer.
	// If the value is smaller than -2147483648 or larger than 2147483647, return null.
	if (value < -2147483648n || value > 2147483647n) return null
	return value
}
export function DoubleToLong(x: bigint, signed: boolean): bigint {
	// Compute the modulus of 'x' by 0x20000000000000n to ensure the result stays within the 52-bit range.
	let num = x % highBitFlag
	// To address the issue of JavaScript -0, convert it to 0 if the result is 0.
	if (num === 0n) num = 0n
	// If the 'signed' parameter is false, perform operations to ensure the result is non-negative.
	if (!signed) {
		if (num < 0n) {
			// Flip all bits to negate the number.
			num = flipBits(num, 64n)
			// Flip badBit to retain signees in js
			num |= highBitFlag * 2n
			// Flip the bits again to retain the new value.
			num = flipBits(num, 64n)
			// Pad with additional bits to ensure proper representation.
			num |= 0xffe0000000000000n
		}
		// Retain only the lower 53 bits by applying a bitmask.
		num &= 0x3fffffffffffffn // 18014398509481983
	}
	return num
}
export function LongToDouble(x: bigint): number {
	// Check if the input has the 52nd bit set, indicating a potentially negative value in the long format.
	const isNegative = (x & highBitFlag) != 0n // 9007199254740992
	// Apply a mask to retain only the lower 53 bits, excluding the 52nd bit, which may represent a sign bit.
	x &= 0x1fffffffffffffn // 9007199254740991
	// If the sign bit was set, reintroduce a large negative offset to account for it.
	if (isNegative) {
		// Apply a negative offset to convert back to the expected value.
		x |= -9007199254740992n
	}
	// Convert the bigint to a number (floating-point double) and return it.
	return Number(x)
}

function flipBits(v: bigint, digits: bigint) {
	// Use the bitwise NOT (~) operator to flip all the bits in the given bigint 'v'.
	const flipped = ~v

	// Create a bitmask with the specified number of digits.
	// This is done by raising 2 to the power of 'digits', then subtracting 1 to get all bits set in the given range.
	const mask = 2n ** digits - 1n

	// Apply the bitmask using the bitwise AND (&) operator to keep only the bits within the specified range.
	return flipped & mask
}
