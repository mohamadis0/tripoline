const Trip = require('../models/tripModel');

const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate('associatedBuses')
      .populate('tripLocation')
      .populate('tripDestination')
      .populate('stations');
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching trips.' });
  }
};

const createTrip = async (req, res) => {
  try {
    const startDate = new Date(req.body.departureTime);
    const endDate = new Date(req.body.arrivalTime);
    const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // duration in days

    const tripPromises = [];

    if (duration < 1) {
      const trip = new Trip(req.body);
      tripPromises.push(trip.save());
    } else {
      for (let i = 0; i < duration; i++) {
        const newTrip = new Trip(req.body);
        newTrip.departureTime = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000)); // set departure time for each day
        newTrip.arrivalTime = new Date(startDate.getTime() + ((i + 1) * 24 * 60 * 60 * 1000)); // set arrival time for each day
        tripPromises.push(newTrip.save());
      }
    }

    const createdTrips = await Promise.all(tripPromises);
    res.status(201).json(createdTrips);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the trip.' });
  }
};




// const getBatchTrips = async (req, res) => {
//   try {
//     const trips = await Trip.find()
//       .populate('associatedBuses')
//       .populate('tripLocation')
//       .populate('tripDestination')
//       .populate('stations');
//     const batchTrips = [];

//     trips.forEach(trip => {
//       const startDate = trip.departureTime;
//       const endDate = trip.arrivalTime;
//       const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // duration in days

//       for (let i = 0; i < duration; i++) {
//         batchTrips.push(trip);
//       }
//     });

//     res.json(batchTrips);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching batch trips.' });
//   }
// };

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
    const trips = await Trip.find();
    res.json({ message: 'Trip deleted successfully.', data: trips });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while deleting the trip.' });
  }
};

module.exports = { getAllTrips, createTrip, updateTrip, deleteTrip };
