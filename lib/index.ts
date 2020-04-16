type UpdateFnType<Value> = (old: Value) => Value
type InsertFnType<Value> = () => Value

export interface MapLike<Key, Value> {
  has(key: Key): boolean
  get(key: Key): Value | undefined
  set(key: Key, value: Value): unknown
}

export function upsert<Key, Value>(
  map: MapLike<Key, Value>,
  key: Key,
  updateFn?: UpdateFnType<Value>,
  insertFn?: InsertFnType<Value>
): Value {
  const hasKey = map.has(key)
  let value: Value

  if (hasKey && updateFn) {
    value = updateFn(map.get(key) as Value)
  } else if (!hasKey && insertFn) {
    value = insertFn()
  } else {
    // we know this is set cause map.has is true
    return map.get(key) as Value
  }

  map.set(key, value)

  return value
}

export default upsert
