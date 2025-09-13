import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

function DashboardChatPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [activeChat, setActiveChat] = useState('public');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userList, setUserList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [unreadMessages, setUnreadMessages] = useState(new Map());

  // Add ref to track current activeChat for socket callbacks
  const activeChatRef = useRef(activeChat);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Update ref whenever activeChat changes
  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  // Scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/data/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('User data fetched:', data.user);
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Initialize socket connection
  useEffect(() => {
    if (!user) return;

    console.log('Initializing socket for user:', user._id);
    const newSocket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    });

    setSocket(newSocket);

    // Socket event listeners
    newSocket.on('connect', () => {
      console.log('Connected to server with socket ID:', newSocket.id);
      newSocket.emit('userConnected', user._id);
      newSocket.emit('getUserList');

      // Join public chat by default
      if (activeChatRef.current === 'public') {
        newSocket.emit('joinPublicChat');
      }
    });

    // Handle online users list
    newSocket.on('onlineUsers', (onlineUserIds) => {
      console.log('Online users updated:', onlineUserIds);
      setOnlineUsers(new Set(onlineUserIds));
    });

    // Handle previous public messages
    newSocket.on('previousMessages', (msgs) => {
      console.log('Received previous public messages:', msgs.length);
      // Use ref to get current activeChat
      if (activeChatRef.current === 'public') {
        setMessages(msgs);
      }
    });

    // Handle previous private messages
    newSocket.on('previousPrivateMessages', ({ messages: msgs, otherUserId }) => {
      console.log('Received previous private messages:', msgs.length, 'for user:', otherUserId);
      console.log('Current activeChat from ref:', activeChatRef.current);

      // Use ref to get current activeChat
      if (activeChatRef.current === otherUserId) {
        setMessages(msgs);
      }
    });

    // Handle new public message
    newSocket.on('message', (message) => {
      console.log('Received public message:', message);
      // Use ref to get current activeChat
      if (activeChatRef.current === 'public') {
        setMessages((prev) => [...prev, message]);
      }
    });

    // Handle new private message
    newSocket.on('privateMessage', (message) => {
      console.log('Received private message:', message);
      console.log('Current active chat from ref:', activeChatRef.current);
      console.log('Current user ID:', user._id);

      const otherUserId = message.senderId === user._id ? message.receiverId : message.senderId;
      console.log('Other user ID:', otherUserId);
      console.log('Message sender ID:', message.senderId);

      // Use ref to get current activeChat
      const currentActiveChat = activeChatRef.current;
      console.log('Updating messages, activeChat === otherUserId?', currentActiveChat === otherUserId);

      if (currentActiveChat === otherUserId) {
        setMessages((prev) => [...prev, message]);
      }

      // Add to unread messages only if not currently viewing this chat
      // and the message is not from the current user
      if (currentActiveChat !== otherUserId && message.senderId !== user._id) {
        console.log('Adding to unread messages for user:', otherUserId);
        setUnreadMessages((prev) => {
          const newMap = new Map(prev);
          const current = newMap.get(otherUserId) || 0;
          newMap.set(otherUserId, current + 1);
          return newMap;
        });
      } else {
        console.log('Not adding to unread because:', {
          activeChatMatch: currentActiveChat === otherUserId,
          isOwnMessage: message.senderId === user._id,
        });
      }
    });

    // Handle private message notification (backup for unread messages)
    newSocket.on('newPrivateMessage', ({ from, fromId, message: msgText }) => {
      console.log('New private message notification from:', from);
      // Use ref to get current activeChat
      const currentActiveChat = activeChatRef.current;

      // Only add to unread if not currently viewing this chat
      // and the message is not from the current user
      if (currentActiveChat !== fromId && fromId !== user._id) {
        setUnreadMessages((prev) => {
          const newMap = new Map(prev);
          const current = newMap.get(fromId) || 0;
          newMap.set(fromId, current + 1);
          return newMap;
        });
      }
    });

    // Handle user list
    newSocket.on('userList', (users) => {
      console.log('Received user list:', users.length, 'users');
      setUserList(users);
    });

    // Handle errors
    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      alert('Error: ' + error.message);
    });

    return () => {
      console.log('Disconnecting socket');
      newSocket.off(); // Remove all listeners
      newSocket.disconnect();
    };
  }, [user]); // Only depend on user

  // Handle active chat change - separate effect
  useEffect(() => {
    if (!socket || !user) return;

    console.log('Active chat changed to:', activeChat);

    // Clear messages when switching chats
    setMessages([]);

    // Clear unread messages for the active chat immediately
    if (activeChat !== 'public') {
      setUnreadMessages((prev) => {
        const newMap = new Map(prev);
        newMap.delete(activeChat);
        return newMap;
      });
    }

    // Use setTimeout to ensure state updates are completed
    const timeout = setTimeout(() => {
      console.log('Emitting join event for:', activeChat);
      if (activeChat === 'public') {
        socket.emit('joinPublicChat');
      } else {
        socket.emit('joinPrivateChat', { otherUserId: activeChat });
      }
    }, 50); // Reduced timeout

    return () => clearTimeout(timeout);
  }, [activeChat, socket, user]);

  // Handle chat switching
  const switchToPublicChat = () => {
    if (activeChat !== 'public') {
      console.log('Switching to public chat');
      setActiveChat('public');
    }
  };

  const switchToPrivateChat = (userId) => {
    if (activeChat !== userId) {
      console.log('Switching to private chat with user:', userId);
      setActiveChat(userId);
    }
  };

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !user) return;

    // Get current activeChat value
    const currentActiveChat = activeChat;
    console.log('Sending message:', newMessage, 'to:', currentActiveChat);

    if (currentActiveChat === 'public') {
      socket.emit('publicMessage', {
        text: newMessage,
        userId: user._id,
      });
    } else {
      socket.emit('privateMessage', {
        text: newMessage,
        senderId: user._id,
        receiverId: currentActiveChat,
      });
    }

    setNewMessage('');
  };

  // Get display name for user
  const getDisplayName = (userData) => {
    if (!userData) return 'Unknown User';

    if (userData.profile?.displayName) return userData.profile.displayName;
    if (userData.profile?.firstName || userData.profile?.lastName) {
      return `${userData.profile.firstName || ''} ${userData.profile.lastName || ''}`.trim();
    }
    if (userData.displayName) return userData.displayName;
    return userData.email || 'Unknown User';
  };

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      if (socket) {
        socket.disconnect();
      }

      setUser(null);
      localStorage.removeItem('token');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error logging out:', error);
      navigate('/', { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Show fallback if chat is disabled
  // Remove this block since 'chatEnabled' is not defined and not used elsewhere.

  const activeUserName = activeChat === 'public' ? 'Public Chat' : userList.find((u) => u.id === activeChat)?.displayName || 'Private Chat';

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 px-4 md:px-6 py-4 shadow-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 md:space-x-4 overflow-hidden">
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Chat Hub</h1>
            {user && (
              <div className="flex items-center space-x-2 min-w-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">{getDisplayName(user).charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-gray-200 font-medium truncate text-sm md:text-base">{getDisplayName(user)}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium hidden sm:inline">Online</span>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="px-3 md:px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25 text-sm md:text-base font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 lg:w-96 bg-gray-800/40 backdrop-blur-sm border-r border-gray-700/50 flex flex-col hidden md:flex">
          {/* Public Chat */}
          <div className="p-4 border-b border-gray-700/50">
            <button
              onClick={switchToPublicChat}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group ${
                activeChat === 'public' ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 shadow-lg' : 'hover:bg-gray-700/30 text-gray-300 hover:text-white'
              }`}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg font-bold">#</span>
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">Public Chat</div>
                <div className="text-sm text-gray-400">Everyone can see</div>
              </div>
            </button>
          </div>

          {/* Private Chats */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Private Messages ({userList.length})</h3>
              <div className="space-y-2">
                {userList.map((chatUser) => (
                  <button
                    key={chatUser.id}
                    onClick={() => switchToPrivateChat(chatUser.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group relative ${
                      activeChat === chatUser.id ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 shadow-lg' : 'hover:bg-gray-700/30 text-gray-300 hover:text-white'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-sm font-bold">{chatUser.displayName.charAt(0).toUpperCase()}</span>
                      </div>
                      {/* Online indicator */}
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${onlineUsers.has(chatUser.id) ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-semibold truncate">{chatUser.displayName}</div>
                      <div className={`text-sm ${onlineUsers.has(chatUser.id) ? 'text-green-400' : 'text-gray-400'}`}>{onlineUsers.has(chatUser.id) ? 'Online' : 'Offline'}</div>
                    </div>
                    {unreadMessages.get(chatUser.id) > 0 && (
                      <div className="min-w-[20px] h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse shadow-lg">{unreadMessages.get(chatUser.id)}</div>
                    )}
                  </button>
                ))}
                {userList.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-8">
                    <div className="text-4xl mb-2">💬</div>
                    <p>No other users online</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Chat List Overlay */}
        <div className="md:hidden absolute inset-0 z-10 bg-gray-900/95 backdrop-blur-sm hidden">{/* Mobile sidebar content will be shown when needed */}</div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="bg-gray-800/40 backdrop-blur-sm border-b border-gray-700/50 px-4 md:px-6 py-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${activeChat === 'public' ? 'bg-gradient-to-r from-green-500 to-teal-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
                  <span className="text-white text-lg font-bold">{activeChat === 'public' ? '#' : activeUserName.charAt(0).toUpperCase()}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-white text-lg truncate">{activeUserName}</h2>
                  <p className="text-sm text-gray-400 truncate">{activeChat === 'public' ? 'Public discussion for everyone' : onlineUsers.has(activeChat) ? '🟢 Online - Private conversation' : '⚫ Offline - Private conversation'}</p>
                </div>
              </div>
              <button className="md:hidden text-gray-400 hover:text-white p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-xl font-medium mb-2">No messages yet</p>
                  <p className="text-gray-500">Start the conversation and break the ice!</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={`${message.id}-${index}`} className={`flex ${message.senderId === user._id ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm ${
                        message.senderId === user._id ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-12' : 'bg-gray-700/60 text-gray-100 border border-gray-600/30 mr-12'
                      }`}
                    >
                      {message.senderId !== user._id && <div className="text-xs font-semibold mb-1 text-blue-300">{message.sender}</div>}
                      <div className="text-sm leading-relaxed break-words">{message.text}</div>
                      <div className={`text-xs mt-2 ${message.senderId === user._id ? 'text-blue-200' : 'text-gray-400'}`}>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-gray-800/40 backdrop-blur-sm border-t border-gray-700/50 p-4 md:p-6">
            <form onSubmit={sendMessage} className="flex space-x-3 max-w-4xl mx-auto">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Message ${activeUserName.toLowerCase()}...`}
                className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all duration-300"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardChatPage;
