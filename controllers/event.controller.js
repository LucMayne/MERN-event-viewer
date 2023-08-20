const Events = require('../models/event_model');

// get all events from the database
const getAllEvents = async () => {
    return await Events.find().exec();
};

// find and return all events sorted by date
const getEventByNearestDate = async () => {
    // get all the events
    let events = await getAllEvents();
    // use the sort method
    events.sort((a, b) => {
        // convert the dates to Date objects
        let dateA = new Date(a.eventDate.split('/').reverse().join('-'));
        let dateB = new Date(b.eventDate.split('/').reverse().join('-'));
        // compare the dates a - b
        return dateA - dateB;
    });

    return events;
};

// find and return all events sorted by entry fee
const getEventsByEntryFee = async () => {
    // get all the events
    let events = await getAllEvents();
    // use the sort method
    events.sort((a, b) => {
        // remove the 'R' from the entry fee and convert it to a number
        let entryFeeA = Number(a.eventEntryFee.substring(1));
        let entryFeeB = Number(b.eventEntryFee.substring(1));
        // compare the entry fees a - b
        return entryFeeA - entryFeeB;
    });

    return events;
};

// find and return all events with the same event location as the search term
const getEventsByLocation = async (searchTerm) => {
    return await Events.find({ eventLocation: searchTerm }).exec(); 
};

// create a new event
const createEvent = async function(eventName, eventDate, eventTime, eventLocation, eventDescription, eventPresenter, eventEntryFee) {
    let eventModel = new Events({
        eventName: eventName,
        eventDate: eventDate,
        eventTime: eventTime,
        eventLocation: eventLocation,
        eventDescription: eventDescription,
        eventPresenter: eventPresenter,
        eventEntryFee: eventEntryFee,
    });

    // save the new event to the database
    try {
        const newEvent = await eventModel.save();
    }
    catch (err) {
        console.log(err);
    }
};

// edit an existing event
const editEvent = async function(eventId, updateData) {
    try {
        // find the event that matches the _id of the event and update it with the new data
        const event = await Events.findOneAndUpdate({ _id: eventId }, updateData, { new: true });
        
        if (event) {
            console.log(`Event with the id ${eventId} has been deleted`);
        } else {
            console.log(`Event with the id ${eventId} not found`);
        }
    } catch (error) {
        console.error(error);
    }
};

// delete an event
const deleteEvent = async function(eventId) {
    console.log(eventId)
    try {
        console.log(`Deleting event with id ${eventId}`);
        // find the event that matches the _id of the event and delete it from the database
        const event = await Events.findOneAndDelete({ _id: eventId });
        
        // if the event is found and deleted
        if (event) {
            console.log(`Event with id ${eventId} has been deleted`);
        } else {
            console.log(`Event with id ${eventId} not found`);
        }
    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    getAllEvents,
    getEventByNearestDate,
    getEventsByEntryFee,
    getEventsByLocation,
    createEvent,
    editEvent,
    deleteEvent,
};