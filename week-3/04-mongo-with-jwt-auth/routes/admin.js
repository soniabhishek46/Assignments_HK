const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const secret = 'sjdgr579iloidert6345';
const db = require("../db/index");


// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    let username = req.body.username;
    let password = req.body.password;
    db.Admin.create({username: username, password: password}).then(()=>{
        res.status(201).send('Admin Signup Success');
    })
    .catch((err)=>{
        res.status(401).send('Error while admin signup');
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    let username = req.body.username;
    let password = req.body.password;
    let token = jwt.sign({username: username}, secret);
    return res.status(200).json({token});
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    db.Course.create({
        title: req.body.title,
        description: req.body.description,
        price: parseInt(req.body.price),
        image: req.body.image
    }).then(()=>{
        res.status(201).send('Course created');
    })
    .catch((err)=>{
        res.status(401).send('Error while creating course');
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    db.Course.find().then((courses)=>{
        return res.status(200).json(courses);
    })
    .catch((err)=>{
        return res.status(401).send('Error in getting courses');
    })
});

module.exports = router;