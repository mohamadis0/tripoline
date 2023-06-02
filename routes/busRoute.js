const express = require('express');
const busController = require('../controllers/busController');

const router = express.Router();


router.get('/', busController.getAllBuses);


router.post('/createBus', busController.addBus);


router.put('/:busId', busController.updateBus);


router.delete('/:busId', busController.deleteBus);

module.exports = router;
