import React from 'react';
import LogIn  from './LogInComponent.js';
import EventsPage from './AdminEventsPage.js';
import UserEventsPage from './EventsViewingPage.js';

// this is the main component that calls the other components depending on the state of the user
class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: '',
            admin: false,
            loggedIn: false,
        };
    }

    // set login to true, userToken to the token, and admin to the admin value
    handleLogIn = (token, admin) => {
        this.setState({ 
            loggedIn: true,
            userToken: token,
            admin: admin
        });
    }
    
    // handle logout
    handleLogOut = () => {
        this.setState({ loggedIn: false });
    }  

    render() {
        // if the user is not logged in, show the login component
        // if the user is logged in and is an admin, show the events page
        // if the user is logged in and is not an admin, show the user events page
        return (
            <div>
                {!this.state.loggedIn && 
                    <LogIn handleLogIn={this.handleLogIn} />
                }
                {this.state.loggedIn && this.state.admin &&
                    <EventsPage userToken={this.state.userToken} onLogOut={this.handleLogOut} />
                }
                {(!this.state.admin && this.state.loggedIn) &&
                    <UserEventsPage userToken={this.state.userToken} onLogOut={this.handleLogOut} />
                }
            </div>
        )
    }
}

export default MainComponent;