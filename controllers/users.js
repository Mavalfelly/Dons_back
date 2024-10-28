const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SALT_LENGTH = 14


router.post('/signup', async (req,res) => {
    try{
        const {username, password, admin} = req.body;
        const regUser = await User.findOne({username});
        if (regUser) {
            return res.json({error: 'Username in use '});
        }
        const hashedPassword = bcrypt.hashSync(password, SALT_LENGTH);
        const user = await User.create({username, hashedPassword, admin});
        const token = jwt.sign({username: user.username, _id: user._id}, process.env.JWT_SECRET);
        res.status(201).json({user,token});
    }catch(error){
        res.status(400).json({error: error.message});
    }
});

router.post('/signin', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(user && bcrypt.compareSync(password, user.hashedPassword)) {
            const token = jwt.sign({username: user.username, _id: user._id}, process.env.JWT_SECRET);
            res.status(200).json({ token });
        }else {
            res.status(401).json({ error: 'Invalid username or password.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;