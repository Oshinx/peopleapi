const  validations = require('../validation/validations');
const Person = require('../model/Person');
const uuid = require('uuid');
const _ = require('lodash');
const logger = require('./logger/index');


module.exports.getPerson = async (req, res) => {
    const personId = req.params.id;
    if (!personId)
      return res.status(400).json({
        error: true,
        msg: "Bad Request",
      });
 
      try {
        let person = await Person.find({uuid: personId})
                             .lean()
                             .select({
                                       _id:0,
                                      __v: 0,
                                     });
        res.status(200).json(person);
      } catch (err) {  
        logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).json({
          error: true,
          msg: "server error",
        });
      }

 
}

module.exports.getPeople = async (req, res) => {
    const pageNumber = parseInt(req.query.pageNumber);

    if (!pageNumber)
    return res.status(400).json({
      error: true,
      msg: "Bad Request",
    });

  const pageSize = 20;
  let skipvalue = (pageNumber - 1) * pageSize;
  try {
    let people = await Person.find()
                          .lean()
                          .skip(skipvalue)
                          .limit(pageSize)
                          .select({
                                     _id : 0,
                                    __v: 0,
                                  });
 
    res.status(200).json(people);
  } catch (err) {
    logger.error(`500 || ${err} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`); 
    res.status(500).json({
      error: true,
      msg: "server error",
    });
  }
    
}


module.exports.createPerson = async (req, res) => {
        
       const personInput = {
        uuid: uuid.v4(),
        passengerClass: req.body.passengerClass,
        name: req.body.name,
        sex: req.body.sex === 'male' || 'female' ? req.body.sex : undefined,
        age: parseInt(req.body.age),
        siblingsOrSpousesAboard: parseInt(req.body.siblingsOrSpousesAboard),
        parentsOrChildrenAboard: parseInt(req.body.parentsOrChildrenAboard),
        fare: parseFloat(req.body.fare),
        survived: req.body.survived == 'true' ? true : false
       }
       console.log((req.body.sex === ('male' || 'female') ? req.body.sex : undefined), 'test');
       console.log(req.body);
       const isPersonValid = await validations.validatePersonInput(personInput);
         console.log(isPersonValid);
       if (isPersonValid.errorStatus) {
        return res.status(400).json({
          error: true,
          msg: isPersonValid.error,
        });
      } else {
      
        try {
        const newPerson =  new Person(personInput);
        const dbResponse = await newPerson.save();
        const personResponse = _.pick(dbResponse,["_id","uuid","passengerClass","name","sex","age","siblingsOrSpousesAboard","parentsOrChildrenAboard","fare", "survived"]);
        res.status(201).json(personResponse);

        } catch (err) {
          logger.error(`500 || ${err} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          res.status(500).json({
            error: true,
            msg: "server error",
          });
        }
      }

}


module.exports.updatePerson = async (req, res) => {
  const personId = req.params.id;
  if (!personId)
    return res.status(400).json({
      error: true,
      msg: "Bad Request",
    });
  const doesPersonExist = await Person.find({uuid:personId})
                                      .lean();
  if(doesPersonExist <= 0){
    return res.status(404).json({
      error: true,
      msg: "Resource Does not Exist",
    })
  }

  const updatPersonInput = {
        passengerClass: req.body.passengerClass,
        name: req.body.name,
        sex: req.body.sex.toLowerCase() === ('male' || 'female') ? req.body.sex : undefined,
        age: parseInt(req.body.age),
        siblingsOrSpousesAboard: parseInt(req.body.siblingsOrSpousesAboard),
        parentsOrChildrenAboard: parseInt(req.body.parentsOrChildrenAboard),
        fare: parseFloat(req.body.fare),
        survived: req.body.survived == 'true' ? true : false
  }
   const isPersonValid =  await validations.validatePersonInput(updatPersonInput);

   if (isPersonValid.errorStatus) {
    return res.status(400).json({
      error: true,
      msg: isPersonValid.error,
    });
  } else {
  
    try {
    const updatePerson =  new Person(updatPersonInput);
    let dbUpdatedUser = await Person.updateOne(
      { uuid: personId },
      {
        $set: updatPersonInput,
      }
    );
   
    res.status(201).json();

    } catch (err) {
      logger.error(`500 || ${err} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).json({
        error: true,
        msg: "server error",
      });
    }
  }
}
module.exports.deletePerson = async (req, res) => {

  try {
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: true,
        msg: "uuid required",
      });
    } else {
      let personFound = await Person.find({ uuid: id });

      if (personFound.length > 0) {
        let result = await Person.deleteOne({uuid: id });

        res.status(200).json({
          message: "Delete was successful",
        });
      } else {
        res.status(404).json({
          message: " User does not exist",
        });
      }
    }
  } catch (err) {
    logger.error(`500 || ${err} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.status(500).json({
      message: "server error",
    });
  }
};
