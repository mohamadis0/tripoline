const mongoose = require('mongoose');


const stationSchema = new mongoose.Schema({

    stationName: {
        type: String,
        required: true
    },
    stationStatus: {
        type: String,
        enum: ['arrived', 'passed', 'waiting'],
    },
    stationNumber: {
        type: String,
        required: true,
    },
    stationTime: {
        type: String,
        required: true
    },
    associatedTrip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Station', stationSchema);