# One-Year Cliff

```javascript
var vested = require('vesting')(
  48, // Denominator of fraction of total earned monthly
  4   // Denominator of fraction of total earned at cliff
      // Cliff at 1-year anniversary by default
)
var assert = require('assert')

// Before 1 year
assert.equal(
  vested(
    1000000,              // Total shares
    new Date(2015, 0, 1), // Start date
    new Date(2015, 0, 2)  // Last work day
  ),
  0
)

// At 1 year
assert.equal(
  vested(
    1000000,
    new Date(2015, 0, 1),
    new Date(2016, 0, 1)
  ),
  250000
)

// Monthly after the cliff
assert.equal(
  vested(
    1000000,
    new Date(2015, 0, 1),
    new Date(2016, 1, 1)
  ),
  250000 + 15625
)

// Fully vested
assert.equal(
  vested(
    1000000,
    new Date(2015, 0, 1),
    new Date(2020, 0, 1)
  ),
  1000000
)
```

# _n_-Year Cliff

```javascript
// 7-year cliff
var vested = require('vesting')(48, 4, 7)

assert.equal(
  vested(
    1000000,
    new Date(2015, 0, 1),
    new Date(2015, 0, 2)
  ),
  0
)

// After 1 year
assert.equal(
  vested(
    1000000,
    new Date(2015, 0, 1),
    new Date(2016, 0, 1)
  ),
  0
)

// After 7 years
assert.equal(
  vested(
    1000000,
    new Date(2015, 0, 1),
    new Date((2015 + 7), 0, 1)
  ),
  250000
)
```

# Straight (No Cliff)

```javascript
var vested = require('vesting')(48)

assert.equal(
  vested(
    4800000,
    new Date(2015, 0, 1),
    new Date(2015, 1, 1)
  ),
  100000
)
```
