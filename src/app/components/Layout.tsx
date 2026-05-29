import { Outlet, Link, useNavigate } from "react-router";
import { ShoppingBag, User, Sun, Moon, Leaf, Menu, Heart, MessageCircle, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { AIChatbot } from "./AIChatbot";
import { FloatingLeaves } from "./FloatingLeaves";
import { MouseGlow } from "./MouseGlow";

export function Layout() {
  const { cart, wishlist, user, darkMode, toggleDarkMode, showAuthPopup, setShowAuthPopup, login } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Eco quote toast
    const quotes = [
      "Plants give us oxygen for the lungs and for the soul.",
      "A room with plants is a room with life.",
      "To plant a garden is to believe in tomorrow.",
      "Nature does not hurry, yet everything is accomplished."
    ];
    setTimeout(() => {
      toast.success("Eco Quote of the Day 🌿", {
        description: quotes[Math.floor(Math.random() * quotes.length)],
        duration: 8000,
      });
    }, 3000);
  }, []);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${darkMode ? 'dark bg-neutral-950 text-neutral-50' : 'bg-[#FAFAF9] text-neutral-900'}`}>
      <MouseGlow />
      <FloatingLeaves />
      
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200/50 dark:border-neutral-800/50 transition-colors duration-500 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group relative z-10">
              <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-emerald-500/20">
                <Leaf className="w-5 h-5 text-white absolute" />
                <div className="absolute inset-0 border border-white/20 rounded-xl" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-600 dark:from-emerald-300 dark:to-emerald-100">
                PlantSteller
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center relative z-10">
              <Link to="/" className="text-sm font-medium text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400 transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </Link>
              <Link to="/shop" className="text-sm font-medium text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400 transition-colors relative group">
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </Link>
              <Link to="/community" className="text-sm font-medium text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400 transition-colors relative group">
                Community
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </Link>
              <Link to="/corporate" className="text-sm font-medium text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400 transition-colors relative group">
                Corporate Gifts
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </Link>
              <a href="#featured" className="text-sm font-medium text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400 transition-colors relative group">
                Featured
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </a>
              <a href="#support" className="text-sm font-medium text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400 transition-colors relative group">
                Support
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4 relative z-10">
              <a 
                href="https://whatsapp.com/channel/0029VbDURy584Om3BSHvJl2d" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden lg:flex items-center space-x-2 px-4 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-full text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Follow on WhatsApp</span>
              </a>
              
              <button onClick={toggleDarkMode} className="p-2 text-neutral-600 hover:bg-emerald-50 dark:text-neutral-400 dark:hover:bg-neutral-800 rounded-full transition-all hover:scale-110">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={darkMode ? 'dark' : 'light'}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </button>
              
              <Link to="/wishlist" className="hidden md:flex p-2 text-neutral-600 hover:bg-emerald-50 dark:text-neutral-400 dark:hover:bg-neutral-800 rounded-full transition-all hover:scale-110 relative group">
                <Heart className="w-5 h-5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                {wishlist.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 border-2 border-white dark:border-neutral-900 rounded-full"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </Link>
              
              <Link to="/cart" className="p-2 text-neutral-600 hover:bg-emerald-50 dark:text-neutral-400 dark:hover:bg-neutral-800 rounded-full transition-all hover:scale-110 relative group">
                <ShoppingBag className="w-5 h-5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                {cartItemsCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 border-2 border-white dark:border-neutral-900 rounded-full"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </Link>

              <Link to={user ? "/dashboard" : "/login"} className="hidden md:flex items-center space-x-2 p-2 text-neutral-600 hover:bg-emerald-50 dark:text-neutral-400 dark:hover:bg-neutral-800 rounded-full transition-all hover:scale-110">
                <User className="w-5 h-5" />
                {user && <span className="text-sm font-medium">{user.name}</span>}
              </Link>

              <button 
                className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-3 flex flex-col">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-600">Home</Link>
                <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-600">Shop</Link>
                <Link to="/corporate" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-600">Corporate Gifts</Link>
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-600">Wishlist ({wishlist.length})</Link>
                <a href="#support" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-600">Support</a>
                <Link to={user ? "/dashboard" : "/login"} onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-600">
                  {user ? 'Dashboard' : 'Sign In'}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)] relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-300 py-20 border-t border-emerald-900/30 relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center space-x-3 group">
                <div className="bg-emerald-600 p-2.5 rounded-xl shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="font-serif text-3xl font-bold tracking-tight text-white">
                  PlantSteller
                </span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
                Elevating spaces with premium botanical selections. We blend nature, technology, and design to deliver the perfect plant experience to your doorstep.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-6 tracking-wider uppercase text-sm">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="text-neutral-400 hover:text-emerald-400 transition-colors">About PlantSteller</Link></li>
                <li><Link to="/corporate" className="text-neutral-400 hover:text-emerald-400 transition-colors">Corporate Gifts</Link></li>
                <li><Link to="/community" className="text-neutral-400 hover:text-emerald-400 transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-6 tracking-wider uppercase text-sm">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/guides" className="text-neutral-400 hover:text-emerald-400 transition-colors">Plant Care Guides</Link></li>
                <li><a href="#faqs" className="text-neutral-400 hover:text-emerald-400 transition-colors">FAQs</a></li>
                <li><a href="#shipping" className="text-neutral-400 hover:text-emerald-400 transition-colors">Shipping & Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-6 tracking-wider uppercase text-sm">Connect</h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="https://instagram.com/plantsteller" target="_blank" rel="noreferrer" className="flex items-center text-neutral-400 hover:text-pink-500 transition-colors">
                    Instagram: @plantsteller
                  </a>
                </li>
                <li>
                  <a href="https://whatsapp.com/channel/0029VbDURy584Om3BSHvJl2d" target="_blank" rel="noreferrer" className="flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors group">
                    <div className="bg-[#25D366] p-1.5 rounded-lg group-hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-shadow">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-xs">WhatsApp Channel</p>
                      <p className="text-[10px] text-neutral-400">Join for exclusive offers</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
            <p>&copy; {new Date().getFullYear()} PlantSteller. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Global AI Chatbot */}
      <AIChatbot />
      
      {/* Auth Popup */}
      <AnimatePresence>
        {showAuthPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAuthPopup(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-neutral-900 rounded-3xl p-8 max-w-md w-full shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
            >
              <button 
                onClick={() => setShowAuthPopup(false)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 mx-auto">
                <User className="w-8 h-8" />
              </div>
              
              <h2 className="text-2xl font-serif font-bold text-center text-neutral-900 dark:text-white mb-2">
                Sign in required
              </h2>
              <p className="text-center text-neutral-500 dark:text-neutral-400 mb-8">
                Please login or create an account to access this feature and manage your botanical journey.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    login("guest@plantsteller.com", "user");
                    setShowAuthPopup(false);
                    toast.success("Successfully logged in");
                  }}
                  className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 transition-colors"
                >
                  Quick Sign In (Demo)
                </button>
                <button
                  onClick={() => {
                    setShowAuthPopup(false);
                    navigate("/login");
                  }}
                  className="w-full py-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  Go to Login Page
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toaster position="top-center" theme={darkMode ? 'dark' : 'light'} />
    </div>
  );
}
