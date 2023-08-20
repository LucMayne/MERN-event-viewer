## Event App

# SYSTEM ARCHITECTURE:

For this app, I will be using Create React App (CRA) because it gives me more control over the development process. 
For styling, I will use a combination of react-bootstrap and custom CSS. The app will be deployed to Heroku

# SYSTEM REQUIREMENTS SPECIFICATION:

## Functional Requiremnets:
1. Sign In:
   Users should be able to sign in with an email and password.
   If the users credentials are valid they should be redirected to the main page.
   If the userrs credentials are invalid and error message should be displayed.
2. Register Account:
   Users should be able to register an account with an email and password.
   If the users email does not end with '@gmail.com' or they don't enter a password an error message should be displayed.
   If the users credentials are valid they should be asked to Sign In.
3. Sign Out:
   Users will be able to sign out of the web app
   The Sign In page should be displayed once they have signed out.
4. Filter Events:
   Users should be able to sort by 'all events', 'by date', 'by entry fee'.
5. Seach Location:k
   The user should be able to search for events by entering the location in an input field.
   Events that match that location should be displayed.
   If there are no events that match that location a message should be displayed telling the user that no events were found.
6. Admin User:
   The Admin user should be able to create a new event, edit an event, or delete an event.
   1. Create New Event:
      The admin will be able to enter an event name, date, time, location, description, presenters, and entry fee.
      If the admin enters invalid data or leaves an input field blank an error message should be displayed.
      If the admin enters valid data a message should be displayed to tell them the event was added.
      The event should then be added to the list of events.
   2. Edit Event:
      The admin will be able to edit an existing event.
      A form with input fields for a new event name, date, time, location, description, presenters, and entry fee should be displayed.
      The admin will not have to enter data in all of the fields and only fields containing data will be changed for that specific event.
   3. Delete Event:
      The admin will be able to delete an event.
      When the event is deleted a message should be displayed telling the admin that the event was deleted successfully.
      The event list should then be updated.

Non-functional Requirements:
1.	Usability:
•	The web app should be easy to use and navigate.
2.	Reliability: 
•	The web app should be reliable and should be able to recover from outages and incorrect processing.
3.	Performance:
•	The web app should be fast and responsive.
•	It should be able to handle a large amount of events without slowing down.
4.	Security: 
•	The web app should prevent unauthorized access.

## Link
https://event-viewer-fullstack-17b3d61fce43.herokuapp.com/
ADMIN INFO:
username: admin
password admin

## Installation

1. Clone the repository to your local machine.
2. Navigate to the `root` directory and run the command `npm install`.
3. Navigate to the `frontend` directory and run the command `npm install`.

## Running the app

1. Open two terminal windows, one for the backend and one for the frontend.
2. In the first terminal, navigate to the `backend` directory and run the command `npm start` to start the backend server.
3. In the second terminal, navigate to the `frontend` directory and run the command `npm start` to start the frontend server.
4. Open a browser and go to `http://localhost:3000` to view the app.

## Helmet

This app uses Helmet to help secure the Express app.
Helmet is configured with the contentSecurityPolicy and xDownloadOptions options set to false.

## API
I have created a custom API using Express routes and controllers to manage users and tasks. 
The API allows new users to be added to a database and new events to be created.

Users can view events, while admins have the ability to edit, add, and delete events as well as view all events.

The data is sent and received using Express routes and controllers, and is accessed in the frontend using React components.

## Deployment
The application has been deployed on Heroku. The express code is in an express-app folder and the react code is a frontend folder.
The entire application is hosted in a github repository and deployed to Heroku from there.

## Testing
Type `npm test -- -u` in the root directory to run tests on the front and back-end.