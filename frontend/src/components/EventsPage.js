import React from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import './EventsPage.css';

class EventsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            eventName: '',
            eventDate: '',
            eventTime: '',
            eventLocation: '',
            eventDescription: '',
            eventPresenter: '',
            eventEntryFee: '',
            eventID: '',
            locationSearch: '',
            selectedOption: 'Events',
            initialLoad: false,
            editingEvent: false,
        };
        
        // bind to this
        this.editEventForm = this.editEventForm.bind(this);
        this.fetchAllEvents = this.fetchAllEvents.bind(this);
        this.handleSortByDateClick = this.handleSortByDateClick.bind(this);
        this.handleSortByEntryFeeClick = this.handleSortByEntryFeeClick.bind(this);
        this.searchByLocation = this.searchByLocation.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.updateEventState = this.updateEventState.bind(this);
        this.handleEventsClick = this.handleEventsClick.bind(this);
    }

    componentDidMount() {
        if (!this.state.initialLoad) {
            this.fetchAllEvents();
        }
    }
    
    
    // set editEvent to the opposite of its current value
    editEventForm = (eventId) => {
        this.setState(prevState => ({
            editingEvent: !prevState.editingEvent,
            eventID: eventId,
        }));
    }

    // fetch all events from the database
    fetchAllEvents() {
        try {
            fetch('/events/event-homepage', {
                method: 'GET',
                headers: {
                    // pass the jwt token in the header
                    'Authorization': `Bearer ${this.props.userToken}`
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                return response.json();
            })
            .then(data => {
                this.setState(prevState => ({
                    events: data,
                    // only set the initialLoad state once 
                    initialLoad: prevState.initialLoad === false ? true : prevState.initialLoad
                }), () => {
                    console.log("");
                })            
            })
            .catch(error => {
                console.log("No Events Found");
            });
        } catch (error) {
            console.log("No Events Found");
        }
    }   

    // sort events by date
    handleSortByDateClick() {
        fetch('/events/events-by-date', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            return response.json();
        })
        .then(data => {
            this.setState(({
                events: data,
                selectedOption: 'Sort by Date'
            }), () => {
                console.log("");
            });
        })
        .catch(error => {
            console.error(error);
        });
    }
              
    // sort events by entry fee
    handleSortByEntryFeeClick(event) {
        event.preventDefault();
        fetch('/events/events-by-entry-fee', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            return response.json();
        })
        .then(data => {
            // update the state with the sorted events
            this.setState(({
                events: data,
                selectedOption: 'Sort by Entry Fee'

            }), () => {
                console.log("");
            });
        })
        .catch(error => {
            console.error(error);
        });
    }

    // search for events by location
    searchByLocation(event) {
        event.preventDefault();
        const searchTerm = this.state.locationSearch;
        // pass the search term to the backend
        fetch(`/events/events-by-location?searchTerm=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                alert('No events found for that location');
            } else {
                // update the state
                this.setState(({
                    events: data,
                }), () => {
                    console.log("");
                });
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    

    // create a new event
    createEvent = (event) => {
        event.preventDefault();
        if (this.state.eventName === '' || this.state.eventDate === '' || this.state.eventTime === '' || this.state.eventLocation === '' || this.state.eventDescription === '' || this.state.eventPresenter === '' || this.state.eventEntryFee === '') {
            alert('Please fill out all fields');
            return;
        }
        fetch('/events/create-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // pass the values from the state to the backend
            body: JSON.stringify({ eventName: this.state.eventName, eventDate: this.state.eventDate, eventTime: this.state.eventTime, eventLocation: this.state.eventLocation, eventDescription: this.state.eventDescription, eventPresenter: this.state.eventPresenter, eventEntryFee: this.state.eventEntryFee }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create event');
            }
            return response.json();
        })
        .then(data => {
            // set the state for the new event to default values
            this.setState({ 
                eventName: '', 
                eventDate: '', 
                eventTime: '', 
                eventLocation: '', 
                eventDescription: '', 
                eventPresenter: '', 
                eventEntryFee: '' 
            });
            this.fetchAllEvents();
        })
        .catch(error => {
            console.error(error);
        });
    }

    // edit an existing event
    editEvent = (event) => {  
        event.preventDefault();
        fetch('/events/edit-event', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            // pass the values from the state to the backend
            body: JSON.stringify({
                eventId: this.state.eventID,
                eventName: this.state.eventName,
                eventDate: this.state.eventDate,
                eventTime: this.state.eventTime,
                eventLocation: this.state.eventLocation,
                eventDescription: this.state.eventDescription,
                eventPresenter: this.state.eventPresenter,
                eventEntryFee: this.state.eventEntryFee
            }),
        })        
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to edit event');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // set the state for the new event to default values
            this.setState({
                eventName: '',
                eventDate: '',
                eventTime: '',
                eventLocation: '',
                eventDescription: '',
                eventPresenter: '',
                eventEntryFee: '',
                editingEvent: false,
                eventID: '',
            });
            this.fetchAllEvents();
        })
        .catch(error => {
            console.error(error);
        });
    }

    // delete an event by the event id
    deleteEvent = (eventId) => {
        fetch('/events/delete-event', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eventId: eventId }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete event');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            this.fetchAllEvents();
        })
        .catch(error => {
            console.error(error);
        });
    }

    // update the state when the user types in a form
    updateEventState = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // handle the events option
    handleEventsClick = (event) => {
        event.preventDefault();
        this.setState({ selectedOption: 'Events' });
        this.fetchAllEvents();
    }

    render() {
        return (
            <>
                <h1 style={{fontFamily: "sans-serif", textDecoration: "underline"}}>EVENTS</h1> 
                <br />
                {/* dropdown menu with options to sort events */}
                <div id="top-menu">
                    <Dropdown id='dropdown-menu'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.selectedOption}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.handleEventsClick}>Events</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleSortByDateClick}>Sort by Date</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleSortByEntryFeeClick}>Sort by Entry Fee</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div style={{display: 'flex'}}>
                        {/* search bar to search by location */}
                        <Form inline="true" onSubmit={this.searchByLocation}>
                            <Form.Group controlId="searchEvent">
                                <Form.Control type="text" name="locationSearch" value={this.state.locationSearch} onChange={this.updateEventState} />
                            </Form.Group>
                        </Form>
                        <Button variant="primary" type="submit" onClick={this.searchByLocation}>
                            Search Event
                        </Button>
                    </div>
                    {/* logout button */}
                    <Button id='logout-btn' onClick={this.props.onLogOut}>Log Out</Button>
                </div>

                {/* display all events */}
                {this.state.events.length > 0 && 
                    <div className='container'>
                        {this.state.events.map(event => (
                            <div className='event-item' key={event._id}>
                                <h1>{event.eventName}</h1>
                                <p>Date: {event.eventDate}</p>
                                <p>Time: {event.eventTime}</p>
                                <p>Location: {event.eventLocation}</p>
                                <p>Description: {event.eventDescription}</p>
                                <p>Presenter: {event.eventPresenter}</p>
                                <p>Entry Fee: {event.eventEntryFee}</p>
                                {/* buttons to edit or delete an event */}
                                <div className='button-container'>
                                    <button onClick={() => this.deleteEvent(event._id)}>Delete</button>
                                    <button onClick={() => this.editEventForm(event._id)}>Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>               
                }
                <div className='create-edit-container'>
                    {/* form to create a new event */}
                    {this.state.initialLoad && (
                        <div className='form-container'>
                            <Form onSubmit={this.createEvent}>
                                <h2>Create Event</h2>
                                <Form.Group controlId="newEvent">
                                    <Form.Label>Event Name</Form.Label>
                                    <Form.Control type="text" name="eventName" onChange={this.updateEventState} />
                                    <Form.Label>Event Date</Form.Label>
                                    <Form.Control type="text" name="eventDate" placeholder="dd/mm/yyyy" onChange={this.updateEventState} />
                                    <Form.Label>Event Time</Form.Label>
                                    <Form.Control type="text" name="eventTime" onChange={this.updateEventState} />
                                    <Form.Label>Event Location</Form.Label>
                                    <Form.Control type="text" name="eventLocation" onChange={this.updateEventState} />
                                    <Form.Label>Event Description</Form.Label>
                                    <Form.Control type="text" name="eventDescription" onChange={this.updateEventState} />
                                    <Form.Label>Event Presenter</Form.Label>
                                    <Form.Control type="text" name="eventPresenter" onChange={this.updateEventState} />
                                    <Form.Label>Event Entry Fee</Form.Label>
                                    <Form.Control type="text" name="eventEntryFee" placeholder='R0' onChange={this.updateEventState} />
                                    <Button variant="primary" type="submit">
                                        Create Event
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    )}
                    {this.state.editingEvent && (
                        // form to edit an existing event
                        <div className='form-container'>
                            <Form >
                                <h2>Edit Event</h2>
                                <Form.Group controlId="newEvent" onSubmit={this.editEvent}>
                                    <Form.Label>Event Name</Form.Label>
                                    <Form.Control type="text" name="eventName" value={this.state.eventName} onChange={this.updateEventState} />
                                    <Form.Label>Event Date</Form.Label>
                                    <Form.Control type="text" name="eventDate" value={this.state.eventDate} onChange={this.updateEventState} />
                                    <Form.Label>Event Time</Form.Label>
                                    <Form.Control type="text" name="eventTime" value={this.state.eventTime} onChange={this.updateEventState} />
                                    <Form.Label>Event Location</Form.Label>
                                    <Form.Control type="text" name="eventLocation" value={this.state.eventLocation} onChange={this.updateEventState} />
                                    <Form.Label>Event Description</Form.Label>
                                    <Form.Control type="text" name="eventDescription" value={this.state.eventDescription} onChange={this.updateEventState} />
                                    <Form.Label>Event Presenter</Form.Label>
                                    <Form.Control type="text" name="eventPresenter" value={this.state.eventPresenter} onChange={this.updateEventState} />
                                    <Form.Label>Event Entry Fee</Form.Label>
                                    <Form.Control type="text" name="eventEntryFee" value={this.state.eventEntryFee} onChange={this.updateEventState} />
                                    <Button variant="primary" type="submit">
                                        Edit Event
                                    </Button>

                                </Form.Group>
                            </Form>
                        </div>
                    )}
                </div>
            </>
        )
    }
}

export default EventsPage;