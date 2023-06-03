const express = require('express');
const driverController = require('../controllers/driverController');

const router = express.Router();

// Get all drivers
router.get('/', driverController.getAllDrivers);

// Create a driver
router.post('/', driverController.createDriver);

// Update a driver
router.put('/:driverId', driverController.updateDriver);

// Delete a driver
router.delete('/:driverId', driverController.deleteDriver);

module.exports = router;
