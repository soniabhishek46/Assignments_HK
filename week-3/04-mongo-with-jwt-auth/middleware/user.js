const jwt = require("jsonwebtoken");
const secret = 'sjdgr579iloidert6345';

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. 
    // Check readme for the exact headers to be expected
    let token = req.headers.authorization.split(' ')[1];
    try{
        let decoded = jwt.verify(token, secret);
        next();
    }
    catch(e){
        res.status(401).send('UnAuthorized');
    }

}

module.exports = userMiddleware;