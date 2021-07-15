const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    date: {
        type: String,
        default: Date.now
    },
    url: String,
    status: Boolean,
    randomString: String,
    role: String
})

const jobSchema = new mongoose.Schema({
        jobTitle: String,
        cmpnyName: String,
        cmpnyCity: String,
        cmpnyCuntry: String,
        jobType: String,
        categoryType: String,
        careerLevel: String,
        experience: Number,
        jobDesc: String,
        positions: Number
})


const User = mongoose.model("user", loginSchema);

const Job = mongoose.model("job", jobSchema);

module.exports = {
    User,
    Job
}