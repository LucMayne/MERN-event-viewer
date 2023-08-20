
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './LogInComponent.css'

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            newUsername: '',
            newPassword: '',
            registerAccount: false,
        };
    }

    // get the token from the server and update the state
    LogIn = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // send the username and password in the body
                body: JSON.stringify({ username: this.state.username, password: this.state.password }),
            });
            // if the response is not ok, throw an error
            if (!response.ok) {
                this.setState({ username: '', password: '' });
                throw new Error();
            } else {
                // if the response is ok, get the token and admin value
                const data = await response.json();
                this.props.handleLogIn(data.token, data.admin);
            }
        } catch (error) {
            alert("Incorrect Username or Password.");
        }
    }
        
    // update state when registration fails
    handleRegisterFail = () => {
        this.setState({ newUsername: '', newPassword: '' });
    }  

    // register a new user
    Register = (event) => {
        event.preventDefault();
        fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: this.state.newUsername, password: this.state.newPassword }),
        })
        .then(response => {
            if (!response.ok) {
                // if the response is not ok, throw an error
                this.handleRegisterFail();
                throw new Error('Invalid credentials');
            }
            return response.json();
        })
        .then(data => {
            this.setState({ newUsername: '', newPassword: '' });
            alert(data.message);
        })
        .catch(error => {
            console.error(error);
            alert('Invalid email or password');
        });
    }

    // switch between login and register forms
    handleRegisterClick = (event) => {
        event.preventDefault();
        this.setState(previousState => ({
            registerAccount: !previousState.registerAccount
        }));
    }

    // update the state when the user types in the form
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    render() {
        return (
            <div className="authentication-container">
                {/* form for logging in */}
                {!this.state.registerAccount &&
                    <Form onSubmit={this.LogIn}>
                        <Form.Group controlId="formLoginEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" value={this.state.username} placeholder="Enter username" onChange={this.onChange} />
                        </Form.Group>

                        <Form.Group controlId="formLoginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" name="password" value={this.state.password} placeholder="Password" onChange={this.onChange} />
                        </Form.Group>
                        <Button className='submit-details' variant="primary" type="submit">
                            Login
                        </Button>
                        <br />
                        <Button className='submit-details' variant="primary" type="submit" onClick={this.handleRegisterClick}>
                            Register
                        </Button>
                    </Form>
                }

                {/* form for registering */}
                {this.state.registerAccount &&
                    <Form onSubmit={this.Register}>
                        <Form.Group controlId="formRegisterEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="newUsername" value={this.state.newUsername} placeholder="Enter username" onChange={this.onChange} />
                        </Form.Group>

                        <Form.Group controlId="formRegisterPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" name="newPassword" value={this.state.newPassword} placeholder="Password" onChange={this.onChange} />
                        </Form.Group>
                        <Button className='submit-details' variant="primary" type="submit">
                            Register
                        </Button>
                        <br />
                        <Button className='submit-details' variant="primary" type="submit" onClick={this.handleRegisterClick}>
                            Login
                        </Button>
                    </Form>
                }
            </div>
        );
    }
    
}

export default LogIn;

