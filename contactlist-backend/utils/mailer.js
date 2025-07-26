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

const sendVerificationLink = async (email,verificationLink) => {
    await transporter.sendMail({
        from: `"Contact List App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify Your Email',
        html: `<p>Click the link to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`,
    })
}

const sendResetPasswordLink = async (email,resetLink) => {
    await transporter.sendMail({
        from: `"Contact List App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset your password",
        html: `<p>Click the link below to reset your password:</p> <a href="${resetLink}">Reset Password</a>`,
    })
}

module.exports = {send2FACode, sendVerificationLink, sendResetPasswordLink}

