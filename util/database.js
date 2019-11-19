const mongoose = require('mongoose');

const USERNAME = 'mayank';
const PASSWORD = 'qwerty123'; // When entering your password, make sure that any special characters are URL encoded.
const DATABASE_NAME = 'posts_app';

const MONGODB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0-6egvr.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

const connectDB = (cb) => {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('MongoDB Connected!');
        cb();
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports = connectDB;