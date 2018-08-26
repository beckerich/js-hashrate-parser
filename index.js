const Bignumber = require('bignumber.js');

function toString(hashrate){
	hashrate = (hashrate * 2);
	if (hashrate < 1000000) {
		return (Math.round(hashrate / 1000) / 1000 ).toFixed(0)+' H/s';
	}
	var byteUnits = [ ' H/s', ' KH/s', ' MH/s', ' GH/s', ' TH/s', ' PH/s' ];
	var i = Math.floor((Math.log(hashrate/1000) / Math.log(1000)) - 1);
	hashrate = (hashrate/1000) / Math.pow(1000, i + 1);
	return hashrate.toFixed(0) + byteUnits[i];
}

function parse(hashrateString) {
	const value = hashrateString.slice(0, hashrateString.indexOf(' '));
	let unit = hashrateString.slice(hashrateString.indexOf(' '), hashrateString.length);
	unit = unit.replace('Sol', 'H');
	unit = unit.replace('H/s', '').trim();

	const unitValue = {
		K: '1000',
		M: '1000000',
		G: '1000000000',
		T: '1000000000000',
		P: '1000000000000000',
		E: '1000000000000000000'
	}

	return new Bignumber(value).times(unitValue[unit]);
}

module.exports = { parse, toString };
