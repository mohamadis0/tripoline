const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');

// Create a new station
router.post('/', stationController.createStation);

// Get all stations
router.get('/', stationController.getAllStations);

// Get a single station by ID
router.get('/:id', stationController.getStationById);

// Update a station by ID
router.put('/:id', stationController.updateStation);

// Delete a station by ID
router.delete('/:id', stationController.deleteStation);

module.exports = router;
