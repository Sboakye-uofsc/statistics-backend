const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(cors());

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

app.listen(3001, () => {
	console.log("Server Backend is up");
});