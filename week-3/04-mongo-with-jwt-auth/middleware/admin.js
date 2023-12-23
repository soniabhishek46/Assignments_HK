const jwt = require("jsonwebtoken");
const secret = 'sjdgr579iloidert6345';

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    try{
        let decoded = jwt.verify(token, secret);
        next();
    }
    catch(e){
        res.status(401).send('Unauthorized');
    }
}



module.exports = adminMiddleware;