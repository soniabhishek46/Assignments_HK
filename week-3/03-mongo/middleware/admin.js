const db = require("../db/index");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. 
    // Check readme for the exact headers to be expected
    let username = req.headers.username;
    let password = req.headers.password;
    db.Admin.findOne({username: username, password: password}).then((admin)=>{
        if(admin){
            next();
        }
    })
    .catch((err)=>{
        res.status(404).send("Error occured.")
    })

}

module.exports = adminMiddleware;