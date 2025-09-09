import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./FAQ.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "Can I edit my resume after downloading?",
    answer:
      "Yes! Once you download your resume, you can edit it anytime using your preferred document editor. You can also come back to our platform to make adjustments and generate a new version.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely! Your data is encrypted and stored securely. We never share your personal information with third parties.",
  },
  {
    question: "What file formats can I download my resume in?",
    answer:
      "You can download your resume in PDF, DOCX, and TXT formats depending on your preference.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="faq-section">
      <div className="faq-left">
        <span className="faq-badge">FAQs</span>
        <h2>Answers to Your Most Common Resume Questions</h2>
        <p>Get clarity on how our AI resume builder works.</p>
        
        {/* 2. CHANGE THE BUTTON TO A LINK that goes to the new page */}
        <Link to="/all-faqs" className="faq-btn">
          View all FAQs
        </Link>
      </div>
      <div className="faq-right">
        {/* The rest of this component stays exactly the same */}
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              {openIndex === index ? <FaMinus /> : <FaPlus />}
            </div>
            {openIndex === index && (
              <div className="faq-answer"><p>{faq.answer}</p></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
