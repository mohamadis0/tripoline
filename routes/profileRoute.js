const express = require('express');
const router = express.Router();


const profileController = require('../controllers/profileController');

// Routes
router.get('/', profileController.getAllProfiles);
router.get('/profileUsers', profileController.getProfilesWithUsers);
router.post('/', profileController.createProfile);
router.get('/:id', profileController.getProfileById);
router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

module.exports = router;
