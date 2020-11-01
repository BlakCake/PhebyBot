const moment = require('moment-timezone');
const _ = require('lodash');
const geolib = require('geolib');
const { UsageError } = require('./lib/errors');
const templates = require('./templates/templates.js');


const timeConversion = (args) => {
	/**
	 * Converts time between [panama, uk, germany]
	 * @param {Array}   args An array containing message passed to Pheby
	 * @returns {String}     String to be posted by Pheby
	 */
	if (args.length < 1 || args.length > 3) throw new UsageError(`Incorrect type or number of args supplied: ${args}`);
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
		let message = '';
		switch(baseCountry) {
		case 'panama':
			message = (`${moment.tz('America/Panama').format('HH:mm')}`);
			break;
		case 'uk':
			message = (`${moment.tz('Europe/London').format('HH:mm')}`);
			break;
		case 'germany':
			message = (`${moment.tz('Europe/Berlin').format('HH:mm')}`);
			break;
		default:
			throw new UsageError(`Incorrect type or number of arguments supplied: ${args}`);
		}
		return message;
	}

	if (args.length === 3) {
		console.log(args);
		const time = args[2];
		const country = args[1].toLowerCase();
		let panama = '';
		let london = '';
		let germany = '';
		let message = '';
		switch(country) {
		case 'panama':
			panama = moment.tz(time, 'HHmm', 'America/Panama');
			london = panama.clone().tz('Europe/London');
			germany = panama.clone().tz('Europe/Berlin');
			message += (`The time in the UK is ${london.format('HH:mm')}\n`);
			message += (`The time in Germany is ${germany.format('HH:mm')}\n`);
			break;
		case 'uk':
			london = moment.tz(time, 'HHmm', 'Europe/London');
			panama = london.clone().tz('America/Panama');
			germany = london.clone().tz('Europe/Berlin');
			message += (`The time in Panama is ${panama.format('HH:mm')} \n`);
			message += (`The time in Germany is ${germany.format('HH:mm')}\n`);
			break;
		case 'germany':
			germany = moment.tz(time, 'HHmm', 'Europe/Berlin');
			london = germany.clone().tz('Europe/London');
			panama = germany.clone().tz('America/Panama');
			message += (`The time in Panama is ${panama.format('HH:mm')} \n`);
			message += (`The time in the UK is ${london.format('HH:mm')}\n`);
			break;
		default:
			message = '';
		}
		if (!message) throw new UsageError(`Incorrect type or number of arguments supplied: ${args}`);
		return message;
	}
};


const flightHandler = (message, args, data_arr) => {
	/**
	 * Creates departure and arrival messages for Pheby to post
	 * @param {Obj}   message  A discordjs message object
	 * @param {Array} args     An array of arguments received by Pheby
	 * @param {Array} data_arr An array containing all msfs2020 airport data
	 * @returns {Obj}          An obj containing departure and arrival msgs to be posted
	 */
	const iconSpeed = 193;
	const requestedTime = parseInt(args[2]) / 60;
	const randAirport = _.sample(data_arr);
	let filteredAirports = [];

	for (const airport of data_arr) {
		const dist = geolib.getDistance(
			{ latitude: randAirport.laty, longitude: randAirport.lonx },
			{ latitude: airport.laty, longitude:airport.lonx },
		) / 1000;
		const flightTime = dist / iconSpeed;
		if (flightTime <= requestedTime) {
			airport.flight_time = flightTime;
			filteredAirports.push(airport);
		}
	}

	const destAirport = filteredAirports.pop();
	filteredAirports = filteredAirports.sort(flightTimeCompare);

	const depMsg = templates.FlightPlanMsg(
		'Departure',
		randAirport.name,
		randAirport.laty,
		randAirport.lonx,
		message.author.username,
		randAirport.ident,
		randAirport.city,
		feetToMeters(randAirport.longest_runway_length),
		feetToMeters(randAirport.longest_runway_width),
		feetToMeters(randAirport.altitude),
		randAirport.tower_frequency,
		destAirport.flight_time.toFixed(1),
		numberToStar(randAirport.rating),
	);

	const arrMsg = templates.FlightPlanMsg(
		'Arrival',
		destAirport.name,
		destAirport.laty,
		destAirport.lonx,
		message.author.username,
		destAirport.ident,
		destAirport.city,
		feetToMeters(destAirport.longest_runway_length),
		feetToMeters(destAirport.longest_runway_width),
		feetToMeters(destAirport.altitude),
		destAirport.tower_frequency,
		'',
		numberToStar(destAirport.rating),
	);
	return { depMsg, arrMsg };
};

function numberToStar(starAmount) {
	let Star = '';
	if (starAmount == 0) {
		Star = '💩';
		console.log('bruh');
	}
	for(let i = 1; i <= starAmount; i++) {
		Star += '⭐';
	}
	return Star;
}

const flightTimeCompare = (a, b) => {
	if (a.flight_time < b.flight_time) {
		return -1;
	}
	if (a.flight_time > b.flight_time) {
		return 1;
	}
	return 0;
};

const feetToMeters = (feet) => {
	return parseInt(feet / 3.28);
};

module.exports = {
	timeConversion,
	flightTimeCompare,
	feetToMeters,
	flightHandler,
};
