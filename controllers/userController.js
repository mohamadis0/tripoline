const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signup = async (req, res) => {
  const {
    username,
    email,
    phone,
    password,
    passwordConfirm,
    profileId,
  } = req.body;
  try {
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(409).json({ message: 'The email is already in use' });
    }
    const user = await User.findOne({ phone });
    if (user) {
      return res.status(409).json({ message: 'The phone is already in use' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'The email is not valid' });
    }
    if (password !== passwordConfirm) {
      return res
        .status(400)
        .json({ message: "password and passwordConfirm don't match!!" });
    }

    const foundProfile = await Profile.findById(profileId);
    if (!foundProfile) {
      return res.status(400).json({ message: 'Invalid profile' });
    }

    const newUser = await User.create({
      username,
      email,
      phone,
      password,
      passwordConfirm,
      profileId,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.checkPassword(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('profileId');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Run model validators on the updated fields
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};



module.exports = { signup, loginUser,getAllUsers,deleteUser,updateUser};
