const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({

    tripName: {
        type: String,
        required: true
    },
    tripLocation: {
        type: String,
        required: true
    },
    tripDestination: {
        type: String,
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
    // associatedBus: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Bus'
    //     }

    // ]
}
    , {
        timestamps: true,
    });


module.exports = mongoose.model('Trip', tripSchema);
