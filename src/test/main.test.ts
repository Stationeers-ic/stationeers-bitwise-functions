import { describe, expect, test } from "bun:test"
import { and, nor, not, or, sll, sra, srl, xor } from "../index"
import { DoubleToLong, GetVariableInt, GetVariableLong, LongToDouble } from "../functions"


describe("functions", () => {
	test("DoubleToLong", () => {
		expect(DoubleToLong(1n, true)).toBe(1n)
		expect(DoubleToLong(32984672098467n, true)).toBe(32984672098467n)
		expect(DoubleToLong(1n, false)).toBe(1n)
		expect(DoubleToLong(32984672098467n, false)).toBe(32984672098467n)
		expect(DoubleToLong(-1n, true)).toBe(-1n)
		expect(DoubleToLong(-32984672098467n, true)).toBe(-32984672098467n)
		expect(DoubleToLong(-1n, false)).toBe(18014398509481983n)
		expect(DoubleToLong(-32984672098467n, false)).toBe(17981413837383517n)
		expect(DoubleToLong(-9007199254740992n, false)).toBe(0n)
	})
	test("LongToDouble", () => {
		expect(LongToDouble(1n)).toBe(1)
		expect(LongToDouble(10n)).toBe(10)
		expect(LongToDouble(0x1fffffffffffffn)).toBe(0x1fffffffffffff)
		expect(LongToDouble(9007199740991n)).toBe(9007199740991)
		expect(LongToDouble(-1n)).toBe(-1)
		expect(LongToDouble(-10n)).toBe(-10)
		expect(LongToDouble(0x3ffffffffffff6n)).toBe(-10)
		expect(LongToDouble(0x20000000000000n)).toBe(-9007199254740992)
		expect(LongToDouble(0x20000000000001n)).toBe(-9007199254740991)
		expect(LongToDouble(0x20000000000080n)).toBe(-9007199254740864)
		expect(LongToDouble(0x3fffffffffffffn)).toBe(-1)
	})
	test("GetVariableLong", () => {
		// other values are tested in DoubleToLong
		expect(GetVariableLong(1)).toBe(1n)
		expect(GetVariableLong(-1)).toBe(-1n)
		expect(GetVariableLong(2147483648)).toBe(2147483648n)
		expect(GetVariableLong(-2147483649)).toBe(-2147483649n)
		expect(GetVariableLong(9223372036854777000)).toBe(null)
		expect(GetVariableLong(-9223372036854777000)).toBe(null)
	})
	test("GetVariableInt", () => {
		expect(GetVariableInt(1)).toBe(1n)
		expect(GetVariableInt(-1)).toBe(-1n)
		expect(GetVariableInt(2147483648)).toBe(null)
		expect(GetVariableInt(-2147483649)).toBe(null)
		expect(GetVariableInt(9223372036854777000)).toBe(null)
		expect(GetVariableInt(-9223372036854777000)).toBe(null)
	})

})

describe("arithmetic", () => {
	test("sll", () => {
		expect(sll(1, 2)).toBe(4)
		expect(sll(-1, 1)).toBe(-2)
		expect(sll(1, 51)).toBe(0x8000000000000)
		expect(sll(1, 52)).toBe(0x10000000000000)
		expect(sll(-0x10000000000000, 1)).toBe(-0x20000000000000)
		expect(sll(1, 53)).toBe(-0x20000000000000)
		expect(sll(1, 54)).toBe(0)
		expect(sll(1, 55)).toBe(0)
		expect(sll(1, 64)).toBe(1)
		expect(sll(1, 70)).toBe(0b1000000)
		expect(sll(0b1011, 2)).toBe(0b101100)
		expect(sll(0b1011, 3)).toBe(0b1011000)
		expect(sll(0b101, 51)).toBe(-0x18000000000000)
		expect(sll(-9223372036854777000, 1)).toBe(null)
		expect(sll(9223372036854777000, 1)).toBe(null)
		expect(sll(1, 2147483648)).toBe(null)
		expect(sll(1, -2147483649)).toBe(null)
	})
	test("srl", () => {
		expect(srl(0x10000000000000, 1)).toBe(0x8000000000000)
		expect(srl(0b101, 1)).toBe(0b10)
		expect(srl(-0x20000000000000, 1)).toBe(0)
		expect(srl(1, 1)).toBe(0)
		expect(srl(-1, 2)).toBe(0xfffffffffffff)
		expect(srl(-1, 1)).toBe(0x1fffffffffffff)
		expect(srl(-1, 50)).toBe(0b1111)
		expect(srl(-1, 53)).toBe(0b1)
		expect(srl(-1, 54)).toBe(0b0)
		expect(srl(-1, 55)).toBe(0b0)
		expect(srl(-9223372036854777000, 1)).toBe(null)
		expect(srl(9223372036854777000, 1)).toBe(null)
		expect(srl(1, 2147483648)).toBe(null)
		expect(srl(1, -2147483649)).toBe(null)
	})
	test("sra", () => {
		expect(sra(1, 1)).toBe(0)
		expect(sra(1, 2)).toBe(0)
		expect(sra(-1, 1)).toBe(-1)
		expect(sra(-1, 2)).toBe(-1)
		expect(sra(0x10000000000000, 1)).toBe(0x8000000000000)
		expect(sra(-0x20000000000000, 1)).toBe(0)
		expect(sra(-9223372036854777000, 1)).toBe(null)
		expect(sra(9223372036854777000, 1)).toBe(null)
		expect(sra(1, 2147483648)).toBe(null)
		expect(sra(1, -2147483649)).toBe(null)
	})
	test("and", () => {
		expect(and(1, 1)).toBe(1)
		expect(and(0b1100, 0b0110)).toBe(0b0100)
		expect(and(0b1101, 0b1111)).toBe(0b1101)
		expect(and(-1, -1)).toBe(-1)
		expect(and(-10, 10)).toBe(2)
		expect(and(0xf0fff0fffff, 0xfffff0fff0f)).toBe(0xf0fff0fff0f)
		expect(and(-9223372036854777000, 1)).toBe(null)
		expect(and(9223372036854777000, 1)).toBe(null)
		expect(and(1, -9223372036854777000)).toBe(null)
		expect(and(1, 9223372036854777000)).toBe(null)
	})
	test("or", () => {
		expect(or(1, 1)).toBe(1)
		expect(or(0b1100, 0b0110)).toBe(0b1110)
		expect(or(0b1101, 0b1111)).toBe(0b1111)
		expect(or(-1, -1)).toBe(-1)
		expect(or(-10, 10)).toBe(-2)
		expect(or(0xf0fff0fffff, 0xfffff0fff0f)).toBe(0xfffff0fffff)
		expect(or(-9223372036854777000, 1)).toBe(null)
		expect(or(9223372036854777000, 1)).toBe(null)
		expect(or(1, -9223372036854777000)).toBe(null)
		expect(or(1, 9223372036854777000)).toBe(null)
	})
	test("xor", () => {
		expect(xor(1, 1)).toBe(0)
		expect(xor(0b1100, 0b0110)).toBe(0b1010)
		expect(xor(0b1101, 0b1111)).toBe(0b0010)
		expect(xor(-1, -1)).toBe(0)
		expect(xor(-10, 10)).toBe(-4)
		expect(xor(0xf0fff0fffff, 0xfffff0fff0f)).toBe(0x0f0000000f0)
		expect(xor(-9223372036854777000, 1)).toBe(null)
		expect(xor(9223372036854777000, 1)).toBe(null)
		expect(xor(1, -9223372036854777000)).toBe(null)
		expect(xor(1, 9223372036854777000)).toBe(null)
	})
	test("nor", () => {
		expect(nor(1, 1)).toBe(-2)
		expect(nor(0b1100, 0b0110)).toBe(-15)
		expect(nor(0b1101, 0b1111)).toBe(-16)
		expect(nor(-1, -1)).toBe(0)
		expect(nor(-10, 10)).toBe(1)
		expect(nor(0xf0fff0fffff, 0xfffff0fff0f)).toBe(-0xfffff100000)
		expect(nor(-9223372036854777000, 1)).toBe(null)
		expect(nor(9223372036854777000, 1)).toBe(null)
		expect(nor(1, -9223372036854777000)).toBe(null)
		expect(nor(1, 9223372036854777000)).toBe(null)
	})
	test("not", () => {
		expect(not(1)).toBe(-2)
		expect(not(0b1100)).toBe(-13)
		expect(not(0b1101)).toBe(-14)
		expect(not(-1)).toBe(0)
		expect(not(-10)).toBe(9)
		expect(not(10)).toBe(-11)
		expect(not(0xf0fff0fffff)).toBe(-0xf0fff100000)
		expect(not(-9223372036854777000)).toBe(null)
		expect(not(9223372036854777000)).toBe(null)
	})
})



