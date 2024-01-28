const express = require('express');
const { Card } = require("../database");
const {default: mongoose} = require('mongoose');

const router = express.Router();

router.get('/cards', async(req, res)=>{
    const cards = await Card.find();
    res.json({cards});
});

router.delete('/card/:id', async (req, res)=>{
    const id = req.params.id;
    await Card.deleteOne({_id: id});
    res.status(201).send('User delete success');
});

router.post('/add-card/', async (req, res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const social = req.body.social;
    const interests = req.body.interests;
    await Card.create({username, description, social, interests})
    res.status(201).send('User Insert Success');
});

router.put('/update-card/', async (req, res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const social = req.body.social;
    const interests = req.body.interests;
    const id = req.body.id;
    const crd = await Card.findById(id);
    crd.username = username;
    crd.description = description;
    crd.social = social;
    crd.interests = interests;
    await crd.save();
    res.status(201).send('User update successful');
})

module.exports = router;