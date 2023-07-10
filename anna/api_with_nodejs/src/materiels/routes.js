const { Router } = require('express');
const controller = require('./controller');

const router = Router();

// router.get('/', (req, res) => {
//     res.send("utilisation de la route de l\tapi");
// })
router.get("/", controller.getMateriels);  
router.post("/", controller.addMateriel);
router.get("/:id", controller.getMaterielsById);
router.delete("/:id", controller.removeMateriels);



module.exports = router; 