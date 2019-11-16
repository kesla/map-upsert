# map-upsert

`upsert()` for (Weak)Map, as defined in the [tc 39 proposal](https://github.com/tc39/proposal-upsert).

## usage

This module follows the same logic as outlined in [the proposed api](https://github.com/tc39/proposal-upsert#examples--proposed-api), but the first argument is the Map or WeakMap object.

## Example

```
const map = new Map<string, number>();
const updateFn = (old: number): number => old + 1;
const insertFn = () => 0;
const upsert = require('map-upsert');

upsert(map, 'key', updateFn, insertFn);
assert.equals(map.get('key', 0);

upsert(map, 'key', updateFn, insertFn);
assert.equal(map.get('key', 1);
```
