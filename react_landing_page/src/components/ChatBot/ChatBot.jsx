import './ChatBot.css'
import { useState } from 'react'

function ChatBot() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setLoading(true)
    setInput('')

    alert(JSON.stringify({ messages: newMessages }))
    try {
        const safeMessages = newMessages.filter(
        (msg) => msg.role && typeof msg.content === 'string' && msg.content.trim() !== ''
        )

        const res = await fetch('/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: safeMessages })
        })


      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.response }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-box">
        <div className="chat-title">🤖 Personal AI Chatbot</div>
        <div className="chat-subtitle">Ask me anything about my skills, experience, or projects!</div>

        <div className="chat-history">
          {messages
            .filter((msg) => msg.role !== 'system')
            .map((msg, idx) => (
              <div key={idx} className={`chat-message-wrapper ${msg.role}`}>
              <div className={`chat-message-bubble ${msg.role}`}>
                <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
              </div>
            </div>
            ))}

          {loading && (
            <div className="chat-message assistant">
              <div className="dots-loader">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-group">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="send-button"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? 'Waiting...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBot
