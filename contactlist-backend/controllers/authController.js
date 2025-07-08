const jwt = require('jsonwebtoken');
const {findUserByCredentials} = require('../models/userModel')

const login = async (req, res) => {
    const {username, password} = req.body

    try{
        const user = await findUserByCredentials(username, password)

        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const accessToken = jwt.sign({ name: user.username }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken });
    } catch(err){
        res.status(500).json({error:'Server error'})
    }
};

module.exports = {login}