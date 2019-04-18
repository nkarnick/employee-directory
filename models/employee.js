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
    jobTitle: {
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
        required: false
    },
    dob: {
        type: Date,
        required: true
    }
})

// Export the model
module.exports = mongoose.model('Employee', employeeSchema)
