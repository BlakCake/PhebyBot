const moment = require('moment-timezone');

function timeConversion(args) {
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
		const time = args[2];
		const panama = moment.tz(time, 'HHmm', 'America/Panama');
		const london = panama.clone().tz('Europe/London');
		const germany = panama.clone().tz('Europe/Berlin');
		let message = '';
		message += (`The time in Panama is ${panama.format('HH:mm')} \n`);
		message += (`The time in the UK is ${london.format('HH:mm')}\n`);
		message += (`The time in Germany is ${germany.format('HH:mm')}\n`);
		return message;
	}
}

module.exports = {
	timeConversion,
};


// {
//     "Mexico": "America/Mexico",
//     "United Kingdom": "Europe/London"
// }