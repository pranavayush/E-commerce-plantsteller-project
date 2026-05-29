import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Star, ShieldCheck, Truck, Sparkles, Heart, ShoppingCart, MessageCircle, PhoneCall, Mail, MapPin, ChevronDown, Leaf, Send, CheckCircle2 } from "lucide-react";
import { PRODUCTS } from "../data/mock";
import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import { SeasonalOffers } from "../components/SeasonalOffers";

const QUOTES = [
  "Plants give us oxygen for the lungs and for the soul.",
  "A room with plants is a room with life.",
  "To plant a garden is to believe in tomorrow.",
  "Nature does not hurry, yet everything is accomplished.",
  "Just like plants, we grow when we are watered with love."
];

const CATEGORIES_DATA = [
  { name: 'Indoor Plants', img: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwbGFudHMlMjByb29tfGVufDF8fHx8MTc3OTk5MDI5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Outdoor Plants', img: 'https://images.unsplash.com/photo-1601303961147-fd4951a45c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZ2FyZGVuJTIwcGxhbnRzfGVufDF8fHx8MTc3OTk5MDI5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Medicinal Plants', img: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luYWwlMjBoZXJic3xlbnwxfHx8fDE3Nzk5OTAyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Flowering Plants', img: 'https://images.unsplash.com/photo-1554388450-b06c82abd505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXJpbmclMjBwbGFudHN8ZW58MXx8fHwxNzc5OTkwMjk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Air Purifying', img: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBwdXJpZnlpbmclMjBwbGFudHN8ZW58MXx8fHwxNzc5OTkwMjk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Bonsai Collection', img: 'https://images.unsplash.com/photo-1641412722397-3be359096577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib25zYWklMjB0cmVlfGVufDF8fHx8MTc3OTk5MDI5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Succulents', img: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnRzfGVufDF8fHx8MTc3OTk5MDI5OHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Hanging Plants', img: 'https://images.unsplash.com/photo-1508502726440-477c94bc369e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5naW5nJTIwcGxhbnRzfGVufDF8fHx8MTc3OTk5MDI5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
];

const HERO_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRvb3IlMjBwbGFudHN8ZW58MXx8fHwxNzc5OTkxNzE1fDA&ixlib=rb-4.1.0&q=80&w=2000",
  "https://images.unsplash.com/photo-1493673272479-a20888bcee10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGxlYXZlcyUyMGRhcmt8ZW58MXx8fHwxNzc5OTkxNzE3fDA&ixlib=rb-4.1.0&q=80&w=2000",
  "https://images.unsplash.com/photo-1641412722397-3be359096577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib25zYWklMjB0cmVlJTIwYWVzdGhldGljfGVufDF8fHx8MTc3OTk5MTcxN3ww&ixlib=rb-4.1.0&q=80&w=2000",
  "https://images.unsplash.com/photo-1589271243958-d61e12b61b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcm9vbSUyMHBsYW50fGVufDF8fHx8MTc3OTk5MTcxN3ww&ixlib=rb-4.1.0&q=80&w=2000",
  "https://images.unsplash.com/photo-1676136449197-babffb1125f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBncmVlbiUyMGludGVyaW9yfGVufDF8fHx8MTc3OTk5MTcxOHww&ixlib=rb-4.1.0&q=80&w=2000",
  "https://images.unsplash.com/photo-1616844868137-7ffaf43c2d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXJpbmclMjByb3NlJTIwcGxhbnR8ZW58MXx8fHwxNzc5OTkxNzE4fDA&ixlib=rb-4.1.0&q=80&w=2000",
  "https://images.unsplash.com/photo-1692322067982-f6c8368753d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9lJTIwdmVyYSUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3Nzk5OTE3MjN8MA&ixlib=rb-4.1.0&q=80&w=2000",
  "https://images.unsplash.com/photo-1613578519724-22fdb5d06388?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwc3VubGlnaHQlMjBwbGFudHxlbnwxfHx8fDE3Nzk5OTE3MjZ8MA&ixlib=rb-4.1.0&q=80&w=2000",
  "https://images.unsplash.com/photo-1599334064100-4d3a0cc7332c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcGxhbnQlMjBudXJzZXJ5fGVufDF8fHx8MTc3OTk5MTcyNHww&ixlib=rb-4.1.0&q=80&w=2000",
  "https://images.unsplash.com/photo-1604762512641-cc4ac4e7b279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRvb3IlMjBwbGFudHxlbnwxfHx8fDE3Nzk5ODg0ODN8MA&ixlib=rb-4.1.0&q=80&w=2000"
];

export function Home() {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 10);
  
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [quote, setQuote] = useState("");
  const [bgIndex, setBgIndex] = useState(() => {
    const lastIndex = sessionStorage.getItem('lastHeroBgIndex');
    let newIndex = Math.floor(Math.random() * HERO_BACKGROUNDS.length);
    if (lastIndex !== null && newIndex === parseInt(lastIndex, 10)) {
      newIndex = (newIndex + 1) % HERO_BACKGROUNDS.length;
    }
    sessionStorage.setItem('lastHeroBgIndex', newIndex.toString());
    return newIndex;
  });

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

    const interval = setInterval(() => {
      setBgIndex((current) => {
        const next = (current + 1) % HERO_BACKGROUNDS.length;
        sessionStorage.setItem('lastHeroBgIndex', next.toString());
        return next;
      });
    }, 8000); // Change image every 8 seconds for a cinematic feel

    return () => clearInterval(interval);
  }, []);

  const faqs = [
    { q: "How often should I water my indoor plants?", a: "It depends on the plant, but a general rule is to check the top 1-2 inches of soil. If it's dry, it's time to water. Overwatering is the most common way to kill indoor plants!" },
    { q: "Do you offer international shipping?", a: "Currently, we only ship within India to ensure our plants arrive healthy and happy." },
    { q: "What happens if my plant arrives damaged?", a: "We have a 14-day happy plant guarantee. If your plant arrives damaged, send us a photo within 14 days and we'll replace it for free." },
    { q: "Are your plants pet-friendly?", a: "We have a dedicated 'Pet Friendly' category! Always check the plant details before purchasing if you have curious furry friends." }
  ];

  return (
    <div className="flex flex-col relative">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-neutral-950">
          <AnimatePresence>
            <motion.img 
              key={bgIndex}
              src={HERO_BACKGROUNDS[bgIndex]} 
              alt="Premium plant background"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 10, ease: "easeOut" }
              }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-900/60 to-transparent dark:from-neutral-950/95 dark:via-neutral-950/80 z-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6 shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium tracking-wide">Premium Plant Collection</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
              Bring Life <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">To Your Space</span>
            </h1>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={quote}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-neutral-200 mb-8 max-w-lg leading-relaxed italic border-l-4 border-emerald-500 pl-4"
              >
                "{quote}"
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-emerald-950 bg-white hover:bg-neutral-100 rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] hover:-translate-y-1"
              >
                Shop Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/corporate" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border border-white/30 bg-black/20 backdrop-blur-md hover:bg-black/40 rounded-2xl transition-all hover:-translate-y-1"
              >
                Corporate Gifting
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-y border-neutral-200/50 dark:border-neutral-800/50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-8">
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 border-r border-neutral-200 dark:border-neutral-800 pr-0 md:pr-8">
              {[
                { icon: Truck, title: "Free Premium Shipping", desc: "Secure packaging" },
                { icon: ShieldCheck, title: "100% Healthy Guarantee", desc: "Healthy plants or money back" },
                { icon: Star, title: "Expert Plant Support", desc: "24/7 care advice" }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-white dark:bg-neutral-950/50 shadow-sm border border-neutral-100 dark:border-neutral-800/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all"
                >
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/20 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400 mb-3">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">{feature.title}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Trust Badges */}
            <div className="md:col-span-2 flex flex-col justify-center gap-4 pl-0 md:pl-4">
               <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                     <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white">Secure Payments</div>
                    <div className="text-xs text-neutral-500">256-bit encryption</div>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center">
                     <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white">Eco-Friendly Packaging</div>
                    <div className="text-xs text-neutral-500">100% recyclable</div>
                  </div>
                </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Offers Center */}
      <SeasonalOffers />

      {/* Categories */}
      <section className="py-20 relative bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-white mb-4">Shop by Category</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Find the perfect plant for your unique space and needs.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES_DATA.map((cat, idx) => (
              <Link to="/shop" key={cat.name}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative rounded-3xl overflow-hidden aspect-square cursor-pointer shadow-sm hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
                >
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <h3 className="text-white font-bold font-serif sm:text-lg">{cat.name}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Recommendations */}
      <section className="py-16 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=2000" alt="Background" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <div className="flex items-center space-x-2 text-emerald-300 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium tracking-wider uppercase text-sm">Local Recommendations</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Best Plants for Mumbai Climate</h2>
              <p className="text-emerald-100/80 max-w-2xl text-lg">Based on your current location, these humidity-loving plants will thrive beautifully in your space.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-1">{product.name}</h3>
                    <p className="text-emerald-200 text-sm">Perfect for high humidity</p>
                  </div>
                  <span className="text-lg font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section id="featured" className="py-24 relative overflow-hidden bg-white dark:bg-neutral-900">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white mb-4">
                Featured Botanicals
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
                Our most sought-after plants, hand-picked for exceptional quality, striking presence, and unique benefits.
              </p>
            </motion.div>
            <Link to="/shop" className="hidden md:flex items-center text-emerald-600 dark:text-emerald-400 font-medium hover:underline group">
              Explore Collection <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-neutral-50/50 dark:bg-neutral-950/50 backdrop-blur-md rounded-3xl overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-500/30 transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-white/90 backdrop-blur-md text-emerald-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                        NEW
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-400 hover:text-red-500 shadow-sm transition-all transform hover:scale-110 z-20"
                  >
                    <Heart className={`w-5 h-5 transition-colors ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  <div className="absolute bottom-4 left-0 w-full px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium shadow-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Quick Add</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow relative">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      {product.category}
                    </div>
                    {product.rating && (
                      <div className="flex items-center text-amber-500 text-xs font-bold bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-md">
                        <Star className="w-3 h-3 fill-current mr-1" />
                        {product.rating}
                      </div>
                    )}
                  </div>
                  
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-serif mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  {product.benefits && (
                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                      {product.benefits.map((benefit, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-md border border-neutral-200 dark:border-neutral-700 shadow-sm">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <span className="text-xl font-bold text-neutral-900 dark:text-white">₹{product.price.toLocaleString('en-IN')}</span>
                    <Link to={`/product/${product.id}`} className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-xl font-medium shadow-lg">
              View All Plants
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Channel Integration */}
      <section className="py-16 relative overflow-hidden bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#25D366]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 border border-neutral-200/50 dark:border-neutral-800/50 rounded-[3rem] p-8 md:p-12 shadow-xl shadow-emerald-500/5 overflow-hidden relative">
            
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <MessageCircle className="w-64 h-64 text-[#25D366]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#25D366]/10 text-[#25D366] rounded-full mb-6 font-bold text-sm">
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Official WhatsApp Channel</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                  Join the PlantSteller <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-teal-500">Community</span>
                </h2>
                
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg leading-relaxed">
                  🌿 Join the Official PlantSteller WhatsApp Channel and stay updated with new plants, exclusive offers, gardening tips, and exciting announcements.
                </p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    "New Plant Arrivals & Rare Finds",
                    "Exclusive Discounts & Seasonal Offers",
                    "Expert Plant Care Tips & Guides",
                    "Corporate Gift Updates"
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-neutral-700 dark:text-neutral-300 font-medium">
                      <div className="w-6 h-6 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="https://whatsapp.com/channel/0029VbDURy584Om3BSHvJl2d" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-white rounded-2xl font-bold text-lg hover:bg-[#20bd5a] hover:scale-105 transition-all shadow-[0_4px_20px_rgba(37,211,102,0.4)] group"
                >
                  <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Follow on WhatsApp
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-4 border-white dark:border-neutral-800 shadow-2xl relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000" 
                    alt="Lush green plants" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Floating Notification */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <Leaf className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900 dark:text-white text-sm">PlantSteller Official</h4>
                        <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-1">🌱 New Monstera Deliciosa just arrived! 20% off for channel members.</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-24 relative bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 to-emerald-950/95" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">We're Here to Help</h2>
              <p className="text-emerald-100/80 max-w-2xl mx-auto text-lg">
                Have questions about a plant? Need order support? Our development team is ready to assist you.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            <div className="space-y-6">
              {/* Contact Developer 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl group transition-all"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    P
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Pranav Ayush</h3>
                    <p className="text-emerald-400 text-sm font-medium">Co-Founder & Lead Developer</p>
                    <p className="text-emerald-100/50 text-xs">B.Tech 3rd Year Student</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-emerald-100/80 mt-6">
                  <p className="flex items-center"><PhoneCall className="w-4 h-4 mr-3 text-emerald-400" /> 6392826369</p>
                  <p className="flex items-center"><Mail className="w-4 h-4 mr-3 text-emerald-400" /> <a href="mailto:pranavayush8@gmail.com" className="hover:text-emerald-400 transition-colors">pranavayush8@gmail.com</a></p>
                  <p className="flex items-center"><span className="font-bold mr-3 text-emerald-400">@</span> <a href="https://instagram.com/pranavayush" target="_blank" className="hover:text-emerald-400 transition-colors">pranavayush</a></p>
                </div>
              </motion.div>

              {/* Contact Developer 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl group transition-all"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    V
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Vinayak Raj</h3>
                    <p className="text-emerald-400 text-sm font-medium">Co-Founder, Investor & Business Manager</p>
                    <p className="text-emerald-100/50 text-xs">Chartered Accountant (CA)</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-emerald-100/80 mt-6">
                  <p className="flex items-center"><PhoneCall className="w-4 h-4 mr-3 text-emerald-400" /> 9354447494</p>
                  <p className="flex items-center"><Mail className="w-4 h-4 mr-3 text-emerald-400" /> <a href="mailto:vinayakraj201@gmail.com" className="hover:text-emerald-400 transition-colors">vinayakraj201@gmail.com</a></p>
                  <p className="flex items-center"><span className="font-bold mr-3 text-emerald-400">@</span> <a href="https://instagram.com/vinayakrajrauniyar" target="_blank" className="hover:text-emerald-400 transition-colors">vinayakrajrauniyar</a></p>
                </div>
              </motion.div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.a
                  href="https://wa.me/916392826369"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-xl border border-emerald-500/30 p-6 rounded-3xl hover:bg-white/20 transition-all group flex flex-col items-center text-center shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold mb-1">WhatsApp Chat</h3>
                  <p className="text-emerald-100/70 text-xs">Direct Support</p>
                </motion.a>

                <motion.a
                  href="https://instagram.com/plantsteller"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col items-center text-center group hover:bg-white/10 transition-all hover:scale-102"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold">@</span>
                  </div>
                  <h3 className="text-white font-bold mb-1">Follow Us</h3>
                  <p className="text-emerald-100/70 text-xs">@plantsteller</p>
                </motion.a>
              </div>
            </div>

            <div className="space-y-8">
              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
              >
                <h3 className="text-2xl font-serif font-bold text-white mb-6">Send a Message</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input type="text" placeholder="Your Name" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                  <div>
                    <input type="email" placeholder="Your Email" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                  <div>
                    <textarea rows={4} placeholder="How can we help you?" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500 transition-colors resize-none"></textarea>
                  </div>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center transition-colors">
                    Send Message <Send className="w-4 h-4 ml-2" />
                  </button>
                </form>
              </motion.div>

              {/* Quick Help FAQs */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
              >
                <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center">
                  <Sparkles className="w-5 h-5 mr-3 text-emerald-400" /> Quick Help
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 transition-colors hover:bg-white/10"
                    >
                      <button 
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full px-5 py-3 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="font-medium text-sm text-white">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-4 text-emerald-100/80 text-xs leading-relaxed">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
