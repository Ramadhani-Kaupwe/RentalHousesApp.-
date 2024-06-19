const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rental-app', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
const listingsRouter = require('./routes/listings');
app.use('/api/listings', listingsRouter);

app.listen(3000, () => console.log('Server started on port 3000'));