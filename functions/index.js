/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');

const cors = require("cors");

// Initialize the CORS middleware
const corsMiddleware = cors({ origin: true });


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'killerbyrd12@gmail.com',
        pass: 'brsw kazj pxsy kvvq'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    corsMiddleware(req, res, () => {

        const { name, email, message } = req.body;

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
        });
    });
})