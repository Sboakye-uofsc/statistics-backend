const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(cors({
  origin: [
    'https://sboakye-uofsc.github.io',
    'http://localhost:3000',
    'http://localhost:3001'
  ]
}));

const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://shanyarock3_db_user:Cupcakes1$@cluster0.7g0yrbw.mongodb.net/gamereviews")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

const commentSchema = new mongoose.Schema({
  reviewId: String,
  body: String,
  username: {
    type: String,
    default: "Anonymous"
  },
  userId: String,
  parentId: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", commentSchema);


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


app.get("/api/Review", (request, respond) => {
	respond.send(reviewData);
});

app.get("/api/Review/:id", (request, respond) => {
	const reviewId = parseInt(request.params.id);
	const review = reviewData.find(r => r._id === reviewId);
	if (review) {
		respond.send(review);
	} else {
		respond.status(404).send({ error: "Review not found" });
	}
});

// Get comments for a review
app.get("/api/Review/:id/comments", async (request, respond) => {
	try {
		const reviewId = request.params.id;
		const comments = await Comment.find({ reviewId: reviewId });
		respond.send(comments);
	} catch (error) {
		console.error("Error fetching comments:", error);
		respond.status(500).send({ error: "Failed to fetch comments" });
	}
});

// Add a comment to a review
app.post("/api/Review/:id/comments", async (request, respond) => {
	try {
		const reviewId = request.params.id;
		
		// Create new comment document
		const newComment = new Comment({
			reviewId: reviewId,
			body: request.body.body,
			username: request.body.username || "Anonymous",
			userId: request.body.userId,
			parentId: request.body.parentId || null
		});
		
		const savedComment = await newComment.save();
		respond.send(savedComment);
	} catch (error) {
		console.error("Error creating comment:", error);
		respond.status(500).send({ error: "Failed to create comment" });
	}
});

// Update a comment
app.put("/api/Review/:id/comments/:commentId", async (request, respond) => {
	try {
		const commentId = request.params.commentId;
		const { body } = request.body;
		
		const updatedComment = await Comment.findByIdAndUpdate(
			commentId,
			{ body: body },
			{ new: true } // Returns the updated document
		);
		
		if (updatedComment) {
			respond.send(updatedComment);
		} else {
			respond.status(404).send({ error: "Comment not found" });
		}
	} catch (error) {
		console.error("Error updating comment:", error);
		respond.status(500).send({ error: "Failed to update comment" });
	}
});

// Delete a comment
app.delete("/api/Review/:id/comments/:commentId", async (request, respond) => {
	try {
		const commentId = request.params.commentId;
		
		const deletedComment = await Comment.findByIdAndDelete(commentId);
		
		if (deletedComment) {
			respond.send({ message: "Comment deleted" });
		} else {
			respond.status(404).send({ error: "Comment not found" });
		}
	} catch (error) {
		console.error("Error deleting comment:", error);
		respond.status(500).send({ error: "Failed to delete comment" });
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});