import './ChatBot.css'
import { useState } from 'react'

function ChatBot() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    setLoading(true)
    setResponse('')

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      })

      const data = await res.json()
      setResponse(data.response)
    } catch {
      setResponse('Something went wrong. Please try again.')
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
        <div className="chat-title">Ask Me Anything</div>

        <div className="chat-response">
          {loading ? (
            <div className="typing-animation">...</div>
          ) : (
            response
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
          <button className="send-button" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default ChatBot
