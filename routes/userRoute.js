const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/register', userController.signup);
router.put('/', userController.updateUser);

router.post('/login', userController.loginUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
