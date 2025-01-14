/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
require('dotenv').config();
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');


const { EMAIL_USER, EMAIL_PASS } = process.env;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${EMAIL_USER}`,
        pass: `${EMAIL_PASS}`
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(500).send("Error sending message");
    }

    const mailOptions = {
        from: `<${email}>`,
        to: "killerbyrd12@gmail.com",
        cc: `${email}`,
        subject: "Sponsorship Inquiry",
        text: `Name: ${name} \n
                    Email: ${email} \n
                    Message: ${message}`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send("Message Sent");
        return;
    });
})

