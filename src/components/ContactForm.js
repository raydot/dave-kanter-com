import React from 'react'

const ContactForm = () => {
  return (
    <>
      <form name="contact" method="POST" action="/success" data-netlify="true" data-netlify-recaptcha="true" data-netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="contact" />
        
        <div className="field half first">
          <label htmlFor="name">Name *</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            required 
            maxLength="100"
          />
        </div>
        <div className="field half">
          <label htmlFor="email">Email *</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            required 
            maxLength="100"
          />
        </div>
        <div className="field">
          <label htmlFor="message">Message *</label>
          <textarea 
            name="message" 
            id="message" 
            rows="4"
            required
            maxLength="1000"
            placeholder="Please share your message here..."
          ></textarea>
        </div>
        <div data-netlify-recaptcha="true"></div>
        <ul className="actions">
          <li>
            <input 
              type="submit" 
              value="Send Message" 
              className="special" 
            />
          </li>
          <li>
            <input 
              type="reset" 
              value="Reset" 
            />
          </li>
        </ul>
      </form>

      <style jsx>{`
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
        .actions input[type="reset"] {
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

        .actions input[type="submit"].special {
          background: #4ECDC4;
          color: white;
        }

        .actions input[type="submit"].special:hover {
          background: #45b7aa;
        }

        .actions input[type="reset"] {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .actions input[type="reset"]:hover {
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
  )
}

export default ContactForm
