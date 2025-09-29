import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/submit', async (req, res) => {
  const { email, question } = req.body;

  if (!email || !question) {
    return res.status(400).json({ msg: 'Please provide both an email and a question.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailToAdmin = {
      from: `"CVCRAFT Inquiry" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New Question from ${email}`,
      html: `<p><strong>From:</strong> ${email}</p><p><strong>Question:</strong> ${question}</p>`,
    };

    const mailToUser = {
      from: `"CVCRAFT Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'We Have Received Your Question!',
      html: `<h2>Hello we are from cvcraft.</h2><h3>Thank you for contacting us!</h3><p>We've received your question and will get back to you shortly.</p>`,
    };

    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(mailToUser);

    res.status(200).json({ msg: 'Question submitted successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ msg: 'Server error: Could not send email.' });
  }
});
export default router;