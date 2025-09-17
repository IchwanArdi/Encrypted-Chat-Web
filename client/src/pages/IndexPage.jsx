import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import SEO from '../components/SEO';

// Constants moved outside component to prevent recreation
const REAL_CHAT_MESSAGES = [
  { sender: 'Budi', text: 'Woi, udah coba Guyu Chat belum?', avatar: 'B' },
  { sender: 'Sari', text: 'Belum, emang kenapa?', avatar: 'S' },
  { sender: 'Budi', text: 'Asik banget! Chat privat gak takut dibaca orang 😎', avatar: 'B' },
  { sender: 'Sari', text: 'Serius? Gak kayak WA yang suka ngelag?', avatar: 'S' },
  { sender: 'Budi', text: 'Nah itu dia! Super cepet, terus designnya cakep', avatar: 'B' },
  { sender: 'Sari', text: 'Okee gas cobain deh! 🔥', avatar: 'S' },
];

const WHY_FEATURES = [
  {
    icon: '😤',
    title: 'Udah Bosen Chat Disadap?',
    desc: 'Di Guyu Chat, cuma lo sama temen lo yang bisa baca chat. Titik.',
  },
  {
    icon: '⚡',
    title: 'Gak Ngelag Kayak Chat Lain',
    desc: 'Real-time chat yang beneran real-time. Gak ada delay aneh-aneh.',
  },
  {
    icon: '🎨',
    title: 'Designnya Gak Jadul',
    desc: 'Modern, clean, dan enak diliat. Gak kayak chat jaman batu.',
  },
];

const FAQ_DATA = [
  {
    question: 'Emang beneran gratis ya?',
    answer: '100% gratis! Gak ada hidden cost atau premium features yang bikin kantong bolong. Semua fitur bisa dipake tanpa bayar sepeserpun.',
  },
  {
    question: 'Aman gak sih chatnya?',
    answer: 'Super aman! Semua pesan dienkripsi end-to-end. Bahkan admin Guyu Chat pun gak bisa baca chat lo. Privacy is our priority!',
  },
  {
    question: 'Bisa chat grup gak?',
    answer: 'Bisa banget! Ada public chat buat ngobrol bareng semua orang, dan private chat buat ngobrol berdua aja. Fleksibel sesuai mood!',
  },
  {
    question: 'Perlu download app gak?',
    answer: 'Gak perlu! Langsung buka di browser aja udah bisa chat. Tapi kalau mau, nanti bakal ada app mobile-nya juga kok.',
  },
  {
    question: 'Gimana cara daftarnya?',
    answer: "Gampang banget! Cukup klik 'Mulai Chat Sekarang', isi email sama password, terus langsung bisa chat deh. Gak ribet!",
  },
  {
    question: 'Data pribadi aman gak?',
    answer: "Tenang aja! Kami gak jual data lo ke siapapun. Data cuma dipake buat ngasih pengalaman chat yang lebih baik. That's it!",
  },
];

// Memoized components for better performance
const TypingIndicator = () => (
  <div className="flex gap-3 items-center">
    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">?</div>
    <div className="bg-gray-700/60 border border-gray-600/30 rounded-2xl px-4 py-3">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    </div>
  </div>
);

const ChatMessage = ({ message, index, currentTime }) => {
  const isOdd = index % 2 === 1;
  const avatarGradient = index % 2 === 0 ? 'from-orange-400 to-red-500' : 'from-purple-400 to-pink-500';

  return (
    <div className={`flex gap-3 ${isOdd ? 'justify-end' : 'justify-start'}`}>
      {!isOdd && <div className={`w-10 h-10 bg-gradient-to-r ${avatarGradient} rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>{message.avatar}</div>}

      <div className={`max-w-sm px-4 py-3 rounded-2xl ${isOdd ? 'bg-gradient-to-r from-blue-500 to-purple-600 ml-auto' : 'bg-gray-700/60 border border-gray-600/30'}`}>
        {!isOdd && <div className="text-xs text-blue-300 font-semibold mb-1">{message.sender}</div>}
        <div className="text-sm leading-relaxed">{message.text}</div>
        <div className={`text-xs mt-1 ${isOdd ? 'text-blue-200' : 'text-gray-400'}`}>{currentTime}</div>
      </div>

      {isOdd && <div className={`w-10 h-10 bg-gradient-to-r ${avatarGradient} rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>{message.avatar}</div>}
    </div>
  );
};

const FeatureCard = ({ feature }) => (
  <div className="group">
    <div className="bg-gray-800/40 border border-gray-700/50 rounded-3xl p-8 hover:bg-gray-700/40 transition-all duration-300 hover:scale-105 hover:border-purple-500/30">
      <div className="text-3xl md:text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
      <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
      <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
    </div>
  </div>
);

const FAQItem = ({ faq }) => (
  <details className="group bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden">
    <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-700/30 transition-colors">
      <h4 className="text-lg font-bold text-white pr-4">{faq.question}</h4>
      <div className="text-2xl text-purple-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">↓</div>
    </summary>
    <div className="px-6 pb-6">
      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
    </div>
  </details>
);

function IndexPage() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Memoize current time to prevent unnecessary re-renders
  const currentTime = useMemo(() => new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), []);

  // Optimize interval with useCallback
  const handleMessageCycle = useCallback(() => {
    setIsTyping(true);
    setTimeout(() => {
      setCurrentMessage((prev) => (prev + 1) % REAL_CHAT_MESSAGES.length);
      setIsTyping(false);
    }, 800);
  }, []);

  useEffect(() => {
    const interval = setInterval(handleMessageCycle, 3000);
    return () => clearInterval(interval);
  }, [handleMessageCycle]);

  // Memoize visible messages
  const visibleMessages = useMemo(() => REAL_CHAT_MESSAGES.slice(0, currentMessage + 1), [currentMessage]);

  return (
    <>
      <SEO
        title="Guyu Chat - Chat Bebas, Tanpa Drama"
        description="Platform chat aman dan privat untuk berkomunikasi bebas tanpa khawatir. End-to-end encryption, real-time messaging, dan desain modern. 100% gratis!"
        keywords="chat, messaging, privat, aman, end-to-end encryption, real-time, gratis, indonesia, guyu chat"
        type="website"
        additionalMetaTags={[
          { name: 'theme-color', content: '#1e293b' },
          { name: 'application-name', content: 'Guyu Chat' },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="px-6 pt-15 md:pt-20 mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              {/* Beta Badge */}
              <div className="inline-flex items-center gap-2 bg-gray-800/60 backdrop-blur border border-purple-500/30 rounded-full px-4 py-1 md:py-2 mb-8">
                <span className="py-1 px-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-sm md:font-semibold rounded-full">New</span>
                <span className="text-sm">Guyu Chat Beta sekarang sudah tersedia! 🎉</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                Chat Bebas,
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">Tanpa Drama!</span>
              </h1>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Bosen chat yang ribet? Di sini simple, aman, dan yang penting...
                <span className="text-yellow-400 font-semibold"> gak ada yang ngintip! </span>
                😏
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  🚀 Mulai Chat Sekarang
                </Link>
              </div>
            </div>

            {/* Live Chat Demo */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 shadow-2xl">
                {/* Chat Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">#</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Chat Random Seru</h3>
                      <p className="text-sm text-gray-400">267 orang lagi ngobrol</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Live
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-4 h-96 overflow-y-auto mb-6">
                  {visibleMessages.map((message, index) => (
                    <ChatMessage key={index} message={message} index={index} currentTime={currentTime} />
                  ))}
                  {isTyping && <TypingIndicator />}
                </div>

                {/* Input Area */}
                <div className="flex gap-3 bg-gray-700/30 rounded-2xl p-3">
                  <input type="text" placeholder="Ketik sesuatu yang seru..." className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none" disabled />
                  <button className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Kenapa Harus <span className="text-yellow-400">Guyu Chat</span>?
              </h2>
              <p className="text-xl text-gray-300">Karena chat yang lain udah mainstream banget 🙄</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {WHY_FEATURES.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-20 bg-gray-800/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-black mb-4">Pertanyaan yang Sering Ditanya</h3>
              <p className="text-xl text-gray-300">Biar gak bingung, ini jawaban lengkapnya! 🤔</p>
            </div>

            <div className="space-y-4">
              {FAQ_DATA.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Udah Siap Mulai Chat yang
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> Beda</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">Gratis kok, gak ada bayar-bayar. Langsung gas aja! 🔥</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform">
                🚀 Langsung Chat Sekarang
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">Gak perlu kartu kredit atau ribet-ribet. Just chat!</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-gray-700/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center">
                  <img src={logo} alt="Guyu Chat Logo" loading="lazy" />
                </div>
                <div>
                  <span className="text-xl font-bold">Guyu Chat</span>
                  <p className="text-xs text-gray-400">Chat bebas, tanpa drama</p>
                </div>
              </div>

              <nav className="flex gap-8 text-sm text-gray-400">
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
                <Link to="/help" className="hover:text-white transition-colors">
                  Help
                </Link>
              </nav>
            </div>
            <div className="text-center text-gray-500 text-sm mt-8">© 2025 Guyu Chat. Made with ❤️ in Indonesia</div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default IndexPage;
