import React, { useState } from 'react';
import './AllFAQsPage.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import axios from 'axios'; 

const allFaqs = [
  { question: "Can I edit my resume after downloading?", answer: "Yes! Once you download your resume, you can edit it anytime using your preferred document editor. You can also come back to our platform to make adjustments and generate a new version." },
  { question: "Is my data secure?", answer: "Absolutely! Your data is encrypted and stored securely. We never share your personal information with third parties." },
  { question: "What file formats can I download my resume in?", answer: "You can download your resume in PDF, DOCX, and TXT formats depending on your preference." },
  { question: "Can I use this service for free?", answer: "Yes, we offer a free plan with access to basic templates and features. Our Pro plan unlocks advanced AI tools and premium designs." },
  { question: "Do you offer customer support?", answer: "Yes, all users have access to email support. Pro plan subscribers receive priority support with faster response times." },
];

function AllFAQsPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({ email: '', question: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    setError('');
    if (formData.email && formData.question) {
    try {
      await axios.post('http://localhost:5000/api/faq/submit', formData);
      setIsSubmitted(true); 
    } catch (err) {
    console.error("Submission error:", err);
    setError(err.response?.data?.msg || 'Failed to submit your question. Please try again later.');
    }
  }
  };

  return (
    <div className="all-faqs-page">
      <section className="faq-list-container">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list-full">
          {allFaqs.map((faq, index) => (
            <div key={index} className={`faq-item-full ${openIndex === index ? 'open' : ''}`} onClick={() => toggleFAQ(index)}>
              <div className="faq-question-full">
                <span>{faq.question}</span>
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </div>
              {openIndex === index && (
                <div className="faq-answer-full"><p>{faq.answer}</p></div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="ask-question-container">
        <h2>Can't Find Your Answer?</h2>
        <p>Submit your question below, and our team will get back to you via email.</p>
        
        {isSubmitted ? (
          <div className="thank-you-message">
            <h3>Thank you for your question!</h3>
            <p>We've received it and will respond to the email you provided within few days.</p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="faq-submission-form">
            <input
              type="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <textarea
              rows="5"
              placeholder="Type your question here..."
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
            ></textarea>
            <button type="submit">Ask Question</button>
          </form>
        )}
      </section>
    </div>
  );
}

export default AllFAQsPage;