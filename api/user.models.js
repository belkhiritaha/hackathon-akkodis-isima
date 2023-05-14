const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
    username: { type: String, required: true, unique: true }, 
    listActivities: { type: Object, required: true },
    homeToWork: { type: Number, required: true },
    homeToSoccer: { type: Number, required: true },
    workToSoccer: { type: Number, required: true },
    score: {type: Number, required: true},
    transport: { type: Array, required: true },
})

const users = mongoose.model("user", userSchema)

module.exports = users