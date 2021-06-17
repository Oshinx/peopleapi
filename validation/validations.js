const Joi = require("@hapi/joi");
const validationSchema = require('./validationSchema');


let validations = {};


validations.validatePersonInput = async function (person) {
    let result = {};
  
    try{
       
      const { error, value } = await validationSchema.personValidatationSchema.validateAsync({
        passengerClass: person.passengerClass,
        name: person.name,
        sex: person.sex,
        age: person.age,
        siblingsOrSpousesAboard: person.siblingsOrSpousesAboard,
        parentsOrChildrenAboard: person.parentsOrChildrenAboard,
        fare: person.fare,
        survived: person.survived
      });
      if (error) {
        result.errorStatus = true;
       console.log("test");
        result.error = error.details[0].message;
  
        return result;
      } else {
        result.errorStatus = false;
        return result;
      }
    }
    catch(err){
      result.errorStatus = true;
      result.error = err.details[0].message;
      return result;
    }
  
  };


  module.exports = validations