type UpdateFnType<Value> = (old: Value) => Value
type InsertFnType<Value> = () => Value

export function upsert<Key, Value>(
  map: Map<Key, Value>,
  key: Key,
  updateFn?: UpdateFnType<Value>,
  insertFn?: InsertFnType<Value>
): Value

export function upsert<Key extends object, Value>(
  map: WeakMap<Key, Value>,
  key: Key,
  updateFn?: UpdateFnType<Value>,
  insertFn?: InsertFnType<Value>
): Value

export function upsert<Key extends object, Value>(
  map: Map<Key, Value> | WeakMap<Key, Value>,
  key: Key,
  updateFn?: UpdateFnType<Value>,
  insertFn?: InsertFnType<Value>
) {
  const hasKey = map.has(key)
  let value: Value

  if (hasKey && updateFn) {
    value = updateFn(map.get(key) as Value)
  } else if (!hasKey && insertFn) {
    value = insertFn()
  } else {
    return map.get(key)
  }

  map.set(key, value)

  return value
}

export default upsert
