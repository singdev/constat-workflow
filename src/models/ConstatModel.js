const mongoose = require('mongoose')

const Schema = mongoose.Schema;

module.exports = mongoose.model('Constat1', new Schema({
    numero: { type: String, require: true },
    assurance: { type: String, require: true },
    isRead: { type: Boolean, default: false },
    lastUpdate: { type: Date, default: Date.now()}
}))