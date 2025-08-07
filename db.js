const mongoose = require('mongoose');

//Define the mongodb Connection URL
const mongoURL = 'mongodb://localhost:27017/hotels' //here hotels is a database name

//SetUp Mongodb Connection
mongoose.connect(mongoURL, {
 // useNewUrlParser: true,
  //useUnifiedTopology: true
})

//Get the default connection
//Mongoose maintain a default connection object representing the MongoDB connection
const db = mongoose.connection;

//define event Listener for Database connection
db.on('connected', () => {
  console.log("connected to Mongodb server!");
});

db.on('error', (err) => {
  console.log("Mongodb connection error:", err);
});

db.on('disconnected', () => {
  console.log("Mongodb disconnected!");
});

//Export the database connection
module.exports = db;