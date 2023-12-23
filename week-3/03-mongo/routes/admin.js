const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const db = require("../db/index");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    let username = req.body.username;
    let password = req.body.password;
    db.Admin.insertMany([{username: username, password: password}])
    .then(()=>{
        res.status(200).send('Succussfully created Admin User');
    })
    .catch((err)=>{
        res.status(404).send('Error occured while creating Admin User');
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    db.Course.insertMany([{title: req.body.title, 
                           description: req.body.description,
                           price: parseInt(req.body.price),
                           image: req.body.image}])
    .then(()=>{
        res.status(200).send('Succussfully created a Course');
    })
    .catch((err)=>{
        res.send(404).send('Error occured while creating course');
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    db.Course.find().then((docs)=>{
        return res.status(200).json(docs);
    })
    .catch((err)=>{
        return res.status(404).send('Error occured while fetching courses');
    })
});

module.exports = router;