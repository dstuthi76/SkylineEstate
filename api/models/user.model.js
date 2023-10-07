import mongoose from "mongoose";
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        validate: {
            validator: function (value) {
                // Validate that mobileNumber is a 10-digit number
                return /^[0-9]{10}$/.test(value);
            },
            message: 'Mobile number must be a 10-digit number',
        },
    },
    address: {
        type: String,
    },
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    mandal: {
        type: String,
    },
    pincode: {
        type: String,
        validate: {
            validator: function (value) {
                // Validate that pincode is a 6-digit number
                return /^[0-9]{6}$/.test(value);
            },
            message: 'Pincode must be a 6-digit number',
        },
    }, timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
