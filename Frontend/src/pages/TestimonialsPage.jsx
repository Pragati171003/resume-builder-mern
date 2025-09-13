import React, { useState } from 'react';
import './TestimonialsPage.css';
import { FaStar, FaQuoteLeft,FaUserCircle  } from 'react-icons/fa';

const initialTestimonials = [
  { name: 'Sarah L.', title: 'Marketing Specialist', quote: 'This AI-powered resume builder made the job application process so much easier! The suggestions were spot-on...', rating: 5, avatar: 'https://i.imgur.com/nJ2Wb4A.png' },
  { name: 'Michael B.', title: 'Software Engineer', quote: 'As a developer, I appreciate clean design and efficiency. This tool delivered both. The ATS-friendly templates gave me peace of mind...', rating: 5, avatar: 'https://i.imgur.com/Q2eY72s.png' },
  { name: 'Jessica T.', title: 'Recent Graduate', quote: 'I was overwhelmed with creating my first professional resume. This builder guided me through every step. It’s intuitive, fast, and the final result gave me confidence...', rating: 4, avatar: 'https://i.imgur.com/k2OV5cf.png' },
];

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [formData, setFormData] = useState({ name: '', title: '', quote: '', rating: 0 });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.quote && formData.rating > 0) {
      const newTestimonial = { ...formData,isIcon: true, avatar: 'https://i.imgur.com/m5246RN.png' };
      setTestimonials((prevTestimonials) => [...prevTestimonials, newTestimonial]);
      setIsSubmitted(true);
    } else {
      alert('Please fill in your name, a quote, and select a rating.');
    }
  };

  return (
    <div className="testimonials-page">
      <section className="testimonials-hero">
        <h1>Trusted by Professionals Worldwide</h1>
        <p>See how our users have successfully advanced their careers.</p>
      </section>

      <section className="testimonials-grid-section">
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => ( <FaStar key={i} color={i < testimonial.rating ? '#ffc107' : '#e4e5e9'} /> ))}
              </div>
              <div className="author-info">
                
                {testimonial.isIcon ? (
                  <div className="author-avatar-icon">
                    <FaUserCircle />
                  </div>
                ) : (
                  <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                )}
                <div>
                  <p className="author-name">{testimonial.name}</p>
                  <p className="author-title">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="submission-section">
        <div className="form-wrapper">
          <h2>Share Your Story With Us</h2>
          <p>We'd love to hear about your success. Submit your testimonial below.</p>
          
          {isSubmitted ? (
            <div className="thank-you-message">
              <h3>Thank you for your feedback!</h3>
              <p>Your story has been received.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="testimonial-form">
              <div className="input-field-group">
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder=" " required />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="input-field-group">
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder=" " />
                <label htmlFor="title">Title / Position</label>
              </div>
              <div className="input-field-group">
                <textarea id="quote" name="quote" value={formData.quote} onChange={handleChange} rows="5" placeholder=" " required></textarea>
                <label htmlFor="quote">Your Testimonial</label>
              </div>
              <div className="rating-group">
                <span className="rating-label">Your Rating</span>
                <div className="star-rating-input">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <FaStar
                        key={ratingValue}
                        className="star"
                        size={32}
                        color={ratingValue <= (hoverRating || formData.rating) ? '#ffc107' : '#e0e0e0'}
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
        </div>
      </section>
    </div>
  );
}

export default TestimonialsPage;