const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Destination = new Schema({
    name: { type: String },
    description: { type: String },
    img: [],
    area: { type: String },
    slug: { type: String, slug: "name", unique: true }


}, {
    timestamps: true,
});

module.exports = mongoose.model('Destination', Destination);