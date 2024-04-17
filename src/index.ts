function GetVariableLong(x: number | bigint, signed = true): bigint | null {
	const value = BigInt(x)
	if (value < -9223372036854776000n || value > 9223372036854776000n) return null
	return DoubleToLong(value, signed)
}
function GetVariableInt(x: number | bigint): bigint | null {
	const value = BigInt(x)
	if (value < -2147483648n || value > 2147483647n) return null
	return value
}
function DoubleToLong(x: bigint, signed: boolean): bigint {
	let num = x % 9007199254740992n
	if (!signed) num &= 0x3fffffffffffffn // 18014398509481983
	return num
}
function LongToDouble(x: bigint): number {
	// while (x < )
	let num = (x & 0x20000000000000n) != 0n // 9007199254740992
	x &= 0x1fffffffffffffn // 9007199254740991
	if (num) x |= -9007199254740992n
	return Number(x)
}

function sll(x: number, y: number): null | number {
	const vL = GetVariableLong(x)
	const vI = GetVariableInt(y)
	if (vL == null || vI == null) return null
	return LongToDouble(vL << vI % 64n)
}
function srl(x: number, y: number): null | number {
	const vL = GetVariableLong(x)
	const vI = GetVariableInt(y)
	if (vL == null || vI == null) return null
	return LongToDouble(vL >> vI % 64n)
}
console.log("sll", (1).toString(2), srl(1, 1)?.toString(2))

console.log()
console.log()
console.log()
console.log("sll r0 1 52")
console.log(`'r0: ${sll(1, 52)}'`)
console.log("sll r0 1 53")
console.log(`'r0: ${sll(1, 53)}'`)
