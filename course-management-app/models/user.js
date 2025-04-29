const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    coursesEnrolled: [
        {
            courseName: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);