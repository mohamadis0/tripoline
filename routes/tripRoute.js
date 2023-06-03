const express = require('express');
const tripController = require('../controllers/tripController');

const router = express.Router();

// Get all trips
router.get('/', tripController.getAllTrips);

// Create a trip
router.post('/', tripController.createTrip);

// Update a trip
router.put('/:tripId', tripController.updateTrip);

// Delete a trip
router.delete('/:tripId', tripController.deleteTrip);

// Get batch trips
router.get('/batch', tripController.getBatchTrips);

module.exports = router;
