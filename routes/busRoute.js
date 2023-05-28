const express = require('express');
const busController = require('../controllers/busController');

const router = express.Router();


router.get('/', busController.getAllBuses);


router.post('/createBus', busController.addBus);


router.put('bus/:busId', busController.updateBus);


router.delete('bus/:busId', busController.deleteBus);

module.exports = router;
