const bitLimit = 0x7fffffffffffffffn // 63bits, discard all above
export const signBit = 0x8000000000000000n // 64'th bit, sign bit
const padBits = 0xffe0000000000000n //
const padBit = 0x20000000000000n //

export function GetVariableLong(x: number | bigint, signed = true): bigint | null {
	const value = BigInt(x)
	if (value < -9223372036854776000n || value > 9223372036854776000n) return null
	return DoubleToLong(value, signed)
}
export function GetVariableInt(x: number | bigint): bigint | null {
	const value = BigInt(x)
	if (value < -2147483648n || value > 2147483647n) return null
	return value
}
export function DoubleToLong(x: bigint, signed: boolean): bigint {
	// if (x > 0n)
	// x &= bitLimit
	let num = x % 0x20000000000000n // 9007199254740992
	// check for js -0, -0 === 0 so set to 0
	if (num === 0n) num = 0n
	if (!signed) {
		if (num < 0n) {
			num = flipBits(num, 64n)
			num |= padBit * 2n // 9007199254740992
			num = flipBits(num, 64n)
			num |= padBits
		}
		num &= 0x3fffffffffffffn // 18014398509481983
	}
	return num
}
export function LongToDouble(x: bigint): number {
	x &= bitLimit
	let num = (x & 0x20000000000000n) != 0n // 9007199254740992
	x &= 0x1fffffffffffffn // 9007199254740991
	if (num) x |= -9007199254740992n
	return Number(x)
}

function flipBits(v: bigint, digits: bigint) {
	return ~v & ((2n ** digits) - 1n)
}
