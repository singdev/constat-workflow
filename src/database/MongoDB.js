const mongoose = require('mongoose');

const host = process.env.MONGODB_HOST || '127.0.0.1';

module.exports = (dbName) => {
    console.log('Connexion avec mongoDB');
    mongoose.connect(`mongodb://${host}:27018/` + dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

    mongoose.connection.on('error', (err) => {
        console.log(err);
    })
}