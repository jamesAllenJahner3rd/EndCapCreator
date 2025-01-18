const express = require('express');
const app = express();
const mongoose = require("mongoose");
// const passport = require("passport");
// const session = require("express-session");
// const MongoStore = require('connect-mongo')
// const flash = require("express-flash");
//help with logging issues
const logger = require("morgan");
//Allows the use  of put and delete in forms.
const methodOverride = require("method-override");


const endcapRoutes = require('./routes/endcapRoutes');
//const profileRoutes = require('./routes/profileRoutes');
//const loginRoutes = require('./routes/loginRoutes');
//const postRoutes = require("./routes/postRoutes");

//Defines a paths to the env file to hide important info
require('dotenv').config({ path: './config/.env' });
//Connect to Database
const connectDB = require("./config/database");

const PORT = process.env.PORT || 8000;


//Define the folder that can be available to the website
app.use(express.static('public'));
//used the parse the 'Body" from the data from the client-side
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Setup Sessions - stores in MongoDB
/*app.use(
    session({
        sercet:"",
        resave:false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);*/
// Passport middleware for verifing users
app.use(passport.initialize());
app.use(passport.session());
//This is the main route for the endcap app to orgranize the request.
app.use('/', endcapRoutes);

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});


// Listens to activate teh server
app.listen(PORT, () => {
    console.log(`The server is running on ${PORT || 8000}`);
});
