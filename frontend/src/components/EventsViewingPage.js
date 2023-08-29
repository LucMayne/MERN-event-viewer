
import React from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import EventsPage from './AdminEventsPage.js';
import './EventsViewingPage.css';

// extend the EventsPage class and uses most of the same methods, but doesn't allow users to add, delete or edit events.
// GET is used to fetch all events or specific events from the database
class UserEventsPage extends EventsPage {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            locationSearch: '',
            selectedOption: 'Events',
            initialLoad: false,
        };

        this.handleAllEventsClick = this.handleAllEventsClick.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    componentDidMount() {
        this.fetchAllEvents();
    }

    // update the search term
    updateSearch = (event) => {
        event.preventDefault();
        this.setState({ locationSearch: event.target.value });
    };

    // handle the events option
    handleAllEventsClick = (event) => {
        event.preventDefault();
        this.setState({ selectedOption: 'Events' });
        this.fetchAllEvents();
    }

    render() {
        return (
          <>
            <h1 className='heading-styles'>EVENTS</h1> 
                <br />
                <div id="top-menu">
                    <Dropdown id='dropdown-menu'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.selectedOption}
                        </Dropdown.Toggle>

                        {/* dropdown menu with options */}
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.handleAllEventsClick}>Events</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleSortByDateClick}>Sort by Date</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleSortByEntryFeeClick}>Sort by Entry Fee</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* search bar to search by location */}
                    <div style={{display: 'flex'}}>
                        <Form inline="true">
                            <Form.Group controlId="searchEvent" onSubmit={this.searchByLocation}>
                                <Form.Control type="text" name="locationSearch" value={this.state.locationSearch} onChange={this.updateSearch} />
                            </Form.Group>
                        </Form>
                        <Button variant="primary" type="submit" onClick={this.searchByLocation}>
                            Search Event
                        </Button>
                    </div>
                    <Button id='logout-btn' onClick={this.props.onLogOut}>Log Out</Button>
                </div>
                {/* map over events and display each one */}
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
                        </div>
                    ))}
                </div> 
          </>  
        );
    }

}


export default UserEventsPage;

