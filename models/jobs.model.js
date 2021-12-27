const mongoose = require('mongoose');
// Schema
const customSchema = new mongoose.Schema({
    jobName:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },

    companyAddress:{
        type: String,
        required: true
    },
    requireSkills:[
        {
            type: String,
            required: true
        }
        
    ],
    jobType:{
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },
    requireExperience: {
        type: Number,
        required: true
    },
    applicationLastDate: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
    



});


// export
module.exports = mongoose.model('job', customSchema);