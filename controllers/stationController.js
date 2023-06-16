const Station = require('../models/stationModel');



exports.createStation = async (req, res) => {
  try {
    const station = new Station(req.body);
    const savedStation = await station.save();
    res.status(201).json(savedStation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find().populate('associatedTrip');
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStationsByTripId = async (req, res) => {
  const { tripId } = req.params;

  try {
    const stations = await Station.find({ associatedTrip: tripId });
    res.json(stations);
  } catch (error) {
    console.error('Error fetching stations:', error);
    res.status(500).json({ error: 'Failed to fetch stations' });
  }
};
