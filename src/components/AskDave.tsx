'use client'

import { useState } from 'react'
import { askDave } from '@/app/actions/ask-dave'
import styles from './AskDave.module.scss'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AskDave() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  console.log('AskDave component mounted, isExpanded:', isExpanded)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || loading) return

    const userQuestion = question.trim()
    setQuestion('')
    setLoading(true)

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: userQuestion }])

    // Get response
    const response = await askDave(userQuestion)

    // Add assistant response
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: response.message,
      },
    ])

    setLoading(false)
  }

  const handleClear = () => {
    setMessages([])
    setQuestion('')
  }

  return (
    <div className={styles.container}>
      {isExpanded ? (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h3>dave.ask()</h3>
              {loading && <span className={styles.spinner}>⟳</span>}
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className={styles.minimizeBtn}
              aria-label="Minimize chat"
            >
              −
            </button>
          </div>

          <div className={styles.messages}>
            {messages.length === 0 ? (
              <div className={styles.welcome}>
                <p>
                  👋 Hi! dave.ask() me anything about Dave&apos;s experience,
                  projects, or skills.
                </p>
                <p className={styles.examples}>
                  Try: &quot;What experience does Dave have with React?&quot; or &quot;Tell me
                  about Dave&apos;s teaching background.&quot;
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
                </div>
              ))
            )}
            {loading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.messageContent}>
                  <span className={styles.typing}>Thinking...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about Dave's experience..."
              disabled={loading}
              maxLength={500}
              className={styles.input}
            />
            <div className={styles.actions}>
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className={styles.sendBtn}
              >
                {loading ? 'Sending...' : 'dave.ask()'}
              </button>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={styles.clearBtn}
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
          aria-label="Open chat"
        >
          💬 dave.ask()
        </button>
      )}
    </div>
  )
}
