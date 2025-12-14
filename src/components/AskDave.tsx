'use client'

import { useState, useEffect, useRef } from 'react'
import { askDave } from '@/app/actions/ask-dave'
import styles from './AskDave.module.scss'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function AskDave() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Focus input when chat opens
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Escape to close chat
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false)
      }
      // Ctrl+Enter or Cmd+Enter to send message
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && isExpanded) {
        e.preventDefault()
        const form = document.querySelector('form')
        if (form) {
          form.dispatchEvent(
            new Event('submit', { cancelable: true, bubbles: true })
          )
        }
      }
    }
    document.addEventListener('keydown', handleKeyboard)
    return () => document.removeEventListener('keydown', handleKeyboard)
  }, [isExpanded])

  // Focus trap within chat when open
  useEffect(() => {
    if (!isExpanded) return

    const chatWindow = document.querySelector('[role="region"]')
    if (!chatWindow) return

    const focusableElements = chatWindow.querySelectorAll(
      'button, input, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = focusableElements[0] as HTMLElement
    const lastFocusable = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift+Tab: moving backwards
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        // Tab: moving forwards
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isExpanded, messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || loading) return

    const userQuestion = question.trim()
    setQuestion('')
    setLoading(true)

    // Add user message with timestamp
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: userQuestion, timestamp: new Date() },
    ])

    // Get response
    const response = await askDave(userQuestion)

    // Add assistant response with timestamp
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      },
    ])

    setLoading(false)
  }

  const handleClear = () => {
    setMessages([])
    setQuestion('')
    // Focus input after clearing
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  return (
    <div className={styles.container}>
      {isExpanded ? (
        <div
          className={styles.chatWindow}
          role="region"
          aria-label="AI Chat Assistant"
        >
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h3>dave.ask()</h3>
              {loading && (
                <span
                  className={styles.spinner}
                  role="status"
                  aria-label="Loading response"
                >
                  <span aria-hidden="true">⟳</span>
                </span>
              )}
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className={styles.minimizeBtn}
              aria-label="Minimize chat window (Escape)"
              title="Minimize (Esc)"
            >
              <span aria-hidden="true">−</span>
            </button>
          </div>

          <div
            className={styles.messages}
            role="log"
            aria-live="polite"
            aria-atomic="false"
            aria-label="Chat messages"
          >
            {messages.length === 0 ? (
              <div className={styles.welcome}>
                <p>
                  <span aria-hidden="true">👋</span> Hi! dave.ask() me anything
                  about Dave&apos;s experience, projects, or skills.
                </p>
                <p className={styles.examples}>
                  Try: &quot;What experience does Dave have with React?&quot; or
                  &quot;Tell me about Dave&apos;s teaching background.&quot;
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${styles.message} ${styles[msg.role]}`}
                >
                  <div className={styles.messageContent}>
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                  <time
                    className={styles.timestamp}
                    dateTime={msg.timestamp.toISOString()}
                  >
                    <span className="sr-only">
                      {msg.role === 'user'
                        ? 'You asked'
                        : 'Assistant responded'}{' '}
                      at{' '}
                    </span>
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </time>
                </div>
              ))
            )}
            {loading && (
              <div
                className={`${styles.message} ${styles.assistant}`}
                role="status"
                aria-label="Assistant is typing"
              >
                <div className={styles.messageContent}>
                  <span className={styles.typing}>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              ref={inputRef}
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about Dave's experience..."
              disabled={loading}
              maxLength={500}
              className={styles.input}
              aria-label="Ask a question about Dave (Ctrl+Enter to send)"
              aria-describedby="char-count"
            />
            <div className={styles.actions}>
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className={styles.sendBtn}
                aria-label={loading ? 'Sending question' : 'Send question'}
              >
                {loading ? 'Sending...' : 'dave.ask()'}
              </button>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={styles.clearBtn}
                  aria-label="Clear conversation history"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className={styles.expandBtn}
          aria-label="Open AI chat assistant"
        >
          <span aria-hidden="true">💬</span> dave.ask()
        </button>
      )}
    </div>
  )
}
