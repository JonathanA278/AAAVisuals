const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aaavisualsshotit@gmail.com', // Your Gmail address
        pass: 'ant3737.'    // Your Gmail app password
    }
});

// Twilio configuration
const twilioClient = twilio('your_twilio_account_sid', 'your_twilio_auth_token');

app.post('/send-contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Send email
        await transporter.sendMail({
            from: 'your_email@gmail.com', // Your Gmail address
            to: 'aaavisualsshotit@gmail.com',   // Your Gmail address (or recipient email)
            subject: `New Contact Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });

        // Send SMS
        await twilioClient.messages.create({
            body: `New Contact Message:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
            from: 'your_twilio_number', // Your Twilio phone number
            to: '732-298-4259'    // Your personal phone number
        });

        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send message');
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
