const mongoose = require('mongoose');

var FeedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: true
    }

});

mongoose.model('feedback', FeedbackSchema);