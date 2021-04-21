const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;



const User = new Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    roleId: { type: String, default: 2 },

}, {
    timestamps: true,
});


module.exports = mongoose.model('User', User);