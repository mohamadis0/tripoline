const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    Busname: {
        type: String,
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true
    },
    busDriver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true,
    }
},

 {
    timestamps: true
 }
);



module.exports = mongoose.model('Bus', busSchema);
