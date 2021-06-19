const mongoose = require("mongoose");
const peopleData = require("./titanic.json");
const uuid = require('uuid');
const Person = require('./model/Person');
const { populate } = require("./model/Person");
require("dotenv").config();

const sampleData = [
    {
		"passengerClass": 1,
		"name": "Mrs. John Bradley (Florence Briggs Thayer) Cumings",
		"sex": "female",
		"age": 38,
		"siblingsOrSpousesAboard": 1,
		"parentsOrChildrenAboard": 0,
		"fare": 71.2833,
		"survived": true
	},{
		"passengerClass": 3,
		"name": "Miss. Laina Heikkinen",
		"sex": "female",
		"age": 26,
		"siblingsOrSpousesAboard": 0,
		"parentsOrChildrenAboard": 0,
		"fare": 7.925,
		"survived": true
	},{
		"passengerClass": 1,
		"name": "Mrs. Jacques Heath (Lily May Peel) Futrelle",
		"sex": "female",
		"age": 35,
		"siblingsOrSpousesAboard": 1,
		"parentsOrChildrenAboard": 0,
		"fare": 53.1,
		"survived": true
	},{
		"passengerClass": 3,
		"name": "Mr. William Henry Allen",
		"sex": "male",
		"age": 35,
		"siblingsOrSpousesAboard": 0,
		"parentsOrChildrenAboard": 0,
		"fare": 8.05,
		"survived": false
	},{
		"passengerClass": 3,
		"name": "Mr. James Moran",
		"sex": "male",
		"age": 27,
		"siblingsOrSpousesAboard": 0,
		"parentsOrChildrenAboard": 0,
		"fare": 8.4583,
		"survived": false
	}
]

async function  createDBConnection(){

   try{
  const dbConn =  await  mongoose
    .connect(process.env.DB_URL_DEV, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    })
    return dbConn;
   }
     catch (err){
         console.log(err);
     }

}


async function pupulateDB (){
    const isDbConnected = await createDBConnection();
    console.log('before saved');
     await peopleData.forEach(async (person) => {
     person.uuid = uuid.v4();
     const newPerson = new Person(person);
     const savedPerson = await newPerson.save();
 
    })

    console.log('finished');
}
pupulateDB()
