export function upsert<Key, Value>(
  map: Map<Key, Value>,
  key: Key,
  updateFn: (old: Value) => Value,
  insertFn: () => Value
): Value;

export function upsert<Key extends object, Value>(
  map: WeakMap<Key, Value>,
  key: Key,
  updateFn: (old: Value) => Value,
  insertFn: () => Value
): Value;

export function upsert<Key extends object, Value>(
  map: Map<Key, Value> | WeakMap<Key, Value>,
  key: Key,
  updateFn: (old: Value) => Value,
  insertFn: () => Value
) {
  const value = map.has(key) ? updateFn(map.get(key) as Value) : insertFn();

  map.set(key, value);

  return value;
}
