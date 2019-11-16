import assert from "assert";
import { upsert } from "./lib";

const updateFn = (old: number): number => old + 1;
const insertFn = () => 0;

const test = (name: string, fn: () => void) => {
  console.log(name);
  fn();
  console.log("");
};

test("Map", () => {
  const map = new Map<string, number>();

  assert.strictEqual(upsert(map, "foo", updateFn, insertFn), 0);
  assert.strictEqual(upsert(map, "foo", updateFn, insertFn), 1);
  assert.strictEqual(upsert(map, "bar", updateFn, insertFn), 0);

  assert.strictEqual(map.get("foo"), 1);
  assert.strictEqual(map.get("bar"), 0);
});

test("WeakMap", () => {
  class Foo {
    constructor(public bar: number) {}
  }
  const foo1 = new Foo(1);
  const foo2 = new Foo(2);

  const weakMap = new WeakMap<Foo, number>();

  assert.strictEqual(upsert(weakMap, foo1, updateFn, insertFn), 0);
  assert.strictEqual(upsert(weakMap, foo1, updateFn, insertFn), 1);
  assert.strictEqual(upsert(weakMap, foo2, updateFn, insertFn), 0);
});

test("No updateFn", () => {
  const map = new Map<string, number>();

  assert.strictEqual(upsert(map, "foo", undefined, insertFn), 0);
  assert.strictEqual(upsert(map, "foo", undefined, insertFn), 0);
});

test("No insertFn", () => {
  const map = new Map<string, number>();

  assert.strictEqual(upsert(map, "foo", updateFn), undefined);
  assert.strictEqual(map.has("foo"), false);

  map.set("foo", 10);
  assert.strictEqual(upsert(map, "foo", updateFn), 11);
});
