const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const secret = 'sjdgr579iloidert6345';
const db = require("../db/index");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    db.User.create({username: req.body.username, password: req.body.password}).then(()=>{
        res.status(201).send('User Signup success');
    })
    .catch((err)=>{
        res.status(401).send('User Signup Error');
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    let token = jwt.sign({username: req.body.username}, secret);
    return res.status(200).json({token});
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    db.Course.find().then((courses)=>{
        return res.status(200).json(courses);
    })
    .catch((err)=>{
        return res.status(401).send('Error in getting courses');
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    db.Course.findOne({_id: req.params.courseId}).then((course)=>{
        let token = req.headers.authorization.split(' ')[1];
        let payload = jwt.decode(token);
        db.User.findOne({username: payload.username}),then((user)=>{
            user.purchased.push(req.params.courseId);
            res.status(201).send('Cource purchased');
        })
        .catch((err)=>{
            res.status(401).send('Purchase error');
        })
        .catch((err)=>{
            res.status(401).send('Purchase error');
        })
    })
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    let token = req.headers.authorization.split(' ')[1];
    let payload = jwt.decode(token);
    db.User.findOne({username: payload.username}).then((user)=>{
        db.Course.find({_id: { $in: user.purchased}}).then((courses)=>{
            res.status(200).json(courses);
        })
        .catch((err)=>{
            res.status(401).send('Error in fetching purchased courses');
        })
    })
    .catch((err)=>{
        res.status(401).send('Error in fetching purchased courses');
    })
});

module.exports = router