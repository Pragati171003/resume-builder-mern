import React, { useState } from 'react';
import './TestimonialsPage.css'; // We'll create this file next

// Icons for a polished look
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

// --- MOCK DATA ---
// In a real app, this would come from a database.
const initialTestimonials = [
  {
    name: 'Sarah L.',
    title: 'Marketing Specialist',
    quote: 'This AI-powered resume builder made the job application process so much easier! The suggestions were spot-on, and my resume looks more professional than ever. I landed an interview within a week!',
    rating: 5,
    avatar: 'https://i.imgur.com/nJ2Wb4A.png', // Generic female avatar
  },
  {
    name: 'Michael B.',
    title: 'Software Engineer',
    quote: 'As a developer, I appreciate clean design and efficiency. This tool delivered both. The ATS-friendly templates gave me peace of mind, and the real-time preview is a game-changer. Highly recommended.',
    rating: 5,
    avatar: 'https://i.imgur.com/Q2eY72s.png', // Generic male avatar
  },
  {
    name: 'Jessica T.',
    title: 'Recent Graduate',
    quote: 'I was overwhelmed with creating my first professional resume. This builder guided me through every step. It’s intuitive, fast, and the final result gave me the confidence I needed to start applying for jobs.',
    rating: 4,
    avatar: 'https://i.imgur.com/k2OV5cf.png', // Generic female avatar
  },
];
// --- END OF MOCK DATA ---

function TestimonialsPage() {
  // State to hold the list of all testimonials
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  // State to manage the form inputs
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    quote: '',
    rating: 0,
  });

  // State to manage the star rating hover effect
  const [hoverRating, setHoverRating] = useState(0);

  // State to show a "Thank You" message after submission
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handles changes for text inputs and textarea
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    if (formData.name && formData.quote && formData.rating > 0) {
      // Add the new testimonial to our list
      const newTestimonial = { ...formData, avatar: 'https://i.imgur.com/m5246RN.png' }; // Generic user icon for new submissions
      setTestimonials((prevTestimonials) => [...prevTestimonials, newTestimonial]);
      setIsSubmitted(true); // Show the thank you message
    } else {
      alert('Please fill in your name, a quote, and select a rating.');
    }
  };

  return (
    <div className="testimonials-page">
      {/* Section 1: Hero */}
      <section className="testimonials-hero">
        <h1>Trusted by Professionals Worldwide</h1>
        <p>See how our users have successfully advanced their careers with our AI Resume Builder.</p>
      </section>

      {/* Section 2: Display Existing Testimonials */}
      <section className="testimonials-grid-section">
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < testimonial.rating ? '#ffc107' : '#e4e5e9'} />
                ))}
              </div>
              <div className="author-info">
                <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                <div>
                  <p className="author-name">{testimonial.name}</p>
                  <p className="author-title">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Submission Form */}
      <section className="submission-section">
        <h2>Share Your Story With Us</h2>
        <p>We'd love to hear about your success. Submit your testimonial below.</p>
        
        {isSubmitted ? (
          <div className="thank-you-message">
            <h3>Thank you for your feedback!</h3>
            <p>Your testimonial has been added to the page. (Note: It will be gone on page refresh as this is a demo).</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="testimonial-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title / Position</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Product Manager" />
            </div>
            <div className="form-group">
              <label htmlFor="quote">Your Testimonial</label>
              <textarea id="quote" name="quote" value={formData.quote} onChange={handleChange} rows="5" placeholder="Tell us about your experience..." required></textarea>
            </div>
            <div className="form-group">
              <label>Your Rating</label>
              <div className="star-rating-input">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FaStar
                      key={ratingValue}
                      className="star"
                      size={28}
                      color={ratingValue <= (hoverRating || formData.rating) ? '#ffc107' : '#e4e5e9'}
                      onClick={() => setFormData({ ...formData, rating: ratingValue })}
                      onMouseEnter={() => setHoverRating(ratingValue)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  );
                })}
              </div>
            </div>
            <button type="submit" className="submit-button">Submit Testimonial</button>
          </form>
        )}
      </section>
    </div>
  );
}

export default TestimonialsPage;