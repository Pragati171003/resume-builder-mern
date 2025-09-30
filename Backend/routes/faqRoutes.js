import express from 'express';
import SibApiV3Sdk from '@sendinblue/client';

const router = express.Router();
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;

router.post('/submit', async (req, res) => {
  const { email, question } = req.body;

  if (!email || !question) {
    return res.status(400).json({ msg: 'Please provide both an email and a question.' });
  }

  try {
    let emailToAdmin = new SibApiV3Sdk.SendSmtpEmail();
    emailToAdmin.subject = `❓ New Question from ${email}`;
    emailToAdmin.htmlContent = `<p><strong>From:</strong> ${email}</p><p><strong>Question:</strong> ${question}</p>`;
    emailToAdmin.sender = { "name": "CVCraft Inquiry", "email": process.env.GMAIL_USER };
    emailToAdmin.to = [{ "email": process.env.GMAIL_USER }];
    emailToAdmin.replyTo = { "email": email }; // If you reply, it goes to the USER

    // Magnificent email to the USER
    let emailToUser = new SibApiV3Sdk.SendSmtpEmail();
    emailToUser.subject = "We Have Received Your Question!";
    emailToUser.htmlContent = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Thank you for contacting CVCraft!</h2>
        <p>We've received your question and will get back to you as soon as possible.</p>
      </div>
    `;
    emailToUser.sender = { "name": "CVCraft Support", "email": process.env.GMAIL_USER };
    emailToUser.to = [{ "email": email }];

    await apiInstance.sendTransacEmail(emailToAdmin);
    await apiInstance.sendTransacEmail(emailToUser);
    
    res.status(200).json({ msg: "Question submitted successfully!" });

  } catch (error) {
    console.error('Resend Error:', error);
    res.status(500).json({ msg: 'Server error: Could not send email.' });
  }
});
export default router;