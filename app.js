const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const MONGODB_URI = "mongodb+srv://sergiocami84:Msg--300183@cluster0.mo4mc0w.mongodb.net/express-mongoose-recipes-dev";
main().catch((err) => console.log(err));

async function main() {
    mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', async (req, res) => {
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body;

    const newRecipe = new Recipe({
        title,
        instructions,
        level,
        ingredients,
        image: image || "https://images.media-allrecipes.com/images/75131.jpg",   
        duration: duration || 0,
        isArchived: isArchived || false,
        created: created || Date.now()
    });

    try {
        await newRecipe.save(); 
        res.status(201).json({ recipe: newRecipe });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get('/recipes', async (req, res) => {
    try {
            const recipes = await Recipe.find({});
            res.status(200).json({ recipes });

    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
            const recipes = await Recipe.find({ _id: id });
            res.status(200).json({ recipes });

    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (req, res) => {    
    const { id } = req.params;
    try {
            const recipes = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ recipes });

    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', async (req, res) => {    
    const { id } = req.params;
    try {
            const recipes = await Recipe.findByIdAndDelete(id);
            res.status(200).json({ recipes });

    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));




}



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
