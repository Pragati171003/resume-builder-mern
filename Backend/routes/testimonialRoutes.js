import express from 'express';
import Testimonial from '../model/Testimonial.js';
import User from '../model/User.js'; 
import authMiddleware from '../middleware/authMiddleware.js';
import nodemailer from 'nodemailer';
import SibApiV3Sdk from '@sendinblue/client';

const router = express.Router();
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) { 
    console.error("GET ALL Testimonials Error:", err);
    res.status(500).json({ msg: "Server Error" }); 
  }
});

router.get('/my-testimonial', authMiddleware, async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({ user: req.user.id });
    res.json(testimonial);
  } catch (err) {
    console.error("My Testimonial Error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const existingTestimonial = await Testimonial.findOne({ user: req.user.id });
    if (existingTestimonial) {
      return res.status(409).json({ msg: "You have already submitted a testimonial." });
    } 
    const newTestimonial = new Testimonial({ ...req.body, user: req.user.id });
    await newTestimonial.save();

    let emailToAdmin = new SibApiV3Sdk.SendSmtpEmail();
    emailToAdmin.subject = '🎉 New Testimonial Submitted on CVCraft!';
    emailToAdmin.htmlContent = `<h2>A new testimonial has been submitted:</h2><p><strong>From:</strong> ${newTestimonial.name}</p><p><strong>Rating:</strong> ${'★'.repeat(newTestimonial.rating)}</p><p><strong>Quote:</strong> "${newTestimonial.quote}"</p>`;
    emailToAdmin.sender = { "name": "CVCraft Admin", "email": process.env.GMAIL_USER };
    emailToAdmin.to = [{ "email": process.env.GMAIL_USER }];

    await apiInstance.sendTransacEmail(emailToAdmin);
    res.status(201).json(newTestimonial);
  } catch (err) { res.status(500).json({ msg: "Server Error" }); }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) { return res.status(404).json({ msg: 'Testimonial not found' }); }

    const currentUser = await User.findById(req.user.id);
    const isAdmin = currentUser.email === process.env.GMAIL_USER;

    if (testimonial.user.toString() !== req.user.id && !isAdmin) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await Testimonial.findByIdAndDelete(req.params.id);
    
    res.json({ msg: 'Testimonial removed successfully' });
  } catch (err) { 
    console.error("DELETE Error:", err); 
    res.status(500).json({ msg: "Server Error" }); 
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    let testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) { return res.status(404).json({ msg: 'Testimonial not found' }); }
    const currentUser = await User.findById(req.user.id);
    const isAdmin = currentUser.email === process.env.GMAIL_USER;
    if (testimonial.user.toString() !== req.user.id && !isAdmin) {
      return res.status(401).json({ msg: 'User not authorized' });
    }  
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    let emailToAdmin = new SibApiV3Sdk.SendSmtpEmail();
    emailToAdmin.subject = '✏️ A Testimonial Was Updated on CVCraft!';
    emailToAdmin.htmlContent = `<h2>A testimonial has been updated:</h2><p><strong>From:</strong> ${updatedTestimonial.name}</p><p><strong>New Rating:</strong> ${'★'.repeat(updatedTestimonial.rating)}</p><p><strong>New Quote:</strong> "${updatedTestimonial.quote}"</p>`;
    emailToAdmin.sender = { "name": "CVCraft Admin", "email": process.env.GMAIL_USER };
    emailToAdmin.to = [{ "email": process.env.GMAIL_USER }];
    
    await apiInstance.sendTransacEmail(emailToAdmin);
    res.json(updatedTestimonial);
  } catch (err) { res.status(500).json({ msg: "Server Error" }); }
});

export default router;