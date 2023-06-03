const express = require('express');
const mongoose = require('mongoose');

const busRoute = require('./routes/busRoute');
const tripRoute = require('./routes/tripRoute');
const userRoute = require('./routes/userRoute');
const profileRoute = require('./routes/profileRoute');
const driverRoute = require('./routes/driverRoute');
const app = express();

const cors = require('cors');
require('dotenv').config();


app.use(express.json());
app.use(cors());


app.use('/api/buses', busRoute);
app.use('/api/trips', tripRoute);
app.use('/api/profiles', profileRoute);
app.use('/api/users', userRoute);
app.use('/api/drivers',driverRoute)



mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log('mongoDB connected'))
    .catch((err) => console.log(err));




app.listen(process.env.PORT, () => {

    console.log(`server is running on http://localhost:${process.env.PORT}`)

})