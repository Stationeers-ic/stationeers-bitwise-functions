import { GetVariableInt, GetVariableLong, LongToDouble } from "./functions"

export function sll(x: number, y: number): null | number {
	const vL = GetVariableLong(x)
	const vI = GetVariableInt(y)
	if (vL == null || vI == null) return null
	return LongToDouble(vL << vI % 64n)
}
export function srl(x: number, y: number): null | number {
	const vL = GetVariableLong(x, false)
	const vI = GetVariableInt(y)
	if (vL == null || vI == null) return null
	return LongToDouble(vL >> vI % 64n)
}
export function sra(x: number, y: number): null | number {
	const vL = GetVariableLong(x)
	const vI = GetVariableInt(y)
	if (vL == null || vI == null) return null
	return LongToDouble(vL >> vI % 64n)
}

export function and(x: number, y: number): null | number {
	const vL = GetVariableLong(x)
	const vI = GetVariableLong(y)
	if (vL == null || vI == null) return null
	return LongToDouble(vL & vI)
}
export function or(x: number, y: number): null | number {
	const vL = GetVariableLong(x)
	const vI = GetVariableLong(y)
	if (vL == null || vI == null) return null
	return LongToDouble(vL | vI)
}
export function xor(x: number, y: number): null | number {
	const vL = GetVariableLong(x)
	const vI = GetVariableLong(y)
	if (vL == null || vI == null) return null
	return LongToDouble(vL ^ vI)
}
export function nor(x: number, y: number): null | number {
	const vL = GetVariableLong(x)
	const vI = GetVariableLong(y)
	if (vL == null || vI == null) return null
	return LongToDouble(~(vL | vI))
}
export function not(x: number): null | number {
	const vL = GetVariableLong(x)
	if (vL == null) return null
	return LongToDouble(~vL)
}
