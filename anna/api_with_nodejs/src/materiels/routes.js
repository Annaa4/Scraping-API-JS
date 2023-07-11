const { Router } = require('express');

const router = Router();
const controller = require('./controller')
// Routes pour le service "materiel"
router.get('/:table', controller.getServices);
router.get('/:table/:id', controller.getServiceMaterielsById);
router.post('/:table', controller.AddElementService);
router.delete('/:table/:id', controller.removeServiceMateriel);
router.put('/:table/:id', controller.updateServiceMateriel);

// // Routes pour le service "mode"
// router.get('/mode', getServiceMateriels('mode'));
// router.get('/mode/:id', getServiceMaterielsById('mode'));
// router.post('/mode', addServiceMateriel('mode'));
// router.delete('/mode/:id', removeServiceMateriel('mode'));
// router.put('/mode/:id', updateServiceMateriel('mode'));

module.exports = router;
