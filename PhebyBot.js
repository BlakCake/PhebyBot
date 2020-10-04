const Discord = require('discord.js');
const _ = require('lodash');
const client = new Discord.Client();
const { PREFIX, API_KEY } = require('./config');
const utils = require('./utils');
const templates = require('./templates/templates.js');
const ThankQuotes = require('./templates/ThankYouQuotes.js');
const csv = require('csv-parser');
const fs = require('fs');
const geolib = require('geolib');
// import { getDistance } from 'geolib';


client.once('ready', () => {
	console.log('Ready!');
});


const data_arr = [];
fs.createReadStream('airports_msfs2020_pheby.csv')
	.pipe(csv())
	.on('data', function(data) {
		try {
			// perform the operation
			data_arr.push(data);
		}
		catch(err) {
			// error handler
			console.log(err);
		}
	})
	.on('end', function() {
		console.log('done');
	});


client.on('message', message => {
	// No reason to respond to other bots or myself
	if(message.author.bot) return;
	// Ignore all messages not starting with our prefix
	if(!message.content.startsWith(`${PREFIX}`)) return;

	const args = message.content.slice(PREFIX.length).trim().split(' ');
	// const command = args.shift().toLowerCase();

	if (message.content === `${PREFIX}hello`) {
		message.channel.send('Hello World!');
	}

	if (message.content === `${PREFIX}pheby`) {
		message.channel.send('Hewwoo! My name is Pheby! Happy to help <3 \nHere\'s more info about me:');
		message.channel.send(templates.INTRO);
	}

	if (message.content.startsWith(`${PREFIX}time`)) {
		const msg = utils.timeConversion(args);
		message.channel.send(msg);
	}

	if (message.content === `${PREFIX}thanks`) {
		console.log(ThankQuotes.RanThanks);
		message.channel.send(_.sample(ThankQuotes.RanThanks));
	}

	if (message.content.startsWith(`${PREFIX}flight`)) {
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
		filteredAirports = filteredAirports.sort(utils.flightTimeCompare);
		const depMsg = templates.FlightPlanMsg(
			'Departure',
			randAirport.name,
			randAirport.laty,
			randAirport.lonx,
			message.author.username,
			randAirport.ident,
			randAirport.city,
			utils.feetToMeters(randAirport.longest_runway_length),
			utils.feetToMeters(randAirport.longest_runway_width),
			utils.feetToMeters(randAirport.altitude),
			randAirport.tower_frequency,
			destAirport.flight_time.toFixed(1),
		);
		const arrMsg = templates.FlightPlanMsg(
			'Arrival',
			destAirport.name,
			destAirport.laty,
			destAirport.lonx,
			message.author.username,
			destAirport.ident,
			destAirport.city,
			utils.feetToMeters(destAirport.longest_runway_length),
			utils.feetToMeters(destAirport.longest_runway_width),
			utils.feetToMeters(destAirport.altitude),
			destAirport.tower_frequency,
			'',
		);
		message.channel.send(depMsg);
		message.channel.send(arrMsg);
	}
});

client.login(API_KEY);
