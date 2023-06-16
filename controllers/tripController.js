const Trip = require('../models/tripModel');

const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate('associatedBuses')
      .populate('tripLocation')
      .populate('tripDestination')
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching trips.' });
  }
};

const getSingleTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId)
      .populate('associatedBuses')
      .populate('tripLocation')
      .populate('tripDestination');

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found.' });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the trip.' });
  }
};

const getAllUniqueTrips = async (req, res) => {
  try {
    const uniqueTrips = await Trip.distinct('_id').exec();
    const trips = await Trip.find({ _id: { $in: uniqueTrips } })
      .populate('associatedBuses')
      .populate('tripLocation')
      .populate('tripDestination');
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching unique trips.' });
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



let sseClients = [];

const getUpdates = async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();

  sseClients.push(res);

  req.on('close', () => {
    sseClients = sseClients.filter((client) => client !== res);
  });
}

const sendSSEUpdate = (data) => {
  const formattedData = JSON.stringify(data);
  sseClients.forEach((client) => {
    client.write(`data: ${formattedData}\n\n`);
  });
};


const updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const updatedTrip = await Trip.findByIdAndUpdate(tripId, req.body, { new: true });

    if (!updatedTrip) {
      return res.status(404).json({ error: 'Trip not found.' });
    }

    sendSSEUpdate(updatedTrip);
    return res.json(updatedTrip);
  } catch (error) {
    console.error('An error occurred while updating the trip:', error);
    return res.status(500).json({ error: 'An error occurred while updating the trip.' });
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


module.exports = { getAllTrips, createTrip, updateTrip, deleteTrip, getUpdates, getSingleTrip,getAllUniqueTrips };
