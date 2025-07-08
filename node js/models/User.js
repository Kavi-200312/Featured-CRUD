const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const UserSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: String,
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true });


const userModel = mongoose.model('User', UserSchema);
module.exports = userModel;