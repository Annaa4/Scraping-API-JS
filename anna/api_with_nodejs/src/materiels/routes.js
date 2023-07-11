const { Router } = require('express');
const {
  getServiceMateriels,
  getServiceMaterielsById,
  addServiceMateriel,
  removeServiceMateriel,
  updateServiceMateriel
} = require('./controller');

const router = Router();

// Routes pour le service "materiel"
router.get('/materiel', getServiceMateriels('equipements'));
router.get('/materiel/:id', getServiceMaterielsById('equipements'));
router.post('/materiel', addServiceMateriel('equipements'));
router.delete('/materiel/:id', removeServiceMateriel('equipements'));

// Routes pour le service "mode"
router.get('/mode', getServiceMateriels('mode'));
router.get('/mode/:id', getServiceMaterielsById('mode'));
router.post('/mode', addServiceMateriel('mode'));
router.delete('/mode/:id', removeServiceMateriel('mode'));
router.put('/mode/:id', updateServiceMateriel('mode'));

module.exports = router;
