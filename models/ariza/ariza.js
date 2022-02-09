const mongoose = require('mongoose');

const ariza = mongoose.Schema({
    file: {
         type: String, required: true
    },
    universitet: { 
        type: mongoose.Schema.ObjectId,
        ref: "universitet",
        required: true,
        index: true
    },
    yonalish: {
        type: mongoose.Schema.ObjectId,
        ref: "yonalish",
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: [
            "Tekshirilgan", 
            "Tekshirilmagan"
        ],
        default:  "Tekshirilmagan"
    },
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("ariza", ariza);