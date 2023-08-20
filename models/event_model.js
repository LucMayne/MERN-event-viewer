const mongoose = require('mongoose');

let EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: String,
        required: true,
    },
    eventTime: {
        type: String,
        required: true,
    },
    eventLocation: {
        type: String,
        required: true,
    },
    eventDescription: {
        type: String,
        required: true,
    },
    eventPresenter: {
        type: String,
        required: true,
    },
    eventEntryFee: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Events', EventSchema);