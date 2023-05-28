const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Register a new user
router.post('/register', userController.signup);

// Login a user
router.post('/login', userController.loginUser);

module.exports = router;
