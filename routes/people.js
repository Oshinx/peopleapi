const router = require('express').Router();
const peopleController = require('../controller/personcontroller');






router.get("/",  peopleController.getPeople)
router.get("/:id", peopleController.getPerson);
router.post("/",   peopleController.createPerson);
router.put("/:id" , peopleController.updatePerson);
router.delete("/:id", peopleController.deletePerson);




module.exports = router;