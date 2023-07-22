import { isEquals } from ".";

it("测试用例", () => {
  expect(isEquals(1, 1)).toBe(true);
});

it("如果两个参数类型不同，则不相等", () => {
  expect(isEquals(1, 1)).toBe(true);
  expect(isEquals(true, 1)).toBe(false);
  expect(isEquals(false, "")).toBe(false);
  expect(isEquals([], {})).toBe(false);
  expect(isEquals([1], true)).toBe(false);
  expect(isEquals(Symbol(2), 1)).toBe(false);
});

it("如果两个参数是基本类型并且值相等，则相等", () => {
  expect(isEquals(1, 1)).toBe(true);
  expect(isEquals(undefined, undefined)).toBe(true);
  expect(isEquals("", "")).toBe(true);
  expect(isEquals(true, true)).toBe(true);
  expect(isEquals(BigInt(1), BigInt(1))).toBe(true);
  expect(isEquals(Symbol(2), Symbol(2))).toBe(false);
});

it("NaN 与 NaN 是相等的", () => {
  expect(isEquals(NaN, NaN)).toBe(true);
});

it("-0 与 +0 是相等的", () => {
  expect(isEquals(-0, +0)).toBe(true);
  expect(isEquals(-121, +121)).toBe(false);
});

it("如果是两个对象，则比较对象的所有字段是否相等", () => {
  // 单层
  expect(isEquals({ a: 1 }, { a: 1 })).toBe(true);
  expect(isEquals({ a: 2 }, { a: 1 })).toBe(false);
  expect(isEquals({ a: 1, b: 2 }, { a: 1 })).toBe(false);

  // 多层
  expect(
    isEquals(
      { a: 1, b: { c: 2, d: [1, 2, 3], e: { c: 2, m: 0 } } },
      { a: 1, b: { c: 2, d: [1, 2, 3], e: { c: 2, m: +0 } } }
    )
  ).toBe(true);

  expect(
    isEquals(
      { a: 1, b: { c: 2, d: [1, 2, 3], e: { c: 2, m: 0 } } },
      { a: 1, b: { c: 2, d: [1, 2, 3], e: { c: "2", m: +0 } } }
    )
  ).toBe(false);
});

it("相同的数字应该相等", () => {
  expect(isEquals(2, 2)).toBe(true);
});

it("不同的数字应该不相等", () => {
  expect(isEquals(2, 3)).toBe(false);
});

it("相同的字符串应该相等", () => {
  expect(isEquals("hello", "hello")).toBe(true);
});

it("不同的字符串应该不相等", () => {
  expect(isEquals("hello", "world")).toBe(false);
});

it("相同的布尔值应该相等", () => {
  expect(isEquals(true, true)).toBe(true);
});

it("不同的布尔值应该不相等", () => {
  expect(isEquals(true, false)).toBe(false);
});

it("相同的数组应该相等", () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3];
  expect(isEquals(arr1, arr2)).toBe(true);
});

it("不同的数组应该不相等", () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 4];
  expect(isEquals(arr1, arr2)).toBe(false);
});

it("相同的对象应该相等", () => {
  const obj1 = { a: 1, b: 2, c: 3 };
  const obj2 = { a: 1, b: 2, c: 3 };
  expect(isEquals(obj1, obj2)).toBe(true);
});

it("不同的对象应该不相等", () => {
  const obj1 = { a: 1, b: 2, c: 3 };
  const obj2 = { a: 1, b: 2, d: 4 };
  expect(isEquals(obj1, obj2)).toBe(false);
});

it("null 应该等于 null", () => {
  expect(isEquals(null, null)).toBe(true);
});

it("undefined 应该等于 undefined", () => {
  expect(isEquals(undefined, undefined)).toBe(true);
});

it("null 和 undefined 不应该相等", () => {
  expect(isEquals(null, undefined)).toBe(false);
});

it("两个同样的时间 应该相等", () => {
  expect(isEquals(new Date(1690006033465), new Date(1690006033465))).toBe(true);
});

it("两个函数应该不相等", () => {
  const fn1 = (a: number, b: number) => a + b;
  const fn2 = (a: number, b: number) => a - b;
  expect(isEquals(fn1, fn2)).toBe(false);
});
