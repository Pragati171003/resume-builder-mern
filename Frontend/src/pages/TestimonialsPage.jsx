import React, { useState } from "react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      name: "Sarah L.",
      quote: "This service completely exceeded my expectations!",
      rating: 5,
      avatar: "https://i.pravatar.cc/50?img=1"
    },
    {
      name: "James T.",
      quote: "Reliable, fast, and excellent customer support.",
      rating: 4,
      avatar: "https://i.pravatar.cc/50?img=2"
    },
    {
      name: "Priya K.",
      quote: "I recommend this to all my colleagues. Superb quality!",
      rating: 5,
      avatar: "https://i.pravatar.cc/50?img=3"
    }
  ]);

  const [formData, setFormData] = useState({ name: "", quote: "", rating: 0 });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitted) return; // Prevent multiple submissions

    if (formData.name && formData.quote && formData.rating > 0) {
      const newTestimonial = {
        ...formData,
        isIcon: true,
        avatar: "https://i.imgur.com/m5246RN.png"
      };
      setTestimonials((prevTestimonials) => [
        ...prevTestimonials,
        newTestimonial
      ]);
      setIsSubmitted(true); // Mark as submitted
    } else {
      alert("Please fill in your name, a quote, and select a rating.");
    }
  };

  return (
    <div>
      <h2>Testimonials</h2>
      <div>
        {testimonials.map((t, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <img
              src={t.avatar}
              alt={t.name}
              style={{ borderRadius: "50%", width: "40px" }}
            />
            <p>
              <strong>{t.name}</strong>: "{t.quote}"
            </p>
            <p>Rating: {"⭐".repeat(t.rating)}</p>
          </div>
        ))}
      </div>

      {!isSubmitted && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          <textarea
            name="quote"
            placeholder="Your testimonial"
            value={formData.quote}
            onChange={handleChange}
          />
          <br />
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            <option value={0}>Select rating</option>
            <option value={1}>⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}

      {isSubmitted && <p>✅ Thank you! You have already submitted a testimonial.</p>}
    </div>
  );
};

export default Testimonials;
