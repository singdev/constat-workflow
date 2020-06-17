const mongoose = require('mongoose')

const Schema = mongoose.Schema;

module.exports = mongoose.model('Assurance', new Schema({
    smallName: { type: String, unique: true, require: true },
    name: { type: String, unique: true, require: true },
    email: { type: String },
    logo: { type: String },
    isActive: { type: Boolean, default: false },
    lastUpdate: { type: Date, default: Date.now()}
}))