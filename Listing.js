const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    price: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Listing', ListingSchema);