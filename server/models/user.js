const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactNumber: String,
    clinicAddress: String,
    experience: Number,
    doctorType: String,
    city: String,
    state: String,
    country: String,
    doctorId: { type: String, unique: true }
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
