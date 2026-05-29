import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, Sparkles, Activity, Mic, Leaf, Zap, HelpCircle, Gift } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  typing?: boolean;
};

const SUGGESTIONS = [
  "Best Indoor Plants",
  "Plant Care Guide",
  "Air Purifying Plants",
  "Plant Doctor",
  "Corporate Gifting"
];

const BOT_KNOWLEDGE: Record<string, string> = {
  // Original Knowledge
  "best indoor plants": "For indoors, I highly recommend the Snake Plant, ZZ Plant, or the elegant Monstera Deliciosa! They are resilient and thrive in lower light conditions.",
  "plant care guide": "The golden rule: do not overwater! Always check the top 2 inches of soil before watering. Most plants prefer bright, indirect sunlight.",
  "air purifying plants": "Plants like Snake Plants, Spider Plants, and Peace Lilies are fantastic at filtering out toxins and improving indoor air quality.",
  "plant doctor": "I can help diagnose your plant! Common issues: Yellow leaves usually mean overwatering, while brown crispy tips indicate low humidity or underwatering.",
  "corporate gifting": "We offer premium corporate gifting solutions! From elegant desk succulents to custom-branded pots. Check out our Corporate Gifts page for bulk orders.",
  "hello": "Hi! I'm Planty AI, your personal plant expert. I can help with plant care, disease diagnosis, plant recommendations, gardening tips, and much more.",
  "hi": "Hi! I'm Planty AI, your personal plant expert. I can help with plant care, disease diagnosis, plant recommendations, gardening tips, and much more.",
  
  // Advanced Knowledge
  "outdoor plants": "For outdoor spaces in direct sun, try Bougainvillea, Jasmine, or Hibiscus. If it's a shaded balcony, Ferns and Calatheas are great choices.",
  "flowering plants": "Flowering plants like Peace Lilies and Orchids need plenty of bright light and regular fertilization during their blooming season to thrive.",
  "medicinal plants": "Aloe Vera is great for skin, Tulsi (Holy Basil) is excellent for immunity, and Mint is perfect for teas and digestion.",
  "bonsai": "Bonsai requires patience! They need bright light, specialized well-draining soil, and consistent pruning to maintain their miniature form.",
  "succulents": "Succulents are drought-tolerant. Only water them when the soil is completely dry, usually every 2-3 weeks, and give them plenty of bright light.",
  "plant diseases": "Common diseases include Root Rot (caused by overwatering) and Powdery Mildew (caused by poor air circulation). Fungal issues often require copper-based fungicides.",
  "pest control": "For mealybugs or spider mites, wipe the leaves with diluted neem oil or insecticidal soap. Always isolate the infected plant to prevent spreading.",
  "soil types": "Most indoor plants prefer a well-draining potting mix. Succulents need sandy/gritty soil, while ferns prefer moisture-retaining, peaty soil.",
  "fertilizers": "Use a balanced liquid fertilizer (like 10-10-10) diluted to half-strength during the growing season (spring and summer). Pause in winter.",
  "hydroponics": "Hydroponics is growing plants without soil! Plants like Pothos, Philodendrons, and herbs grow excellently in water with liquid nutrients.",
  "organic farming": "For organic farming, focus on composting, crop rotation, and natural pest control like neem oil. Healthy soil creates healthy plants!",
  "watering schedules": "Watering depends on light, temperature, and plant type. It's always safer to underwater than overwater. Let the topsoil dry out first.",
  "indian climate": "India has diverse climates. Tropical plants like Money Plants thrive in coastal humidity, while succulents do well in drier regions. Always protect delicate plants from harsh afternoon summer sun.",
  "balcony gardening": "For a balcony, use railing planters for Petunias or trailing plants like English Ivy. Ensure your pots have drainage holes!",
  "plant propagation": "Many plants like Pothos or Snake Plants can be propagated easily by stem cuttings in water. Make sure to cut just below a node!"
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'doctor' | 'discover'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "👋 Hi! I'm Planty AI. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) setShowWelcomeBubble(false);
  }, [isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    const typingId = Date.now() + 1;
    setMessages(prev => [...prev, { id: typingId, text: "...", sender: 'bot', typing: true }]);

    const lowercaseText = text.toLowerCase();
    let responseText = "I'm still learning about that! As your personal plant expert, I can help you with plant care, disease diagnosis, and finding the perfect plant for your space.";
    
    for (const [key, answer] of Object.entries(BOT_KNOWLEDGE)) {
      // Split the key into words to match partial combinations
      const keyWords = key.split(' ');
      const hasMatch = keyWords.some(kw => lowercaseText.includes(kw) && kw.length > 3) || lowercaseText.includes(key);
      
      if (hasMatch) {
        responseText = answer;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => prev.map(msg => msg.id === typingId ? { ...msg, text: responseText, typing: false } : msg));
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 sm:right-8 w-80 sm:w-96 z-50 overflow-hidden rounded-[2rem] border border-neutral-200/50 dark:border-neutral-800/50 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl shadow-2xl shadow-emerald-500/10 flex flex-col"
            style={{ height: '600px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Premium Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex justify-between items-center relative overflow-hidden flex-shrink-0 border-b border-white/10">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=1080')] opacity-10 mix-blend-overlay object-cover" />
              <div className="relative z-10 flex items-center space-x-3">
                <div className="relative">
                  <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 border-2 border-emerald-700 rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold font-serif text-xl leading-tight tracking-wide">Planty AI</h3>
                  <p className="text-xs text-emerald-100/80 font-medium">Expert Mode Active</p>
                </div>
              </div>
              <div className="relative z-10 flex space-x-2">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-emerald-100 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Premium Tabs */}
            <div className="flex px-4 py-2 border-b border-neutral-200/50 dark:border-neutral-800/50 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md flex-shrink-0 gap-2">
              <button onClick={() => setActiveTab('chat')} className={`flex-1 py-2 text-xs font-bold rounded-xl flex justify-center items-center transition-all ${activeTab === 'chat' ? 'bg-emerald-600 text-white shadow-md' : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}><MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Chat</button>
              <button onClick={() => setActiveTab('doctor')} className={`flex-1 py-2 text-xs font-bold rounded-xl flex justify-center items-center transition-all ${activeTab === 'doctor' ? 'bg-emerald-600 text-white shadow-md' : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}><Activity className="w-3.5 h-3.5 mr-1.5" /> Plant Doctor</button>
              <button onClick={() => setActiveTab('discover')} className={`flex-1 py-2 text-xs font-bold rounded-xl flex justify-center items-center transition-all ${activeTab === 'discover' ? 'bg-emerald-600 text-white shadow-md' : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}><Sparkles className="w-3.5 h-3.5 mr-1.5" /> Discover</button>
            </div>

            {activeTab === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-gradient-to-b from-transparent to-neutral-50/30 dark:to-neutral-950/30">
                  {messages.map(msg => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      key={msg.id} 
                      className={`flex items-end space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex flex-shrink-0 items-center justify-center text-white mb-1 shadow-sm">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div 
                        className={`max-w-[80%] p-3.5 rounded-[1.25rem] text-sm shadow-sm backdrop-blur-sm border ${
                          msg.sender === 'user' 
                            ? 'bg-emerald-600 text-white rounded-br-sm border-emerald-500' 
                            : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 border-neutral-200/50 dark:border-neutral-700/50 rounded-bl-sm'
                        }`}
                      >
                        {msg.typing ? (
                          <div className="flex space-x-1.5 py-1 px-1">
                            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-emerald-500 rounded-full" />
                          </div>
                        ) : (
                          <span className="leading-relaxed">{msg.text}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="px-4 pb-3 flex overflow-x-auto hide-scrollbar gap-2 flex-shrink-0">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="whitespace-nowrap px-4 py-2 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-bold transition-all border border-emerald-100 dark:border-emerald-800/30 hover:border-emerald-300 hover:shadow-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-t border-neutral-200/50 dark:border-neutral-800/50 flex-shrink-0">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                    className="flex items-center bg-neutral-100/80 dark:bg-neutral-800/80 rounded-2xl p-1.5 border border-transparent focus-within:border-emerald-500/50 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:shadow-sm transition-all"
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask Planty anything..."
                      className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none text-neutral-900 dark:text-white placeholder-neutral-500"
                    />
                    <button 
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  </form>
                </div>
              </>
            )}

            {activeTab === 'doctor' && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20">
                  <Activity className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl mb-2 text-neutral-900 dark:text-white">Plant Doctor</h3>
                <p className="text-neutral-500 text-sm mb-8 text-center px-4">Upload a photo or describe the symptoms. I can identify diseases, pests, and suggest treatments.</p>
                
                <div className="w-full space-y-3">
                  <label className="w-full border-2 border-dashed border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-6 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors cursor-pointer flex flex-col items-center text-center">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-full mb-3">
                      <Mic className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">Upload Plant Photo</span>
                    <span className="text-xs text-neutral-500 mt-1">AI will analyze visible issues</span>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>

                  <button onClick={() => { setActiveTab('chat'); handleSend("Yellowing leaves"); }} className="w-full p-4 rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-neutral-100 dark:border-neutral-800/30 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left group">
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Yellowing Leaves</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">Common sign of overwatering</p>
                    </div>
                    <Send className="w-4 h-4 text-neutral-400 group-hover:text-emerald-500 transition-colors" />
                  </button>

                  <button onClick={() => { setActiveTab('chat'); handleSend("Pest control"); }} className="w-full p-4 rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-neutral-100 dark:border-neutral-800/30 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left group">
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Pest Control</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">Identify and treat plant bugs</p>
                    </div>
                    <Send className="w-4 h-4 text-neutral-400 group-hover:text-emerald-500 transition-colors" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'discover' && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl mb-2 text-neutral-900 dark:text-white">Smart Plant Finder</h3>
                <p className="text-neutral-500 text-sm mb-8 text-center px-4">Let our AI match you with the perfect plant based on your lifestyle.</p>
                
                <div className="w-full space-y-3">
                  <button onClick={() => { setActiveTab('chat'); handleSend("Best Indoor Plants"); }} className="w-full p-4 rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-emerald-100 dark:border-emerald-800/30 flex items-center hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors text-left group">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                      <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Beginner Friendly</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">Hard to kill, easy to love</p>
                    </div>
                  </button>
                  
                  <button onClick={() => { setActiveTab('chat'); handleSend("Air Purifying Plants"); }} className="w-full p-4 rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-blue-100 dark:border-blue-800/30 flex items-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left group">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Air Purifiers</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">Breathe cleaner, fresher air</p>
                    </div>
                  </button>
                  
                  <button onClick={() => { setActiveTab('chat'); handleSend("Corporate Gifting"); }} className="w-full p-4 rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-purple-100 dark:border-purple-800/30 flex items-center hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-left group">
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                      <Gift className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Corporate Gifts</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">Premium bulk orders</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && showWelcomeBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-full right-0 mb-4 bg-white dark:bg-neutral-900 p-3 rounded-2xl rounded-br-sm shadow-xl border border-neutral-200/50 dark:border-neutral-800/50 whitespace-nowrap flex items-center space-x-2"
            >
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">👋 Hi! I'm Planty AI. How can I help you today?</span>
              <button onClick={() => setShowWelcomeBubble(false)} className="text-neutral-400 hover:text-neutral-600 p-1">
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setIsOpen(!isOpen); setShowWelcomeBubble(false); }}
          className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[1.25rem] shadow-2xl shadow-emerald-600/30 flex items-center justify-center relative border border-white/20 z-10"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Bot className="w-8 h-8" />
              </motion.div>
            )}
          </AnimatePresence>
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-neutral-900"></span>
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
