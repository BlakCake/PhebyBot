const Discord = require('discord.js');
const _ = require('lodash');
const csv = require('csv-parser');
const fs = require('fs');

const { PREFIX, API_KEY } = require('./config');
const utils = require('./utils');
const templates = require('./templates/templates.js');
const ThankQuotes = require('./templates/ThankYouQuotes.js');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});


const data_arr = [];
fs.createReadStream('airports_msfs2020_pheby.csv')
	.pipe(csv())
	.on('data', function(data) {
		try {
			data_arr.push(data);
		}
		catch(err) {
			console.log(err);
		}
	})
	.on('end', function() {
		console.log('done');
	});


client.on('message', message => {
	try {
	// No reason to respond to other bots or myself
		if(message.author.bot) return;
		// Ignore all messages not starting with our prefix
		if(!message.content.startsWith(`${PREFIX}`)) return;

		const args = message.content.slice(PREFIX.length).trim().split(' ');
		// const command = args.shift().toLowerCase();

		if (message.content === `${PREFIX}pheby`) {
			message.channel.send('Hewwoo! My name is Pheby! Happy to help <3 \nHere\'s more info about me:');
			message.channel.send(templates.INTRO);
		}

		if (message.content.startsWith(`${PREFIX}time`)) {
			const msg = utils.timeConversion(args);
			console.log(`Got message ${msg}`);
			message.channel.send(msg);
		}

		if (message.content === `${PREFIX}thanks`) {
			console.log(ThankQuotes.RanThanks);
			message.channel.send(_.sample(ThankQuotes.RanThanks));
		}

		if (message.content.startsWith(`${PREFIX}flight`)) {
			const msgs = utils.flightHandler(message, args, data_arr);
			message.channel.send(msgs.depMsg);
			message.channel.send(msgs.arrMsg);
		}
	}
	catch (err) {
		if (err.message) {
			message.channel.send(err.message);
		}
		else {
			console.log(err);
			message.channel.send('OOPSIE WOOPSIE!! Uwu I made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!');
		}
	}
});

client.on('error', (err, message) => {
	console.log(err);
	message.channel.send('Messed up');
	client.login(API_KEY);
});

client.login(API_KEY);
