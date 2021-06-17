const mongoose = require("mongoose");
const fs = require("fs");

const uuid = require("uuid");
const mongooseFloat = require("mongoose-float");
const url = "mongodb+srv://daniboy:coleman@cluster0.p5jdk.mongodb.net/transport_db?retryWrites=true&w=majority";

const personSchema = new mongoose.Schema({
  uuid: {
    type: String,
  },
  survived: {
    type: Boolean,
  },
  passengerClass: {
   type:Number
  },
  name: {
    type: String,
  },
  sex: {
    type: String,
  },
  age: {
    type: Number,
  },
  siblingsOrSpousesAboard: {
    type: Number,
  },
  parentsOrChildrenAboard: {
    type: Number
  },
  fare: {
    type: mongooseFloat,
  },
});

const Person = mongoose.model("people", personSchema);


module.exports = Person;