exports.INTRO = {
	'embed': {
		'title': 'Description',
		'description': 'I love taking pics, listening to music and making my friends smile! If you ever need anything, just ask 💗',
		'color': 13991080,
		'footer': {
			'icon_url': 'https://i.imgur.com/xa3v4Nw.gif',
			'text': 'by BlakCake',
		},
		'thumbnail': {
			'url': 'https://i.imgur.com/vCauxU7.png',
		},
		'image': {
			'url': 'https://i.imgur.com/u4jII55.jpg',
		},
		'author': {
			'name': 'Pheby',
			'url': 'https://i.imgur.com/u4jII55.jpg',
			'icon_url': 'https://i.imgur.com/vCauxU7.png',
		},
		'fields': [
			{
				'name': 'Age',
				'value': '20',
				'inline': true,
			},
			{
				'name': 'Height',
				'value': '172 cm',
				'inline': true,
			},
			{
				'name': 'Weight',
				'value': '134 lb',
				'inline': true,
			},
			{
				'name': 'Eye Color',
				'value': 'Light Blue',
				'inline': true,
			},
			{
				'name': 'Favorite Color',
				'value': 'Pastel Pink',
				'inline': true,
			},
			{
				'name': 'Favorite Food',
				'value': 'Donuts',
				'inline': true,
			},
		],
	},
};


exports.FlightPlanMsg = (type, name, lat, long, user, ident, city, length, width, altitude, frequency, flightTime, star) => {
	const msg = {
		'embed': {
			'title': `${name}`,
			'description': `${lat}, ${long}`,
			'color': 13991080,
			'footer': {
				'text': `Rating: ${star}`,
			},
			'thumbnail': {
				'url': 'https://upload.wikimedia.org/wikipedia/en/6/68/Microsoft_Flight_Simulator_logo_%282020%29.png',
			},
			'author': {
				'name': `${user}'s Flight Plan - ${type}`,
				'icon_url': 'https://i.imgur.com/vCauxU7.png',
			},
			'fields': [
				{
					'name': 'Ident',
					'value': `${ident}`,
					'inline': true,
				},
				{
					'name': 'City',
					'value': `${city}`,
					'inline': true,
				},
				{
					'name': 'Runway Length',
					'value': `${length}m`,
					'inline': true,
				},
				{
					'name': 'Runway Width',
					'value': `${width}m`,
					'inline': true,
				},
				{
					'name': 'Altitude',
					'value': `${altitude}m`,
					'inline': true,
				},
				{
					'name': 'Tower Frequency',
					'value': `${frequency}`,
					'inline': true,
				},
			],
		},
	};
	if (type.toLowerCase() === 'departure') {
		msg.content = `I have chosen this flight path for you, hope you like it 💗\nEstimated flight time: ${flightTime} hours\nYou can always ask for another one if you want`;
	}
	return msg;
};
