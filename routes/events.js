var express = require('express');
var router = express.Router();

// check the JWT token
const { checkJWTToken } = require('../routes/middleware.js');
// get all controllers
const { getAllEvents, getEventByNearestDate, getEventsByEntryFee, getEventsByLocation, createEvent, editEvent, deleteEvent } = require('../controllers/event.controller.js');

// get all events
router.get('/event-homepage', checkJWTToken, async (req, res) => {
    let events = await getAllEvents();
    res.json(events);
});

// get events by date
router.get('/events-by-date', async (req, res) => {
    let events = await getEventByNearestDate();
    console.log('Got events by date');
    res.json(events);
});

// get events by entry fee
router.get('/events-by-entry-fee', async (req, res) => {
    let events = await getEventsByEntryFee();
    console.log('Got events by entry fee');
    res.json(events);
});

// get events by location
router.get('/events-by-location', async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        // find events by location
        const events = await getEventsByLocation(searchTerm);
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while processing your request' });
    }
});


// create a new event
router.post('/create-event', async (req, res) => {
    try {
        // create a new event with the values from the body
        await createEvent(req.body.eventName, req.body.eventDate, req.body.eventTime, req.body.eventLocation, req.body.eventDescription, req.body.eventPresenter, req.body.eventEntryFee);
        res.json({ message: 'Event created' });
    } catch (error) {
        console.error(error);
        res.send({ message: 'Event not created' });
    }
});

// edit an existing event
router.put('/edit-event', async (req, res) => {
    try {
        // add all the values to be updated to updateData
        let updateData = {};

        // if the new items have a value add it to updateData 
        if (req.body.eventName) {
            updateData.eventName = req.body.eventName;
        }
        if (req.body.eventDate) {
            updateData.eventDate = req.body.eventDate;
        }
        if (req.body.eventTime) {
            updateData.eventTime = req.body.eventTime;
        }
        if (req.body.eventLocation) {
            updateData.eventLocation = req.body.eventLocation;
        }
        if (req.body.eventDescription) {
            updateData.eventDescription = req.body.eventDescription;
        }
        if (req.body.eventPresenter) {
            updateData.eventPresenter = req.body.eventPresenter;
        }
        if (req.body.eventEntryFee) {
            updateData.eventEntryFee = req.body.eventEntryFee;
        }

        // edit the event with the id from the body and updateData
        await editEvent(req.body.eventId, updateData);
        res.json({ message: 'Event updated' });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Event not updated' });
    }
});

// delete an event by the event id
router.delete('/delete-event', async (req, res) => {
    try {
        await deleteEvent(req.body.eventId);
        res.json({ message: 'Event deleted' });
    } catch (error) {
        console.error(error);
        res.send({ message: 'Event not deleted' });
    }
});

  
module.exports = router;