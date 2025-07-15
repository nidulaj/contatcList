const jwt = require('jsonwebtoken');
const {findUserByCredentials, createUser, findUserByUsername, updateUser, deleteUser} = require('../models/userModel')

const login = async (req, res) => {
    const {username, password} = req.body

    try{
        const user = await findUserByCredentials(username, password)

        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
        const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d', });
        res.json({ accessToken , refreshToken});
        console.log("Access Token:", accessToken);
console.log("Refresh Token:", refreshToken);
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

const refreshToken = (req, res) => {
    const {refreshToken} = req.body

    if(!refreshToken){
        return res.status(401).json({message : "Refresh token is missing"})
    }

   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log("New access token generated")
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ accessToken });
  });

}

module.exports = {login, register, getUserInfo, updateProfile, deleteProfile, refreshToken}