const Profile = require('../models/profileModel');
const User = require('../models/userModel');
// Get all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new profile
exports.createProfile = async (req, res) => {
  try {
    const { profileName, profileDescription } = req.body;
    const newProfile = new Profile({
      profileName,
      profileDescription,
    });
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all profiles with users
exports.getProfilesWithUsers = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('users', '-password -__v');
    const profilesWithUsers = profiles.map(profile => {
      return {
        _id: profile._id,
        profileName: profile.profileName,
        profileDescription: profile.profileDescription,
        users: profile.users.map(user => {
          return {
            _id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone
          };
        })
      };
    });

    res.status(200).json(profilesWithUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};



// Update a profile by ID
exports.updateProfile = async (req, res) => {
  try {
    const { profileName, profileDescription } = req.body;
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        profileName,
        profileDescription,
      },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a profile by ID
exports.deleteProfile = async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndRemove(req.params.id);
    if (!deletedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
