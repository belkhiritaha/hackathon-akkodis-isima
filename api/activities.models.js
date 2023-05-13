const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema ({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
})

const activities = mongoose.model("activity", activitySchema)

module.exports = activities