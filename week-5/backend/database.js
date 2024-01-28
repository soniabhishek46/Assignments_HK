const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://soniabhi1979:<YourPassword>@cluster0.6wt8ou3.mongodb.net/');

const card_schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 12
    },
    description: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    social: {
        type: [String],
        required: true,
        minLength: 1,
        maxLength: 10
    },
    interests: {
        type: [String],
        required: true,
        minLength: 1,
        maxLength: 10
    }
});

const Card = mongoose.model('Card', card_schema);

module.exports = {
    Card
}