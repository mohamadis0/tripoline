const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();

const busRoute = require('./routes/busRoute');
const tripRoute = require('./routes/tripRoute');
const userRoute = require('./routes/userRoute');
const profileRoute = require('./routes/profileRoute');
const driverRoute = require('./routes/driverRoute');
const stationRoute = require('./routes/stationRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.use('/api/buses', busRoute);
app.use('/api/trips', tripRoute);
app.use('/api/profiles', profileRoute);
app.use('/api/users', userRoute);
app.use('/api/drivers', driverRoute);
app.use('/api/stations', stationRoute);


mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
