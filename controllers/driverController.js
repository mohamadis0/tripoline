const Driver = require('../models/driverModel');

// Get all drivers
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching drivers.' });
  }
};

// Create a driver
exports.createDriver = async (req, res) => {
  try {
    const driver = new Driver(req.body);
    const savedDriver = await driver.save();
    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the driver.' });
  }
};

// Update a driver
exports.updateDriver = async (req, res) => {
  try {
    const { driverId } = req.params;
    const updatedDriver = await Driver.findByIdAndUpdate(driverId, req.body, { new: true });
    res.json(updatedDriver);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while updating the driver.' });
  }
};

// Delete a driver
exports.deleteDriver = async (req, res) => {
  try {
    const { driverId } = req.params;
    await Driver.findByIdAndDelete(driverId);
    const drivers = await Driver.find();
    res.json({ message: 'Driver deleted successfully.', data: drivers });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while deleting the driver.' });
  }
};
