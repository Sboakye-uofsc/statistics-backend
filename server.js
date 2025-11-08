const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(cors());

app.get('/',(request,respond) => {
	respond.sendFile(__dirname + "/index.html");
});

app.get("/api/GameData", (request,respond) => {
	const cakes = [
		"pink cake", 
		"blue cake", 
		"yellow cake", 
		"purple cake"
	];
	respond.send(cakes);
});

app.listen(3001, () => {
	console.log("Server Backend is up");
});