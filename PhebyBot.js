const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === '-hello') {
	message.channel.send('Hello World!');
}
});

client.on('message', message => {
if (message.content === '-pheby') {

message.channel.send('Hewwoo! My name is Pheby! Happy to help <3');
message.channel.send("Here's more info about me:");
message.channel.send({
    "embed": {
    "title": "Description",
    "description": "I love taking pics, listening to music and making my friends smile! If you ever need anything, just ask 💗",
    "color": 13991080,
    "footer": {
      "icon_url": "https://i.imgur.com/xa3v4Nw.gif",
      "text": "by BlakCake"
    },
    "thumbnail": {
      "url": "https://i.imgur.com/vCauxU7.png"
    },
    "image": {
      "url": "https://i.imgur.com/u4jII55.jpg"
    },
    "author": {
      "name": "Pheby",
      "url": "https://i.imgur.com/u4jII55.jpg",
      "icon_url": "https://i.imgur.com/vCauxU7.png"
    },
    "fields": [
			{
        "name": "Age",
        "value": "20",
        "inline": true
      },
      {
        "name": "Height",
        "value": "170 cm",
        "inline": true
      },
      {
        "name": "Weight",
        "value": "122 lb",
        "inline": true
      },
      {
        "name": "Eye Color",
        "value": "Light Blue",
        "inline": true
      },
      {
        "name": "Favorite Color",
        "value": "Pastel Pink",
        "inline": true
      },
      {
        "name": "Favorite Food",
        "value": "Donuts",
        "inline": true
      }
    ]
  }
});
}
});

client.login('NzU5NTQwNzU3NTEzNzY0OTE1.X2-_dA.b1ImlGYgBsXODdrDrpNIR0WflkM');
