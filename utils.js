const moment = require('moment-timezone');

function timeConversion(args) {
	if (args.length == 1) {
		const panama = moment.tz('America/Panama');
		const london = panama.clone().tz('Europe/London');
		const germany = panama.clone().tz('Europe/Berlin');
		let message = '';
		message += (`The time in Panama is ${panama.format('HH:mm')}\n`);
		message += (`The time in the UK is ${london.format('HH:mm')}\n`);
		message += (`The time in Germany is ${germany.format('HH:mm')}\n`);
		return message;
	}

	if (args.length == 2) {
		const baseCountry = args[1].toLowerCase();
		if (baseCountry === 'panama') {
			return(`${moment.tz('America/Panama').format('HH:mm')}`);
		}
		else if (baseCountry === 'uk') {
			return(`${moment.tz('Europe/London').format('HH:mm')}`);
		}
		else if (baseCountry === 'germany') {
			return(`${moment.tz('Europe/Berlin').format('HH:mm')}`);
		}
	}

	if (args.length === 3) {
		console.log(args);
		const time = args[2];
		const country = args[1].toLowerCase();
		let panama = '';
		let london = '';
		let germany = '';
		let message = '';
		console.log(country);
		if (country === 'panama') {
			panama = moment.tz(time, 'HHmm', 'America/Panama');
			london = panama.clone().tz('Europe/London');
			germany = panama.clone().tz('Europe/Berlin');
			message += (`The time in the UK is ${london.format('HH:mm')}\n`);
			message += (`The time in Germany is ${germany.format('HH:mm')}\n`);
		}
		else if (country === 'uk') {
			london = moment.tz(time, 'HHmm', 'Europe/London');
			panama = london.clone().tz('America/Panama');
			germany = london.clone().tz('Europe/Berlin');
			message += (`The time in Panama is ${panama.format('HH:mm')} \n`);
			message += (`The time in Germany is ${germany.format('HH:mm')}\n`);
		}
		else if (country === 'germany') {
			germany = moment.tz(time, 'HHmm', 'Europe/Berlin');
			london = germany.clone().tz('Europe/London');
			panama = germany.clone().tz('America/Panama');
			message += (`The time in Panama is ${panama.format('HH:mm')} \n`);
			message += (`The time in the UK is ${london.format('HH:mm')}\n`);
		}
		else {
			return '';
		}
		return message;
	}
}


function flightTimeCompare(a, b) {
	if (a.flight_time < b.flight_time) {
	  return -1;
	}
	if (a.flight_time > b.flight_time) {
	  return 1;
	}
	return 0;
}

function feetToMeters(feet) {
	return parseInt(feet / 3.28);
}

module.exports = {
	timeConversion,
	flightTimeCompare,
	feetToMeters,
};
