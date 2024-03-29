const Trip = require('../models/tripModel');



const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching trips.' });
  }
};


const createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the trip.' });
  }
};


const updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const updatedTrip = await Trip.findByIdAndUpdate(tripId, req.body, { new: true });
    res.json(updatedTrip);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while updating the trip.' });
  }
};


const deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    await Trip.findByIdAndDelete(tripId);
    res.json({ message: 'Trip deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while deleting the trip.' });
  }
};

module.exports = { getAllTrips, createTrip, updateTrip, deleteTrip };
