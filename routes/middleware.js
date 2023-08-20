let jwt = require("jsonwebtoken");

// check the JWT token
function checkJWTToken(req, res, next) {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, "secretKey", function (error, data) {
            if (error) {
                res.send({ message: "Invalid Token" });
            } else {
                req.username = data.username;
                req.password = data.password;
                next();
            }
        });
    } else {
        res.send({ message: "No token attached to the request" });
    }
}


// Respond with an HTTP 403 to all requests by users whose usernames don’t end with the substring ‘@gmail.com’.
const checkUsername = (req, res, next) => {
    if (!req.body.username.endsWith('@gmail.com')) {
        res.status(403).send({ message: 'Invalid username' });
    } else {
        next();
    }
}

module.exports = {
    checkJWTToken,
    checkUsername,
};