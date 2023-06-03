const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    DriverName: {
        type: String,
        required: true
    },
    DriverPhone: {
        type: String,
        required: true
    },
    DriverAge: {
        type: Number,
        required: true
    },
    DriverCard: {
        type: String,
        required: true
    },
    DriverCardId: {
        type: String,
        required: true
    },
    DriverAddress: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Driver', driverSchema);
