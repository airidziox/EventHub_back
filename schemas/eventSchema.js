const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const event = mongoose.model("events", eventSchema);

module.exports = event;