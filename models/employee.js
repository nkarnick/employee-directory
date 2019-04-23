const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define Employee Schema
const employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cell: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    }
})

// Export the model
module.exports = mongoose.model('Employee', employeeSchema)
