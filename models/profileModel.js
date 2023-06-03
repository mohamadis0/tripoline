const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    profileName: {
      type: String,
      required: true,
    },
    profileDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

profileSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'profile',
});

module.exports = mongoose.model('Profile', profileSchema);
