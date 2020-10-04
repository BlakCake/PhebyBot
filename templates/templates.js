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
				'value': '170 cm',
				'inline': true,
			},
			{
				'name': 'Weight',
				'value': '122 lb',
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

exports.FlightPlan = (departAirportName, departLat, departLong, user, departIdent, departCity, departLength, departWidth, departAltitude, departFrequency, arrivalAirportName, arrivalLat, arrivalLong, arrivalIdent, arrivalCity, arrivalLength, arrivalWidth, arrivalAltitude, arrivalFrequency) => {
	return {
		'content': 'I have chosen this flight path for you, hope you like it 💗\nYou can always ask for another one if you want',
		'embeds': [{
			'title': `${departAirportName}`,
			'description': `${departLat},${departLong}`,
			'color': 13991080,
			'footer': {
				'text': 'Rating: ⭐⭐⭐',
			},
			'thumbnail': {
				'url': 'https://upload.wikimedia.org/wikipedia/en/6/68/Microsoft_Flight_Simulator_logo_%282020%29.png',
			},

			'author': {
				'name': `${user}'s Flight Plan - Departure`,
				'icon_url': 'https://i.imgur.com/vCauxU7.png',
			},
			'fields': [
				{
					'name': 'Ident',
					'value': `${departIdent}`,
					'inline': true,
				},
				{
					'name': 'City',
					'value': `${departCity}`,
					'inline': true,
				},
				{
					'name': 'Runway Length',
					'value': `${departLength}m`,
					'inline': true,
				},
				{
					'name': 'Runway Width',
					'value': `${departWidth}m`,
					'inline': true,
				},
				{
					'name': 'Altitude',
					'value': `${departAltitude}`,
					'inline': true,
				},
				{
					'name': 'Tower Frequency',
					'value': `${departFrequency}Hz`,
					'inline': true,
				},
			],
		},
		{
			'title': `${arrivalAirportName}`,
			'description': `${arrivalLat},${arrivalLong}`,
			'color': 13991080,
			'footer': {
				'text': 'Rating: ⭐⭐⭐',
			},
			'thumbnail': {
				'url': 'https://upload.wikimedia.org/wikipedia/en/6/68/Microsoft_Flight_Simulator_logo_%282020%29.png',
			},

			'author': {
				'name': `${user}'s Flight Plan - Departure`,
				'icon_url': 'https://i.imgur.com/vCauxU7.png',
			},
			'fields': [
				{
					'name': 'Ident',
					'value': `${arrivalIdent}`,
					'inline': true,
				},
				{
					'name': 'City',
					'value': `${arrivalCity}`,
					'inline': true,
				},
				{
					'name': 'Runway Length',
					'value': `${arrivalLength}m`,
					'inline': true,
				},
				{
					'name': 'Runway Width',
					'value': `${arrivalWidth}m`,
					'inline': true,
				},
				{
					'name': 'Altitude',
					'value': `${arrivalAltitude}`,
					'inline': true,
				},
				{
					'name': 'Tower Frequency',
					'value': `${arrivalFrequency}Hz`,
					'inline': true,
				},
			],
		},
		] };
};
