const mongoose = require('mongoose');

const video = mongoose.Schema({
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

module.exports = mongoose.model("video", video);