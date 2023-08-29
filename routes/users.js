var express = require('express');
var router = express.Router();
let jwt = require("jsonwebtoken");

// import the functions from the controller
const { findAllUsers, createUser } = require('../controllers/user.controller.js');
const { checkUsername } = require('../routes/middleware.js');

// login route
router.post('/login', async (req, res) => {
  try {
    // get the username and password from the request body
    const { username, password } = req.body;  
    const users = await findAllUsers();
    // if the username and password match the user can login
    const user = users.find(user => user.username === username && user.password === password) || 'Not Found';
    if (user === 'Not Found') {
      throw new Error();
    } else {
      let jwtToken = jwt.sign(
        {
          username: req.body.username,
          password: req.body.password,
        },
        "secretKey",
      );
      // send the token and admin value
      res.json({ token: jwtToken, admin: user.admin });
    }
  } catch (error) {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});


// register route
router.post('/register', checkUsername, async (req, res) => {
  // create a new user
  try {
    if (req.body.password.length < 4) {
      res.json({ message: 'Password must be at least 4 characters' });
    } else {
      let newUser = createUser(req.body.username, req.body.password);
      if (newUser) {
        res.json({ message: 'Account Created' });
      } else {
        res.status(401).send({ message: 'User not created' });
      } 
    }
  } catch (error) {
    res.status(401).send({ message: 'User not created' });
  }
});

module.exports = router;
