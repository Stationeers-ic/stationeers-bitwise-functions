const bitLimit = 0xffffffffffffffffn // 64bits, discard all above
const signBit = 0x8000000000000000n // 64'th bit, sign bit

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
	x &= bitLimit
	let num = x % 9007199254740992n
	if (!signed) num &= 0x3fffffffffffffn // 18014398509481983
	return num
}
export function LongToDouble(x: bigint): number {
	x &= bitLimit
	let num = (x & 0x20000000000000n) != 0n // 9007199254740992
	x &= 0x1fffffffffffffn // 9007199254740991
	if (num) x |= -9007199254740992n
	return Number(x)
}

export function SignVariable(x: number | bigint): bigint {
	let value = BigInt(x) & bitLimit
	if (value >= 0n) return value
	// value = -value
	value = ~value
	value ^= bitLimit
	return value
}

export function UnSignVariable(x: number | bigint): bigint {
	let value = BigInt(x) & bitLimit
	if ((value & signBit) !== signBit) return value
	// value = -value
	value ^= bitLimit
	value = ~value
	return value
}
