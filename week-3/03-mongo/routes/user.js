const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const db = require("../db/index");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    db.User.insertMany([{username: req.body.username, password: req.body.password}])
    .then(()=>{
        res.status(200).send('Succuss User created.');
    })
    .catch((err)=>{
        res.status(404).send('Error in User creation');
    })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    db.Course.find().then((courses)=>{
        res.status(200).json(courses);
    })
    .catch((err)=>{
        res.status(404).send('Error fetching courses');
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    db.User.findOne({username: req.headers.username}).then((user)=>{
        user.purchased.push(req.params.courseId);
        user.save();
        res.status(201).send('Purchased coursee');
    })
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    db.User.findOne({username: req.headers.username}).then((user)=>{
        db.Course.find({_id: {$in: user.purchased}}).then((courses)=>{
            return res.status(200).json(courses);
        })
    })
});

module.exports = router