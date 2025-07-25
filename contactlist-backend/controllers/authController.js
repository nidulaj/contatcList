const jwt = require('jsonwebtoken');
const {findUserByCredentials, createUser, findUserByUsername, updateUser, deleteUser, send2FACodeToDB, get2FA, delete2FA, get2FAStatus, change2FAStatus, emailVerification} = require('../models/userModel')
const {send2FACode, sendVerificationLink} = require('../utils/mailer');

const login = async (req, res) => {
    const {username, password} = req.body

    try{
        const user = await findUserByCredentials(username, password)

        if(!user){
            return res.status(401).json({ message: "User not found" ,userNotFound: true});
        }

        if(user.password !== password){
            return res.status(401).json({ message: "Invalid password", invalidPassword: true });
        }

        if (!user.is_verified) {
            return res.status(403).json({ message: 'Please verify your email first.', isVerified: false});
        }

        if(user.two_fa_enabled){
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            await send2FACodeToDB(code, user.id)
            await send2FACode(user.email, code)

            const tempToken = jwt.sign({ username: user.username }, process.env.TEMP_TOKEN_SECRET, { expiresIn: "5m" });
            return res.status(200).json({ is2FAEnabled: true, tempToken });
        }
        else{
            const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
        const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d', });
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
        return res.status(200).json({ is2FAEnabled: false, accessToken, refreshToken });
        }

        
    } catch(err){
        console.error('Login Error:', err);
        res.status(500).json({error:'Server error'})
    }
};

const register = async (req, res) => {
    const {firstName, lastName, email, username, password} = req.body

    try{
        console.log("start register")
        const existingUser = await findUserByUsername(username)
        if(existingUser){
            console.log("exisiting user")
            return res.status(409).json({message: "Username is already registered. Try another username."})
        }

        const newUser = await createUser(firstName, lastName, email, username, password)
        
        const emailToken = jwt.sign({ username: username }, process.env.EMAIL_TOKEN_SECRET, { expiresIn: '1d' });
        console.log("token", emailToken)
        const verificationLink = `http://localhost:5000/auth/verify-email?token=${emailToken}`;
        await sendVerificationLink(newUser.email, verificationLink);
        console.log("link",verificationLink)
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

const verify2FA = async (req, res) => {
    const username = req.user.username
    const {code} = req.body

    try{
        console.log("username*****",username,"code: ",code)
        const verifyedUser = await get2FA(username, code)
        console.log("verified code : ",verifyedUser)

        if(!verifyedUser){
            return res.status(401).json({ message: "Invalid 2FA code" });
        }

        const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
        const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d', });

        await delete2FA(username)
        res.json({ accessToken, refreshToken });

    } catch (err){
        console.error('2FA verify error:', err)
        res.status(500).json({ message: "2FA verification error", error: err.message });
    }
}

const toggle2FA= async (req, res) => {
    
    try{
        const username = req.user.username
        const status = await get2FAStatus(username);
         const newStatus = await change2FAStatus(status, username);
        res.json({ success: true, twoFAEnabled: newStatus });

    } catch(err){
        console.error('2FA toggle error:', err)
        res.status(500).json({ message: 'Internal server error' })
    }

}

const verifyEmail = async (req, res) => {
    const token = req.query.token;

    try{
        const decoded = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);
        const username = decoded.username;
        await emailVerification(username)
        res.redirect('http://localhost:5173/verify-email');

    }catch (err) {
        res.status(400).json({ message: 'Invalid or expired token' });
  }
}

module.exports = {login, register, getUserInfo, updateProfile, deleteProfile, refreshToken, verify2FA, toggle2FA, verifyEmail}