const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');

const mongoose = require('mongoose');
const uri = 'mongodb+srv://clusterfirst.bguv089.mongodb.net/';
// connect to the database
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Users',
    user: 'lucmayne0401',
    pass: 'eventpass'
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
});

let PORT = 3001 || process.env.PORT;

const app = express();

// use helmet
app.use(
    helmet({
      contentSecurityPolicy: false,
      xDownloadOptions: false,
    })
);

// build
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
    app.use(express.static(path.join(__dirname, 'frontend/build')));
}
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);

module.exports = app;

app.listen(PORT, () => {
    console.log("Application up and running on port: " + PORT);
});
