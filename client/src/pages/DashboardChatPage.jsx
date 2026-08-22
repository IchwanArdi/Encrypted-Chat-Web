import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import SEO from '../components/SEO';
import { Menu, X, Send, Lock, Hash, User, LogOut, ShieldCheck } from 'lucide-react';

/* Hallmark · genre: editorial · macrostructure: Workbench/Studio · theme: Atelier
 * Dashboard Chat page overhaul using Atelier token system
 */

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
  const [mobileMenu, setMobileMenu] = useState(false);

  const activeChatRef = useRef(activeChat);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

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

    const newSocket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('userConnected', user._id);
      newSocket.emit('getUserList');

      if (activeChatRef.current === 'public') {
        newSocket.emit('joinPublicChat');
      }
    });

    newSocket.on('onlineUsers', (onlineUserIds) => {
      setOnlineUsers(new Set(onlineUserIds));
    });

    newSocket.on('previousMessages', (msgs) => {
      if (activeChatRef.current === 'public') {
        setMessages(msgs);
      }
    });

    newSocket.on('previousPrivateMessages', ({ messages: msgs, otherUserId }) => {
      if (activeChatRef.current === otherUserId) {
        setMessages(msgs);
      }
    });

    newSocket.on('message', (message) => {
      if (activeChatRef.current === 'public') {
        setMessages((prev) => [...prev, message]);
      }
    });

    newSocket.on('privateMessage', (message) => {
      const otherUserId = message.senderId === user._id ? message.receiverId : message.senderId;
      const currentActiveChat = activeChatRef.current;

      if (currentActiveChat === otherUserId) {
        setMessages((prev) => [...prev, message]);
      }

      if (currentActiveChat !== otherUserId && message.senderId !== user._id) {
        setUnreadMessages((prev) => {
          const newMap = new Map(prev);
          const current = newMap.get(otherUserId) || 0;
          newMap.set(otherUserId, current + 1);
          return newMap;
        });
      }
    });

    newSocket.on('newPrivateMessage', ({ fromId }) => {
      const currentActiveChat = activeChatRef.current;
      if (currentActiveChat !== fromId && fromId !== user._id) {
        setUnreadMessages((prev) => {
          const newMap = new Map(prev);
          const current = newMap.get(fromId) || 0;
          newMap.set(fromId, current + 1);
          return newMap;
        });
      }
    });

    newSocket.on('userList', (users) => {
      setUserList(users);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return () => {
      newSocket.off();
      newSocket.disconnect();
    };
  }, [user]);

  // Handle active chat change
  useEffect(() => {
    if (!socket || !user) return;

    setMessages([]);

    if (activeChat !== 'public') {
      setUnreadMessages((prev) => {
        const newMap = new Map(prev);
        newMap.delete(activeChat);
        return newMap;
      });
    }

    const timeout = setTimeout(() => {
      if (activeChat === 'public') {
        socket.emit('joinPublicChat');
      } else {
        socket.emit('joinPrivateChat', { otherUserId: activeChat });
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [activeChat, socket, user]);

  const switchToPublicChat = () => {
    if (activeChat !== 'public') {
      setActiveChat('public');
      setMobileMenu(false);
    }
  };

  const switchToPrivateChat = (userId) => {
    if (activeChat !== userId) {
      setActiveChat(userId);
      setMobileMenu(false);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !user) return;

    if (activeChat === 'public') {
      socket.emit('publicMessage', {
        text: newMessage,
        userId: user._id,
      });
    } else {
      socket.emit('privateMessage', {
        text: newMessage,
        senderId: user._id,
        receiverId: activeChat,
      });
    }

    setNewMessage('');
  };

  const getDisplayName = (userData) => {
    if (!userData) return 'Pengguna';
    if (userData.profile?.displayName) return userData.profile.displayName;
    if (userData.profile?.firstName || userData.profile?.lastName) {
      return `${userData.profile.firstName || ''} ${userData.profile.lastName || ''}`.trim();
    }
    if (userData.displayName) return userData.displayName;
    return userData.email || 'Pengguna';
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
      <div
        className="h-screen w-full flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-main)' }}
      >
        <div className="text-center space-y-3">
          <div
            className="w-8 h-8 mx-auto animate-spin"
            style={{
              border: '2px solid var(--color-rule)',
              borderTopColor: 'var(--color-accent)',
              borderRadius: '50%',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.05em',
            }}
          >
            [ MEMUAT KUNSI & SESI OBROLAN... ]
          </p>
        </div>
      </div>
    );
  }

  const activeUserObj = userList.find((u) => u.id === activeChat);
  const activeUserName = activeChat === 'public' ? 'Obrolan Publik' : activeUserObj?.displayName || 'Chat Privat';

  return (
    <>
      <SEO
        title="Dashboard Chat — Guyu Chat"
        description="Ruang obrolan terenkripsi end-to-end secara real-time di Guyu Chat. Akses pesan publik dan percakapan privat."
        keywords="dashboard chat, guyu chat, chat terenkripsi, e2ee, obrolan privat"
        type="website"
      />

      <div
        className="h-screen w-full flex flex-col overflow-hidden"
        style={{
          backgroundColor: 'var(--color-bg-base)',
          color: 'var(--color-text-main)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {/* ─── Top Navigation Bar ─── */}
        <header
          className="flex items-center justify-between z-30"
          style={{
            padding: 'var(--space-sm) var(--page-gutter)',
            borderBottom: 'var(--rule-hairline)',
            backgroundColor: 'var(--color-bg-surface)',
          }}
        >
          <div className="flex items-center gap-[var(--space-md)]">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-1.5 cursor-pointer"
              style={{
                border: 'var(--rule-hairline)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-bg-base)',
                color: 'var(--color-text-main)',
              }}
            >
              {mobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Brand Title */}
            <div className="flex items-center gap-[var(--space-sm)]">
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-base)',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-main)',
                }}
              >
                Guyu Chat
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-accent)',
                  padding: '2px 6px',
                  backgroundColor: 'var(--color-paper-3)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                E2EE
              </span>
            </div>
          </div>

          {/* User Status & Logout */}
          <div className="flex items-center gap-[var(--space-lg)]">
            {user && (
              <div className="hidden sm:flex items-center gap-[var(--space-sm)]">
                <div
                  style={{
                    width: '1.75rem',
                    height: '1.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'var(--rule-hairline)',
                    backgroundColor: 'var(--color-ink)',
                    color: 'var(--color-paper)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getDisplayName(user).charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--color-text-main)',
                      lineHeight: 1.2,
                    }}
                  >
                    {getDisplayName(user)}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'oklch(60% 0.15 140)',
                    }}
                  >
                    ● Online
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-1.5"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                padding: 'var(--space-2xs) var(--space-sm)',
                border: 'var(--rule-hairline)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-bg-base)',
                transition: `color var(--dur-micro) var(--ease-out)`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </header>

        {/* ─── Main Content Split ─── */}
        <div className="flex-1 flex overflow-hidden relative">

          {/* ─── Desktop Sidebar ─── */}
          <aside
            className="w-80 lg:w-96 flex-col hidden md:flex"
            style={{
              borderRight: 'var(--rule-hairline)',
              backgroundColor: 'var(--color-bg-surface)',
            }}
          >
            {/* Public Channel Button */}
            <div style={{ padding: 'var(--space-md)', borderBottom: 'var(--rule-hairline)' }}>
              <button
                onClick={switchToPublicChat}
                className="w-full text-left cursor-pointer flex items-center gap-[var(--space-md)]"
                style={{
                  padding: 'var(--space-sm) var(--space-md)',
                  borderRadius: 'var(--radius-sm)',
                  border: activeChat === 'public' ? '1px solid var(--color-ink)' : '1px solid transparent',
                  backgroundColor: activeChat === 'public' ? 'var(--color-bg-base)' : 'transparent',
                  transition: `background-color var(--dur-micro) var(--ease-out)`,
                }}
              >
                <div
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'var(--rule-hairline)',
                    backgroundColor: 'var(--color-paper-3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: 'var(--color-ink)',
                  }}
                >
                  #
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      color: 'var(--color-text-main)',
                    }}
                  >
                    Obrolan Publik
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-dim)',
                    }}
                  >
                    Terbuka untuk semua pengakses
                  </div>
                </div>
              </button>
            </div>

            {/* Private Messages Header & List */}
            <div className="flex-1 overflow-y-auto" style={{ padding: 'var(--space-md)' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--color-text-dim)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-sm)',
                  paddingLeft: 'var(--space-2xs)',
                }}
              >
                Pesan Privat ({userList.length})
              </div>

              <div className="space-y-[var(--space-2xs)]">
                {userList.map((chatUser) => {
                  const isActive = activeChat === chatUser.id;
                  const isOnline = onlineUsers.has(chatUser.id);
                  const unreadCount = unreadMessages.get(chatUser.id) || 0;

                  return (
                    <button
                      key={chatUser.id}
                      onClick={() => switchToPrivateChat(chatUser.id)}
                      className="w-full text-left cursor-pointer flex items-center justify-between"
                      style={{
                        padding: 'var(--space-xs) var(--space-sm)',
                        borderRadius: 'var(--radius-sm)',
                        border: isActive ? '1px solid var(--color-ink)' : '1px solid transparent',
                        backgroundColor: isActive ? 'var(--color-bg-base)' : 'transparent',
                        transition: `background-color var(--dur-micro) var(--ease-out)`,
                      }}
                    >
                      <div className="flex items-center gap-[var(--space-sm)] min-w-0">
                        {/* Avatar */}
                        <div
                          style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: 'var(--radius-sm)',
                            border: 'var(--rule-hairline)',
                            backgroundColor: 'var(--color-paper-3)',
                            color: 'var(--color-text-main)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {chatUser.displayName.charAt(0).toUpperCase()}
                        </div>

                        {/* Name & status */}
                        <div className="min-w-0">
                          <div
                            className="truncate"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-sm)',
                              fontWeight: isActive ? 600 : 400,
                              color: 'var(--color-text-main)',
                            }}
                          >
                            {chatUser.displayName}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 'var(--text-xs)',
                              color: isOnline ? 'oklch(60% 0.15 140)' : 'var(--color-text-dim)',
                            }}
                          >
                            {isOnline ? '● Online' : '○ Offline'}
                          </div>
                        </div>
                      </div>

                      {/* Unread badge */}
                      {unreadCount > 0 && (
                        <span
                          className="tnum"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 700,
                            color: 'var(--color-paper)',
                            backgroundColor: 'var(--color-accent)',
                            padding: '2px 6px',
                            borderRadius: '10px',
                          }}
                        >
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })}

                {userList.length === 0 && (
                  <div
                    className="text-center"
                    style={{
                      padding: 'var(--space-xl) var(--space-md)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-dim)',
                    }}
                  >
                    Tidak ada pengguna lain aktif.
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* ─── Mobile Drawer Overlay ─── */}
          {mobileMenu && (
            <div
              className="md:hidden absolute inset-0 z-40 flex"
              style={{ backgroundColor: 'oklch(18% 0.012 30 / 0.5)', backdropFilter: 'blur(4px)' }}
            >
              <div
                className="w-4/5 max-w-xs h-full flex flex-col"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  borderRight: 'var(--rule-hairline)',
                  padding: 'var(--space-md)',
                }}
              >
                <div
                  className="flex items-center justify-between pb-[var(--space-md)]"
                  style={{ borderBottom: 'var(--rule-hairline)' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 'var(--text-base)',
                    }}
                  >
                    Daftar Obrolan
                  </span>
                  <button onClick={() => setMobileMenu(false)} className="cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto pt-[var(--space-md)] space-y-[var(--space-md)]">
                  <button
                    onClick={switchToPublicChat}
                    className="w-full text-left p-2.5 rounded flex items-center gap-3"
                    style={{
                      border: activeChat === 'public' ? '1px solid var(--color-ink)' : 'var(--rule-hairline)',
                      backgroundColor: activeChat === 'public' ? 'var(--color-bg-base)' : 'transparent',
                    }}
                  >
                    <Hash className="w-4 h-4 text-[var(--color-accent)]" />
                    <div>
                      <div className="font-semibold text-sm">Obrolan Publik</div>
                      <div className="text-xs font-mono text-[var(--color-text-dim)]">Semua pengguna</div>
                    </div>
                  </button>

                  <div>
                    <div className="text-xs font-mono text-[var(--color-text-dim)] uppercase mb-2">
                      Pesan Privat ({userList.length})
                    </div>
                    <div className="space-y-1">
                      {userList.map((chatUser) => (
                        <button
                          key={chatUser.id}
                          onClick={() => switchToPrivateChat(chatUser.id)}
                          className="w-full text-left p-2 rounded flex items-center justify-between text-sm"
                          style={{
                            backgroundColor: activeChat === chatUser.id ? 'var(--color-bg-base)' : 'transparent',
                            border: activeChat === chatUser.id ? '1px solid var(--color-ink)' : 'none',
                          }}
                        >
                          <span className="truncate">{chatUser.displayName}</span>
                          {onlineUsers.has(chatUser.id) && (
                            <span className="text-xs font-mono text-[oklch(60%_0.15_140)]">●</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1" onClick={() => setMobileMenu(false)} />
            </div>
          )}

          {/* ─── Main Chat View ─── */}
          <main className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: 'var(--color-bg-base)' }}>

            {/* Chat Room Header */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: 'var(--space-md) var(--page-gutter)',
                borderBottom: 'var(--rule-hairline)',
                backgroundColor: 'var(--color-bg-surface)',
              }}
            >
              <div className="flex items-center gap-[var(--space-sm)] min-w-0">
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'var(--rule-hairline)',
                    backgroundColor: 'var(--color-bg-base)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {activeChat === 'public' ? '#' : activeUserName.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h2
                    className="truncate"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 600,
                      lineHeight: 1.2,
                      color: 'var(--color-text-main)',
                    }}
                  >
                    {activeUserName}
                  </h2>
                  <p
                    className="truncate"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-dim)',
                    }}
                  >
                    {activeChat === 'public'
                      ? 'Saluran obrolan terbuka terenkripsi'
                      : onlineUsers.has(activeChat)
                      ? 'Sesi privat aktif (Online)'
                      : 'Sesi privat terenkripsi (Offline)'}
                  </p>
                </div>
              </div>

              <div
                className="hidden sm:flex items-center gap-1.5"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-dim)',
                }}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>AES-256-GCM</span>
              </div>
            </div>

            {/* Messages Scroll Body */}
            <div
              className="flex-1 overflow-y-auto"
              style={{
                padding: 'var(--space-lg) var(--page-gutter)',
              }}
            >
              <div className="space-y-[var(--space-md)] max-w-4xl mx-auto">
                {messages.length === 0 ? (
                  <div
                    className="text-center"
                    style={{
                      padding: 'var(--space-3xl) var(--space-md)',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xl)',
                        fontWeight: 300,
                        color: 'var(--color-text-main)',
                      }}
                    >
                      Belum ada pesan di sesi ini.
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-muted)',
                        marginTop: 'var(--space-xs)',
                      }}
                    >
                      Kirim pesan pertama Anda. Seluruh isi pesan dienkripsi secara lokal di peramban.
                    </p>
                  </div>
                ) : (
                  messages.map((message, index) => {
                    const isSelf = message.senderId === user._id;
                    return (
                      <div
                        key={`${message.id || index}-${index}`}
                        className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          style={{
                            maxWidth: '36rem',
                            padding: 'var(--space-sm) var(--space-md)',
                            borderRadius: 'var(--radius-sm)',
                            border: isSelf ? '1px solid var(--color-ink)' : 'var(--rule-hairline)',
                            backgroundColor: isSelf ? 'var(--color-ink)' : 'var(--color-bg-surface)',
                            color: isSelf ? 'var(--color-paper)' : 'var(--color-text-main)',
                          }}
                        >
                          {!isSelf && (
                            <div
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: 'var(--text-xs)',
                                fontWeight: 600,
                                color: 'var(--color-accent)',
                                marginBottom: 'var(--space-3xs)',
                              }}
                            >
                              {message.sender}
                            </div>
                          )}

                          <div
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-sm)',
                              lineHeight: 1.6,
                              wordBreak: 'break-word',
                            }}
                          >
                            {message.text}
                          </div>

                          <div
                            className="tnum text-right"
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 'var(--text-xs)',
                              color: isSelf ? 'oklch(80% 0.01 35)' : 'var(--color-text-dim)',
                              marginTop: 'var(--space-3xs)',
                            }}
                          >
                            {new Date(message.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input Footer */}
            <div
              style={{
                padding: 'var(--space-md) var(--page-gutter)',
                borderTop: 'var(--rule-hairline)',
                backgroundColor: 'var(--color-bg-surface)',
              }}
            >
              <form onSubmit={sendMessage} className="max-w-4xl mx-auto flex items-center gap-[var(--space-sm)]">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Kirim pesan terenkripsi ke ${activeUserName}…`}
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--color-bg-base)',
                    border: 'var(--rule-hairline)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-sm) var(--space-md)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-main)',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-border-focus)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
                />

                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="cursor-pointer flex items-center gap-1.5"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--color-paper)',
                    backgroundColor: 'var(--color-ink)',
                    padding: 'var(--space-sm) var(--space-lg)',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    opacity: !newMessage.trim() ? 0.5 : 1,
                    transition: `opacity var(--dur-micro) var(--ease-out)`,
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Kirim</span>
                </button>
              </form>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardChatPage;
