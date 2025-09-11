import { useState, useRef, useEffect } from 'react';

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! Welcome to Guyu Chat. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

  // Get user info from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          id: payload.userId,
          name: payload.name || 'User',
          email: payload.email,
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  // Simple bot responses
  const generateBotResponse = (message) => {
    const responses = [
      "That's interesting! Tell me more about that.",
      'I understand. How does that make you feel?',
      'Thanks for sharing that with me.',
      "That's a great question! Let me think about that.",
      'I see what you mean. Can you elaborate?',
      'That sounds important to you.',
      "I'm here to listen. What else would you like to talk about?",
      "That's fascinating! I'd love to hear more.",
    ];

    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      return 'Hello there! Great to see you. How are you doing today?';
    }

    if (message.toLowerCase().includes('help')) {
      return "I'm here to help! You can talk to me about anything on your mind. What would you like to discuss?";
    }

    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  };

  // Handle key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center">
            <span className="text-white text-sm font-bold">G</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Guyu Chat</h1>
            <p className="text-xs text-slate-500">AI Assistant</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          )}

          <button onClick={handleLogout} className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
            Logout
          </button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`px-4 py-2 rounded-2xl ${message.sender === 'user' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-900'}`}>
                  <p className="text-sm">{message.text}</p>
                </div>
                <p className={`text-xs text-slate-400 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>{formatTime(message.timestamp)}</p>
              </div>

              {/* Avatar */}
              <div className={`flex-shrink-0 ${message.sender === 'user' ? 'order-1 mr-2' : 'order-2 ml-2'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-slate-700 text-white text-xs font-medium' : 'bg-slate-200 text-slate-600 text-xs font-medium'}`}>
                  {message.sender === 'user' ? user?.name?.[0] || 'U' : 'G'}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="order-1 max-w-xs lg:max-w-md">
                <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
              <div className="order-2 ml-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-600 text-xs font-medium">G</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-slate-200 bg-white px-4 py-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
