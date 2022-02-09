const mongoose = require('mongoose');

const yonalish = mongoose.Schema({
    name: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    universitet: {
        type: mongoose.Schema.ObjectId,
        ref: "universitet",
        required: true,
        index: true
    },
    
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("yonalish", yonalish);