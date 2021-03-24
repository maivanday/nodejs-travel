const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Province = new Schema({
    name: { type: String },
    description: { type: String },
    img: { type: String },
    slug: { type: String, slug: "name", unique: true }


}, {
    timestamps: true,
});


// add plugin

mongoose.plugin(slug);
Province.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Province', Province);