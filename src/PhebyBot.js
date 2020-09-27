const Discord = require('discord.js');
const client = new Discord.Client();
const { PREFIX, API_KEY } = require('./config');
const { INTRO } = require('./templates');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === `${PREFIX}hello`) {
		message.channel.send('Hello World!');
	}
});

client.on('message', message => {
	if(message.author.bot) return;

	if (message.content === `${PREFIX}pheby`) {
		message.channel.send('Hewwoo! My name is Pheby! Happy to help <3 \n Here\'s more info about me:');
		message.channel.send(INTRO);
	}
});

client.login(API_KEY);