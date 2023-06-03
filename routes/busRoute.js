const express = require('express');
const busController = require('../controllers/busController');

const router = express.Router();


router.get('/', busController.getAllBuses);


router.post('/', busController.createBus);

router.get('/:id', busController.getBusById);


router.put('/:id', busController.updateBus);


router.delete('/:id', busController.deleteBus);

module.exports = router;
