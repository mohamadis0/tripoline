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

module.exports = { signup, loginUser };
