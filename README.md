# js-hashrate-parser

## Installation
```bash
npm install js-hashrate-parser
```

## Usage

### parse(hashrateString)

Accepts a hashrate string and will return a [bignumber](https://github.com/MikeMcl/bignumber.js/)

```javascript
const Hashrate = require('js-hashrate-parser');

Hashrate.parse('1 H/s'); // 1
Hashrate.parse('1 Sol/s'); // 1
Hashrate.parse('1 KH/s'); // 1000
Hashrate.parse('1 KSol/s'); // 1000
```

### toString(hashrateNumber)

Accepts a hashrate number and returns a hashrate string. Input can be a string of a number, a number, or a [bignumber](https://github.com/MikeMcl/bignumber.js/).

```javascript
const Hashrate = require('js-hashrate-parser');

Hashrate.toString(6589270000000000000); // 6.59 EH/s
Hashrate.toString('1000'); // 1 Kh/s
Hashrate.toString(new Bignumber(1)); // 1 H/s
```

https://www.poolminer.io
