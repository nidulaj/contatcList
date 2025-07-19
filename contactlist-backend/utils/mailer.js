const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    }
})

const send2FACode = async (email, code) => {
    await transporter.sendMail({
        from: `"Contact List App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your 2FA Code",
        text: `Your 2FA verification code is: ${code}`,
    })
}

module.exports = {send2FACode}

