const mongoose = require('mongoose');

const universitet = mongoose.Schema({
    name: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    video: {
        type: String, required: true
    }, 
    country: {
        type: mongoose.Schema.ObjectId,
        ref: "country",
        required: true
    },
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("universitet", universitet);