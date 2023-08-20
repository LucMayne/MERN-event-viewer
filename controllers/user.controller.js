const Users = require('../models/user_model.js');

const findUserByUsername = (username) => {
    return Users.findOne({ username: username });
};

// find all users
const findAllUsers = () => {
    return Users.find({});
};

// create a new user
const createUser = async function(username, password) {
    // check if user exists before creating
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
        // display error message
        console.log(`Error: A user with the username '${username}' already exists.`);
    } else {
        // create new user
        let userModel = new Users({
            username: username,
            password: password,
        });

        try {
            // save the user
            const newUser = await userModel.save();
            return newUser;
        } catch (err) {
            console.log(err);
        }
    }
};

module.exports = {
    findUserByUsername,
    findAllUsers,
    createUser,
};

