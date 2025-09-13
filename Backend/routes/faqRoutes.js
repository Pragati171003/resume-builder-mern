 const express = require('express');
 const nodemailer = require('nodemailer');
 const router = express.Router();

 // POST route to handle the form submission
 router.post('/submit', async (req, res) => {
   const { email, question } = req.body;

   if (!email || !question) {
     return res.status(400).json({ msg: 'Please provide both an email and a question.' });
   }

   try {
     // 1. Set up the "transporter" (how you will send the email)
     // MAGNIFICENT TIP: Use Gmail with an "App Password" for easy setup.
     // Go here to create one: https://myaccount.google.com/apppasswords
     const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'your-email@gmail.com', // Your Gmail address
         pass: 'your-16-character-app-password', // The App Password you generated
       },
     });

     // 2. Prepare the email to send TO YOU (the admin)
     const mailToAdmin = {
       from: '"Your App Name" <your-email@gmail.com>',
       to: 'your-admin-email@example.com', // The email where you receive questions
       subject: 'New FAQ Submission!',
       html: `<p>You received a new question from: <strong>${email}</strong></p>
              <p><strong>Question:</strong></p>
              <p>${question}</p>`,
     };

     // 3. Prepare the confirmation email to send TO THE USER
     const mailToUser = {
       from: '"Your App Name" <your-email@gmail.com>',
       to: email, // The user's email address
       subject: 'We Have Received Your Question!',
       html: `<h3>Thank you for contacting us!</h3>
              <p>We've received your question and our team will get back to you shortly.</p>
              <p><strong>Your Question:</strong> ${question}</p>`,
     };

     // 4. Send both emails
     await transporter.sendMail(mailToAdmin);
     await transporter.sendMail(mailToUser);

     res.status(200).json({ msg: 'Question submitted successfully!' });

   } catch (error) {
     console.error('Error sending email:', error);
     res.status(500).json({ msg: 'Server error: Could not send email.' });
   }
 });

 module.exports = router