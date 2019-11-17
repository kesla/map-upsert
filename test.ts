import assert from 'assert'

import { expectType } from 'tsd'

import upsert from './lib'

const updateFn = (old: number): number => old + 1
const insertFn = () => 0

let indentation = 0

const test = (name: string, fn: () => void) => {
  console.log(`${' '.repeat(indentation)}${name}`)
  indentation += 2
  fn()
  indentation -= 2
  console.log(`${' '.repeat(indentation)}All tests passed`)
}

test('Map', () => {
  test('basics', () => {
    const map = new Map<string, number>()

    assert.strictEqual(upsert(map, 'foo', updateFn, insertFn), 0)
    assert.strictEqual(upsert(map, 'foo', updateFn, insertFn), 1)
    assert.strictEqual(upsert(map, 'bar', updateFn, insertFn), 0)

    assert.strictEqual(map.get('foo'), 1)
    assert.strictEqual(map.get('bar'), 0)

    const typeTest = upsert(map, 'bar', updateFn, insertFn)
    expectType<number>(typeTest)
  })

  test('No updateFn', () => {
    const map = new Map<string, number>()

    assert.strictEqual(upsert(map, 'foo', undefined, insertFn), 0)
    assert.strictEqual(upsert(map, 'foo', undefined, insertFn), 0)

    const typeTest = upsert(map, 'foo', undefined, insertFn)
    expectType<number>(typeTest)
  })

  test('No insertFn', () => {
    const map = new Map<string, number>()

    assert.strictEqual(upsert(map, 'foo', updateFn), undefined)
    assert.strictEqual(map.has('foo'), false)

    map.set('foo', 10)
    assert.strictEqual(upsert(map, 'foo', updateFn), 11)

    const typeTest = upsert(map, 'foo', updateFn)
    expectType<number | undefined>(typeTest)
  })
})

test('WeakMap', () => {
  class Foo {
    constructor(public bar: number) {}
  }
  const foo1 = new Foo(1)
  const foo2 = new Foo(2)

  test('basics', () => {
    const map = new WeakMap<Foo, number>()

    assert.strictEqual(upsert(map, foo1, updateFn, insertFn), 0)
    assert.strictEqual(upsert(map, foo1, updateFn, insertFn), 1)
    assert.strictEqual(upsert(map, foo2, updateFn, insertFn), 0)

    assert.strictEqual(map.get(foo1), 1)
    assert.strictEqual(map.get(foo2), 0)

    const typeTest = upsert(map, foo2, updateFn, insertFn)
    expectType<number>(typeTest)
  })

  test('No updateFn', () => {
    const map = new WeakMap<Foo, number>()

    assert.strictEqual(upsert(map, foo1, undefined, insertFn), 0)
    assert.strictEqual(upsert(map, foo1, undefined, insertFn), 0)

    const typeTest = upsert(map, foo1, undefined, insertFn)
    expectType<number>(typeTest)
  })

  test('No insertFn', () => {
    const map = new WeakMap<Foo, number>()

    assert.strictEqual(upsert(map, foo1, updateFn), undefined)
    assert.strictEqual(map.has(foo1), false)

    map.set(foo1, 10)
    assert.strictEqual(upsert(map, foo1, updateFn), 11)

    const typeTest = upsert(map, foo1, updateFn)
    expectType<number | undefined>(typeTest)
  })
})
