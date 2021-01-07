const mongoose = require('mongoose');

var ProblemSchema = new mongoose.Schema({
    contestId: Number,
    problemSetName: String,
    index: String,
    name: String,
    type: String,
    points: Number,
    rating: Number,
    tags: [String],
    hash: {
        type: String,
        unique: true
    }
});

mongoose.model('problem', ProblemSchema);