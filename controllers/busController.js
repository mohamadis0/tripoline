const Bus = require('../models/busModel');

// Get all buses
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate('busDriver');
    res.json(buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new bus
exports.createBus = async (req, res) => {
  try {
    const { Busname, numberOfSeats, busDriver } = req.body;
    const newBus = new Bus({
      Busname,
      numberOfSeats,
      busDriver
    });
    const savedBus = await newBus.save();
    res.status(201).json(savedBus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single bus by ID
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a bus by ID
exports.updateBus = async (req, res) => {
  try {
    const { Busname, numberOfSeats, busDriver } = req.body;
    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      {
        Busname,
        numberOfSeats,
        busDriver
      },
      { new: true }
    );
    if (!updatedBus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json(updatedBus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a bus by ID
exports.deleteBus = async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndRemove(req.params.id);
    if (!deletedBus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
