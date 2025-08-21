import React, { useState, useEffect } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [formStartTime] = useState(Date.now())

  // Load reCAPTCHA v3
  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window !== 'undefined' && window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'contact_form' })
            .then((token) => {
              setRecaptchaToken(token)
            })
        })
      }
    }

    // Load reCAPTCHA script if not already loaded
    if (typeof window !== 'undefined' && !window.grecaptcha) {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
      script.onload = loadRecaptcha
      document.head.appendChild(script)
    } else {
      loadRecaptcha()
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    const { name, email, message } = formData
    
    if (!name.trim() || name.length < 2) {
      setSubmitStatus({ type: 'error', message: 'Name must be at least 2 characters long.' })
      return false
    }
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return false
    }
    
    if (!message.trim() || message.length < 10) {
      setSubmitStatus({ type: 'error', message: 'Message must be at least 10 characters long.' })
      return false
    }

    // Basic spam detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'click here', 'free money']
    const messageText = message.toLowerCase()
    if (spamKeywords.some(keyword => messageText.includes(keyword))) {
      setSubmitStatus({ type: 'error', message: 'Message contains prohibited content.' })
      return false
    }

    // Advanced spam detection
    const formDuration = Date.now() - formStartTime
    if (formDuration < 5000) {
      setSubmitStatus({ type: 'error', message: 'Form submitted too quickly. Please try again.' })
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // Always prevent default to handle with JavaScript
    
    // Validate form first
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Get fresh reCAPTCHA token
      let token = recaptchaToken
      if (window.grecaptcha) {
        token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'contact_form' })
      }
      
      // Prepare form data following Netlify's exact AJAX pattern
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('form-name', 'contact')
      formDataToSubmit.append('name', formData.name)
      formDataToSubmit.append('email', formData.email)
      formDataToSubmit.append('message', formData.message)
      formDataToSubmit.append('g-recaptcha-response', token || '')
      formDataToSubmit.append('timestamp', Date.now().toString())
      
      // Submit to Netlify using their recommended pattern
      const response = await fetch('/favicon.ico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSubmit).toString()
      })

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Network response was not ok')
      }
      
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({ type: 'error', message: 'Sorry, there was an error sending your message. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit}>
        {/* Hidden fields for Netlify */}
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="g-recaptcha-response" value="" />
        <input type="hidden" name="timestamp" value="" />
        
        {submitStatus && (
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
        <ul className="actions">
          <li>
            <input 
              type="submit" 
              value={isSubmitting ? "Sending..." : "Send Message"} 
              className="special" 
              disabled={isSubmitting}
            />
          </li>
          <li>
            <input 
              type="button" 
              value="Reset" 
              onClick={() => {
                setFormData({ name: '', email: '', message: '' })
                setSubmitStatus(null)
              }}
              disabled={isSubmitting}
            />
          </li>
        </ul>
      </form>

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
  )
}

export default ContactForm
