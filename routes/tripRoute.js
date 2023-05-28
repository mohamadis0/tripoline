const express = require('express');
const tripController = require('../controllers/tripController');

const router = express.Router();

// Get all trips
router.get('/', tripController.getAllTrips);

// Create a trip
router.post('/', tripController.createTrip);

// Update a trip
router.put('trip/:tripId', tripController.updateTrip);

// Delete a trip
router.delete('trip/:tripId', tripController.deleteTrip);

module.exports = router;
