const jwt = require('jsonwebtoken');
const {findUserByCredentials, createUser, findUserByEmail} = require('../models/userModel')

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

const register = async (req, res) => {
    const {firstName, lastName, email, username, password} = req.body

    try{
        const existingUser = await findUserByEmail(email)
        if(existingUser){
            return res.status(409).json({message: "Email is already registered. Try another email."})
        }

        const newUser = await createUser(firstName, lastName, email, username, password)
        res.status(201).json({message: "User registered successfully", user : newUser})
    } catch(err){
        console.error('Register Error:', err); // log error to console
        res.status(500).json({error: "Server error"})
    }
}



module.exports = {login, register}