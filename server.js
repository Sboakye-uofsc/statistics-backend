const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(cors({
  origin: [
    'https://sboakye-uofsc.github.io',
    'http://localhost:3000',
    'http://localhost:3001'
  ]
}));

app.get('/',(request,respond) => {
	respond.sendFile(__dirname + "/index.html");
});

app.get("/api/GameData", (request,respond) => {
	const data = [
		{
			"label": "Aug",
			"revenue": 9000000, 
			"gameplay": 937500
		},{
			"label": "Sep",
			"revenue": 15000000,  
			"gameplay": 1200000
		},{
			"label": "Oct",
			"revenue": 30000000,  
			"gameplay": 2800000
		},{
			"label": "Nov",
			"revenue": 22000000,  
			"gameplay": 1800000
		},{
			"label": "Dec",
			"revenue": 45000000,  
			"gameplay": 3750000
		}
	];
	respond.send(data);
});

app.get("/api/Review", (request,respond) => {
	const reviewData = [
		{
			"_id": 1,
			"name_game": "Peak",
			"released": "2025-16-06",
			"img": "/img/peak.png",
			"username": "Unicakes753",
			"date_respond": "2025-20-09",
			"description": "Ya'll I really have a obsession with this game",
			"rating": 5,
			"reviews":["Since the first time I play this time, I fell in love with it"]
		},
		{
			"_id": 2,
			"name_game": "Castle Crashers",
			"released": "2012-26-09",
			"img": "/img/castle.png",
			"username": "YOYLL347",
			"date_respond": "2024-19-05",
			"description": "This bring me back to the good old days",
			"rating": 4.5,
			"reviews":["I remember when this game first came out on my birshday and my mom got it for me as a gift"]
		},
		{
			"_id": 3,
			"name_game": "Runescape Dragonwilds",
			"released": "2025-15-04",
			"img": "/img/dragon.png",
			"username": "Maical_Moooon",
			"date_respond": "2025-15-04",
			"description": "The game is not too bad, I will definitely play with friends",
			"rating": 4,
			"reviews":["The game is cool. Really like the combat in this game"]
		},
		{
			"_id": 4,
			"name_game": "Marvel Rivals",
			"released": "2024-05-12",
			"img": "/img/rivals.png",
			"username": "Rivals_Katch",
			"date_respond": "2024-09-12",
			"description": "I will definitely play with friends",
			"rating": 4.9,
			"reviews":["The game is cool. Really like the combat in this game"]
		}
	];
	respond.send(reviewData);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});