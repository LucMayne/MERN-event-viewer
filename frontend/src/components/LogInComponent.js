
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './LogInComponent.css'

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            newEmail: '',
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
                // send the email and password in the body
                body: JSON.stringify({ username: this.state.email, password: this.state.password }),
            });
            // if the response is not ok, throw an error
            if (!response.ok) {
                this.setState({ email: '', password: '' });
                throw new Error();
            } else {
                // if the response is ok, get the token and admin value
                const data = await response.json();
                this.props.handleLogIn(data.token, data.admin);
            }
        } catch (error) {
            alert("Incorrect Email or Password.");
        }
    }
        
    // update state when registration fails
    handleRegisterFail = () => {
        this.setState({ newEmail: '', newPassword: '' });
    }  

    // register a new user
    Register = (event) => {
        event.preventDefault();
        if (!this.state.newEmail && !this.state.newPassword) {
            alert('Please enter an email and password');
            this.setState({ newEmail: '', newPassword: '' });
            return;
        }
        if (!this.state.newEmail) {
            alert('Please enter an email');
            this.setState({ newEmail: '', newPassword: '' });
            return;
        }
        if (!this.state.newPassword) {
            alert('Please enter a password');
            this.setState({ newEmail: '', newPassword: '' });
            return;
        }
        fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: this.state.newEmail, password: this.state.newPassword }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                this.setState({ newEmail: '', newPassword: '' });
            } else {
                this.setState({ newEmail: '', newPassword: '' });
                alert('Account Created');
            }
        })
        .catch(error => {
            alert('Account not created');
            this.setState({ newEmail: '', newPassword: '' });
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
                <h1 className='heading-styles'>Find Upcoming Events</h1> 
                {/* form for logging in */}
                {!this.state.registerAccount &&
                    <div className='main-form-container'>
                        <p>Login to an Account</p>
                        <Form onSubmit={this.LogIn}>
                            <Form.Group controlId="formLoginEmail">
                                <Form.Control type="text" name="email" value={this.state.email} placeholder="Email" onChange={this.onChange} />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="formLoginPassword">
                                <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.onChange} />
                            </Form.Group>
                            <Button className='submit-details' variant="primary" type="submit">
                                Login
                            </Button>
                            <p style={{textDecoration: 'underline'}}>or</p>
                            <Button variant="primary" type="submit" onClick={this.handleRegisterClick}>
                                Register
                            </Button>
                        </Form>
                    </div>
                }

                {/* form for registering */}
                {this.state.registerAccount &&
                    <div className='main-form-container'>
                        <p>Register an Account</p>
                        <Form onSubmit={this.Register}>
                            <Form.Group controlId="formRegisterEmail">
                                <Form.Control type="text" name="newEmail" value={this.state.newEmail} placeholder="Enter Your Gmail" onChange={this.onChange} />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="formRegisterPassword">
                                <Form.Control type="password" name="newPassword" value={this.state.newPassword} placeholder="Password" onChange={this.onChange} />
                            </Form.Group>
                            <Button className='submit-details' variant="primary" type="submit">
                                Register
                            </Button>
                            <p style={{textDecoration: 'underline'}}>or</p>
                            <Button variant="primary" type="submit" onClick={this.handleRegisterClick}>
                                Login
                            </Button>
                        </Form>
                    </div>
                }
            </div>
        );
    }
    
}

export default LogIn;

