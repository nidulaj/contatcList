const jwt = require('jsonwebtoken');
const {findUserByCredentials, createUser, findUserByUsername, updateUser, deleteUser} = require('../models/userModel')

const login = async (req, res) => {
    const {username, password} = req.body

    try{
        const user = await findUserByCredentials(username, password)

        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken });
    } catch(err){
        console.error('Login Error:', err);
        res.status(500).json({error:'Server error'})
    }
};

const register = async (req, res) => {
    const {firstName, lastName, email, username, password} = req.body

    try{
        const existingUser = await findUserByUsername(username)
        if(existingUser){
            return res.status(409).json({message: "Username is already registered. Try another username."})
        }

        const newUser = await createUser(firstName, lastName, email, username, password)
        res.status(201).json({message: "User registered successfully", user : newUser})
    } catch(err){
        console.error('Register Error:', err);
        res.status(500).json({error: "Server error"})
    }
};

const getUserInfo = async (req, res) => {
    const username = req.user.username

    try{
        const loggedUser = await findUserByUsername(username)
        res.status(201).json({message: loggedUser})
    }catch(err){
        console.error('User profile Error:', err);
        res.status(500).json({error: "Server error"})
    }
};

const updateProfile = async (req, res) => {
    const username = req.user.username
    const {firstName, lastName, email} = req.body

    try{
        const updatedUser = await updateUser(username, {firstName, lastName, email})
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
        res.json({message: "Profile updated successfully", user: updatedUser})
    } catch (err){
        console.error('Update Error:', err)
        res.status(500).json({error: 'Server error'})
    }
};

const deleteProfile = async (req, res) => {
    const username = req.user.username

    try{
        const deletedUser = await deleteUser(username)
        if(!deletedUser){
            return res.status(404).json({message: "User not found"})
        }

        res.json({message: "Account deleted successfully"})
    } catch (err){
        console.error('Delete error:',err)
        res.status(500).json({error: "Server error"})
    }
}

module.exports = {login, register, getUserInfo, updateProfile, deleteProfile}