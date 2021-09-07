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
    name: {
        type:String,
        
    },
    daily_Que: {type: String, ref: 'problem'},
    upsolve_Que: {type: String, ref: 'problem'},
    email: {
        type: String,
    },
    streak: {
        type: Number,
        default: 0
    },
    country: {
        type: String,
        default: ""
    },
    institution: {
        type: String,
        default: ""
    },
    dailyQuestion: {
        type: Boolean,
        default: false
    },
    UpsolveQuestion: {
        type: Number,
        default: 0
    },
    UpsolveStreak: {
        type: Object,
        default:{}
    },
    bio: String
});

mongoose.model('user', UserSchema);