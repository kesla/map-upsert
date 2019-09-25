import assert from "assert";
import { upsert } from "./lib";
class Foo {
  constructor(public bar: number) {}
}
const foo1 = new Foo(1);
const foo2 = new Foo(2);

const map = new Map<string, number>();

const updateFn = (old: number): number => old + 1;
const insertFn = () => 0;

assert.strictEqual(upsert(map, "foo", updateFn, insertFn), 0);
assert.strictEqual(upsert(map, "foo", updateFn, insertFn), 1);
assert.strictEqual(upsert(map, "bar", updateFn, insertFn), 0);

const weakMap = new WeakMap<Foo, number>();

assert.strictEqual(upsert(weakMap, foo1, updateFn, insertFn), 0);
assert.strictEqual(upsert(weakMap, foo1, updateFn, insertFn), 1);
assert.strictEqual(upsert(weakMap, foo2, updateFn, insertFn), 0);
