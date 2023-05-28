const Bus = require('../models/BusModel');

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching buses.' });
  }
};


const addBus = async (req, res) => {
  try {
    const bus = new Bus(req.body);
    const savedBus = await bus.save();
    res.status(201).json(savedBus);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while adding the bus.' });
  }
};


const updateBus = async (req, res) => {
  try {
    const { busId } = req.params;
    const updatedBus = await Bus.findByIdAndUpdate(busId, req.body, { new: true });
    res.json(updatedBus);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while updating the bus.' });
  }
};


const deleteBus = async (req, res) => {
  try {
    const { busId } = req.params;
    await Bus.findByIdAndDelete(busId);
    res.json({ message: 'Bus deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while deleting the bus.' });
  }
};

module.exports = { getAllBuses, addBus, updateBus, deleteBus };
