const Joi = require("joi");

module.exports.personValidatationSchema = Joi.object({  
    passengerClass: Joi.number().strict().required(),
    name: Joi.string().required(),
    sex: Joi.string().required(),
    age: Joi.number().strict().required(),
    siblingsOrSpousesAboard: Joi.number().strict().required(),
    parentsOrChildrenAboard: Joi.number().strict().required(),
    fare: Joi.number().strict().required(),
    survived: Joi.boolean().required()
  });


