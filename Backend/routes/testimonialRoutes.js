import express from 'express';
import Testimonial from '../model/Testimonial.js';
import User from '../model/User.js'; 
import authMiddleware from '../middleware/authMiddleware.js';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);
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

    await resend.emails.send({
      from: 'CVCraft Admin <onboarding@resend.dev>',
      to: process.env.GMAIL_USER,
      subject: '🎉 New Testimonial Submitted!',
      html: `<h2>A new testimonial has been submitted:</h2>...`,
    });
    
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
    await resend.emails.send({
      from: 'CVCraft Admin <onboarding@resend.dev>',
      to: process.env.GMAIL_USER,
      subject: '✏️ A Testimonial Was Updated!',
      html: `<h2>A testimonial has been updated:</h2>...`,
    });
    
    res.json(updatedTestimonial);
  } catch (err) { res.status(500).json({ msg: "Server Error" }); }
});

export default router;