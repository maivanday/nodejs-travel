const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

// const USER_TYPES = {
//     ADMIN: 1,
//     REGULAR: 2
// }

const User = new Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    // userType: { type: Schema.Types.Number, default: USER_TYPES.REGULAR, require: true }
}, {
    timestamps: true,
});

// module.exports.userModel = userModel;
// module.exports.USER_TYPES = USER_TYPES;
module.exports = mongoose.model('User', User);