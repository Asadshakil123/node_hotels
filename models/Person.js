const mongoose = require('mongoose');

//Define a person Schame
const personSchema = new mongoose.Schema({
  name: {
    type : String,
    required : true
  },
  age : {
    type : Number
  },
  work : {
    type : String,
    enum : ["Chef", "waiter", "manager"],
    required : true
  },
  mobile:{
    type: String,
    required : true
  },
  email: {
    type: String,
    required : true,
    unique: true
  },
  address:{
    type : String
  },
  salary : {
    type: Number,
    required : true
  }
});

//Create person Model (means person data)
const Person = mongoose.model('Person', personSchema);
module.exports = Person;