import express from 'express';
import { Resend } from 'resend';

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/submit', async (req, res) => {
  const { email, question } = req.body;

  if (!email || !question) {
    return res.status(400).json({ msg: 'Please provide both an email and a question.' });
  }

  try {
    await resend.emails.send({
      from: 'CVCraft Admin <onboarding@resend.dev>', 
      to: process.env.GMAIL_USER, 
      subject: `❓ New Question from ${email}`,
      html: `<p><strong>From:</strong> ${email}</p><p><strong>Question:</strong> ${question}</p>`,
    });
    
    res.status(200).json({ msg: "Question submitted successfully!" });

  } catch (error) {
    console.error('Resend Error:', error);
    res.status(500).json({ msg: 'Server error: Could not send email.' });
  }
});
export default router;