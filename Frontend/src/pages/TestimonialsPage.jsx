import React, { useState,useEffect } from 'react';
import './TestimonialsPage.css';
import axios from 'axios';
import { FaStar, FaQuoteLeft,FaUserCircle,FaEdit,FaTrash  } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; 

const initialTestimonials = [
  { _id: 'initial-1', name: 'Sarah L.', title: 'Marketing Specialist', quote: 'This resume builder made the job application process so much easier!', rating: 5 },
  { _id: 'initial-2', name: 'Michael B.', title: 'Software Engineer', quote: 'As a developer, I appreciate clean design and efficiency. This tool delivered both.', rating: 5 },
  { _id: 'initial-3', name: 'Jessica T.', title: 'Recent Graduate', quote: 'I was overwhelmed with creating my first professional resume.', rating: 4 },
];

const EditTestimonialForm = ({ testimonial, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    quote: testimonial.quote,
    rating: testimonial.rating, 
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (editData.quote.trim() === '' || editData.rating === 0) {
      setError('Testimonial and rating cannot be empty.');
      return;
    }
    setError('');
    onSave(testimonial._id, editData);
  };

  return (
    <div className="edit-form">
      <textarea
        value={editData.quote}
        onChange={(e) => setEditData({ ...editData, quote: e.target.value })}
        rows="4"
        className={error ? 'input-error' : ''} 
      />
      <div className="edit-star-rating">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <FaStar
              key={ratingValue}
              className="star"
              size={24}
              color={ratingValue <= (hoverRating || editData.rating) ? '#ffc107' : '#e0e0e0'}
              onClick={() => setEditData({ ...editData, rating: ratingValue })}
              onMouseEnter={() => setHoverRating(ratingValue)}
              onMouseLeave={() => setHoverRating(0)}
            />
          );
        })}
      </div>

      {error && <p className="edit-error-message">{error}</p>}
      <div className="edit-actions">
        <button 
          onClick={handleSave} 
          className="btn-save" 
          disabled={editData.quote.trim() === '' || editData.rating === 0}
        >
          Save
        </button>
        <button onClick={onCancel} className="btn-cancel">Cancel</button>
      </div>
    </div>
  );
};


function TestimonialsPage() {
  const { user, isLoggedIn, token } = useAuth();
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [myTestimonial, setMyTestimonial] = useState(null);
  const [formData, setFormData] = useState({ name: '', title: '', quote: '', rating: 0 });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const { data: dbTestimonials } = await axios.get(`${import.meta.env.VITE_API_URL}/api/testimonials`);
        setTestimonials([...initialTestimonials, ...dbTestimonials]);
        if (isLoggedIn) {
          const config = { headers: { Authorization: token } };
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/testimonials/my-testimonial`, config);
          setMyTestimonial(data);
        }
      } catch (err) { 
        console.error("Failed to fetch data, showing initial testimonials.", err);
        setTestimonials(initialTestimonials); 
      }
    };
    fetchAllData();
  }, [isLoggedIn, token]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      return setError("You must be logged in to submit a testimonial.");
    }
    if (formData.name && formData.quote && formData.rating > 0) {
      try {
        const config = { headers: { Authorization: token } };
        const { data: newTestimonial } = await axios.post(`${import.meta.env.VITE_API_URL}/api/testimonials`, formData, config);
        setTestimonials([newTestimonial, ...testimonials]);
        setIsSubmitted(true);
        setError('');
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setError(err.response.data.msg);
        } else {
          setError('An error occurred. Please try again.');
        }
      }
    } else {
      setError('Please fill in your name, a quote, and select a rating.');
    }
  };

  const handleDelete = async (testimonialId) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const config = { headers: { Authorization: token } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/testimonials/${testimonialId}`, config);
        setTestimonials(testimonials.filter(t => t._id !== testimonialId));
      } catch (err) {
        alert("Failed to delete testimonial. You may not be authorized.");
      }
    }
  };
  const handleUpdate = async (testimonialId, updatedData) => {
    try {
      const config = { headers: { Authorization: token } };
      const { data: updatedTestimonial } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/testimonials/${testimonialId}`,
        updatedData,
        config
      );
      setTestimonials(testimonials.map(t => t._id === testimonialId ? updatedTestimonial : t));
      setEditingId(null); 
    } catch (err) {
      alert("Failed to update testimonial.");
    }
  };

  const testimonialsToDisplay = [
    ...(myTestimonial ? [myTestimonial] : []),
    ...testimonials.filter(t => t._id !== myTestimonial?._id),
  ];

  return (
    <div className="testimonials-page">
      <section className="testimonials-hero">
        <h1>Trusted by Professionals Worldwide</h1>
        <p>See how our users have successfully advanced their careers.</p>
      </section>

      <section className="testimonials-grid-section">
        <div className="testimonials-grid">
          {testimonialsToDisplay.map((testimonial, index) => (
            <div key={testimonial._id || `initial-${index}`} className="testimonial-card">
              {editingId === testimonial._id ? (
                <EditTestimonialForm 
                  testimonial={testimonial}
                  onSave={handleUpdate}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  {isLoggedIn && (user?._id === testimonial.user || user?.email === 'pragathikolasani1710@gmail.com') && (
                    <div className="card-actions">
                      <button onClick={() => setEditingId(testimonial._id)} className="btn-edit"><FaEdit /></button>
                      <button onClick={() => handleDelete(testimonial._id)} className="btn-delete"><FaTrash /></button>
                    </div>
                  )}
                  <FaQuoteLeft className="quote-icon" />
                  <p className="testimonial-quote">"{testimonial.quote}"</p>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => ( <FaStar key={i} color={i < testimonial.rating ? '#ffc107' : '#e4e5e9'} /> ))}
                  </div>
                  <div className="author-info">
                    <div className="author-avatar-icon"><FaUserCircle /></div>
                    <div>
                      <p className="author-name">{testimonial.name}</p>
                      <p className="author-title">{testimonial.title}</p>
                    </div>
                  </div>
                </>
              )}
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
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Title / Position (Optional)" />
              <textarea id="quote" name="quote" value={formData.quote} onChange={handleChange} rows="5" placeholder="Your Testimonial" required></textarea>
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
              {error && <p className="form-error-message">{error}</p>}
              <button type="submit" className="submit-button">Submit Testimonial</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
