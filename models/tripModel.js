const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({

    tripName: {
        type: String,
        required: true
    },
    tripLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    tripDestination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    tripStatus: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'canceled'],
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    estimatedDeparture: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    estimatedArrival: {
        type: Date,
        required: true
    },

    tripLine: {
        type: String,
        required: true
    },
    associatedBuses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bus',
            required: true
        }

    ],
}
    , {
        timestamps: true,
    });


module.exports = mongoose.model('Trip', tripSchema);
