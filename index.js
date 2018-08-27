const Bignumber = require('bignumber.js');
const Math = require('mathjs');

function toString(hashrate){
	return valueToMagnitude(new Bignumber(hashrate).toNumber(), 'H/s', 2);
}

function parse(hashrateString) {
	const value = hashrateString.slice(0, hashrateString.indexOf(' '));
	let unit = hashrateString.slice(hashrateString.indexOf(' '), hashrateString.length);
	unit = unit.replace('Sol', 'H');
	unit = unit.replace('/s', '').trim();

	const unitValue = {
		H: '1',
		KH: '1000',
		MH: '1000000',
		GH: '1000000000',
		TH: '1000000000000',
		PH: '1000000000000000',
		EH: '1000000000000000000'
	}

	return new Bignumber(value).times(unitValue[unit] || 0);
}

function valueToMagnitude(value, unit, fixedPlaces) {
	var unitExponents = [
		[0, ''],
		[3, 'k'],
		[6, 'M'],
		[9, 'G'],
		[12, 'T'],
		[15, 'P'],
		[18, 'E'],
		[21, 'Y']
	];

	if (Math.abs(value) > 0 && Math.abs(value) < 1) {
		return valueToMagnitudeVerySmall(value, unit, fixedPlaces);
	}

	var sign = value < 0 ? -1 : 1;
	value = Math.abs(value);
	var i = 0;
	let idx = 0;
	for (i = unitExponents.length - 1; i >= 0; i--) {
		if (value >= Math.pow(10, unitExponents[i][0])) {
			idx = i;
			break;
		}
	}
	value = value / Math.pow(10, unitExponents[idx][0]);

	if (fixedPlaces !== undefined) {
		value = value.toFixed(fixedPlaces);
	}

	value = value * sign;

	return value + ' ' + unitExponents[idx][1] + unit;
}

function valueToMagnitudeVerySmall(value, unit, fixedPlaces) {
	var unitExponents = [
		[-12, 'p'],
		[-9, 'n'],
		[-6, 'μ'],
		[-3, 'm'],
		[0, ''],
		[3, 'k'],
		[6, 'M'],
		[9, 'G'],
		[12, 'T'],
		[15, 'P'],
		[18, 'E'],
		[21, 'Y']
	];
	var valueBG = new Big(value);
	var sign = valueBG.lt(0) ? -1 : 1;
	valueBG = valueBG.abs(valueBG);

	var i = 0;
	let idx = unitExponents.length - 1;
	match = false;
	for (i = 0; i < unitExponents.length; i++) {
		if (valueBG.lte(new Big(10).pow(unitExponents[i][0]))) {
			idx = i;
			break;
		}
	}

	valueBG = valueBG.div(new Big(10).pow(unitExponents[idx][0]));

	if (fixedPlaces !== undefined) {
		valueBG = value.toFixed(fixedPlaces);
	}
	valueBG = valueBG.times(sign);
	return valueBG + ' ' + unitExponents[idx][1] + unit;
}

module.exports = { parse, toString };
