const Discord = require('discord.js');
const client = new Discord.Client();
const { PREFIX, API_KEY } = require('./config');
const utils = require('./utils');
const templates = require('./templates/templates.js');

client.once('ready', () => {
	console.log('Ready!');
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
});

client.login(API_KEY);