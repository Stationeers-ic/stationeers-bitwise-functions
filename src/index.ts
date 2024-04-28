import { GetVariableInt, GetVariableLong, LongToDouble, SignVariable, UnSignVariable } from "./functions"

console.log((-18).toString(2))
console.log(UnSignVariable(SignVariable(-18)).toString(2))

export function sll(x: number, y: number): null | number {
	const vL = GetVariableLong(x)
	const vI = GetVariableInt(y)
	if (vL == null || vI == null) return null
	return LongToDouble(vL << vI % 64n)
}
export function srl(x: number, y: number): null | number {
	// IDK why it is here but it works
	if (x < 0) y--
	const vL = GetVariableLong(x, false)
	const vI = GetVariableInt(y)
	if (vL == null || vI == null) return null
	return LongToDouble(vL >> vI % 64n)
}
export function and(x: number, y: number): null | number {
	const vL = GetVariableLong(x)
	const vI = GetVariableLong(y)
	if (vL == null || vI == null) return null
	return LongToDouble(UnSignVariable(SignVariable(vL) & SignVariable(vI)))
}
