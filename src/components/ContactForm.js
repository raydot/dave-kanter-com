import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const myForm = e.target;
    const formData = new FormData(myForm);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        setSubmitStatus({ type: 'error', message: 'Sorry, there was an error. Please try again.' });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      {submitStatus?.type === 'success' ? (
        <div className="status-message success">
          <h3>Thank You!</h3>
          <p>Your message has been sent successfully. I'll get back to you as soon as possible.</p>
          <ul className="actions">
            <li>
              <a href="/" className="button special">Back to Home</a>
            </li>
          </ul>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-recaptcha="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          {submitStatus?.type === 'error' && (
            <div className={`status-message ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}
          <div className="field half first">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              maxLength="100"
            />
          </div>
          <div className="field half">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              maxLength="100"
            />
          </div>
          <div className="field">
            <label htmlFor="message">Message *</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              maxLength="1000"
              placeholder="Please share your message here..."
            ></textarea>
          </div>
          <div data-netlify-recaptcha="true"></div>
          <ul className="actions">
            <li>
              <input
                type="submit"
                value={isSubmitting ? 'Sending...' : 'Send Message'}
                className="special"
                disabled={isSubmitting}
              />
            </li>
            <li>
              <input
                type="button"
                value="Reset"
                onClick={() => {
                  setFormData({ name: '', email: '', message: '' });
                  setSubmitStatus(null);
                }}
                disabled={isSubmitting}
              />
            </li>
          </ul>
        </form>
      )}

      <style jsx>{`
        .status-message {
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 4px;
          font-weight: 500;
        }

        .status-message.success {
          background: rgba(76, 205, 196, 0.1);
          border: 1px solid #4ECDC4;
          color: #4ECDC4;
        }

        .status-message.error {
          background: rgba(255, 107, 107, 0.1);
          border: 1px solid #ff6b6b;
          color: #ff6b6b;
        }

        .field {
          margin-bottom: 1rem;
        }

        .field label {
          display: block;
          margin-bottom: 0.25rem;
          font-weight: 600;
        }

        .field input,
        .field textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border-radius: 4px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .field input:disabled,
        .field textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .field textarea {
          padding-bottom: 1.5rem;
          resize: vertical;
          min-height: 120px;
        }

        .field input:focus,
        .field textarea:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.15);
        }

        .field.half {
          display: inline-block;
          width: 48%;
        }

        .field.half.first {
          margin-right: 4%;
        }

        .actions {
          list-style: none;
          padding: 0;
          margin-top: 2rem;
        }

        .actions li {
          display: inline-block;
          margin-right: 1rem;
        }

        .actions input[type="submit"],
        .actions input[type="button"] {
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
          text-align: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          line-height: 1;
        }

        .actions input[type="submit"]:disabled,
        .actions input[type="button"]:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .actions input[type="submit"].special {
          background: #4ECDC4;
          color: white;
        }

        .actions input[type="submit"].special:hover:not(:disabled) {
          background: #45b7aa;
        }

        .actions input[type="button"] {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .actions input[type="button"]:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
          .field.half {
            width: 100%;
            margin-right: 0;
          }
          
          .field.half.first {
            margin-right: 0;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default ContactForm;
