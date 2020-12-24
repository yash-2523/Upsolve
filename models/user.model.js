const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    email: {
        type: String,
        required: true
    }
});

mongoose.model('user', UserSchema);