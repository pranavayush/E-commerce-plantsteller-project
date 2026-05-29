import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Zap, Sparkles, Sun, CloudRain, Snowflake, Flower2, ArrowRight } from "lucide-react";
import { Link } from "react-router";

// Helper to determine simulated "current" season based on month
const getSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 9) return 'Monsoon';
  return 'Winter';
};

export function SeasonalOffers() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [currentSeason, setCurrentSeason] = useState(getSeason());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 }; // reset for demo
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getSeasonConfig = () => {
    switch(currentSeason) {
      case 'Summer':
        return {
          title: "Summer Green Sale",
          subtitle: "Beat The Heat With Plants",
          icon: <Sun className="w-6 h-6 text-amber-500" />,
          bgClass: "from-amber-900 via-emerald-900 to-teal-900",
          offers: [
            { name: "Aloe Vera", price: 49, img: "https://images.unsplash.com/photo-1596547609652-9fc5d8d428ae?auto=format&fit=crop&q=80&w=400", tag: "Cooling" },
            { name: "Snake Plant", price: 99, img: "https://images.unsplash.com/photo-1599009849206-bd5b95a86d4e?auto=format&fit=crop&q=80&w=400", tag: "Air Purifying" },
            { name: "Money Plant", price: 149, img: "https://images.unsplash.com/photo-1616610413441-f1653e1a0dae?auto=format&fit=crop&q=80&w=400", tag: "Trending" }
          ]
        };
      case 'Monsoon':
        return {
          title: "Monsoon Garden Festival",
          subtitle: "Rainy Season Plant Sale",
          icon: <CloudRain className="w-6 h-6 text-blue-400" />,
          bgClass: "from-blue-900 via-emerald-900 to-teal-900",
          offers: [
            { name: "Tulsi", price: 49, img: "https://images.unsplash.com/photo-1599009849206-bd5b95a86d4e?auto=format&fit=crop&q=80&w=400", tag: "Medicinal" },
            { name: "Jasmine", price: 99, img: "https://images.unsplash.com/photo-1596547609652-9fc5d8d428ae?auto=format&fit=crop&q=80&w=400", tag: "Fragrant" },
            { name: "Hibiscus", price: 149, img: "https://images.unsplash.com/photo-1616610413441-f1653e1a0dae?auto=format&fit=crop&q=80&w=400", tag: "Flowering" }
          ]
        };
      case 'Winter':
        return {
          title: "Winter Bloom Collection",
          subtitle: "Cozy Green Winter Deals",
          icon: <Snowflake className="w-6 h-6 text-blue-200" />,
          bgClass: "from-slate-900 via-cyan-900 to-emerald-900",
          offers: [
            { name: "Lily", price: 99, img: "https://images.unsplash.com/photo-1599009849206-bd5b95a86d4e?auto=format&fit=crop&q=80&w=400", tag: "Indoor" },
            { name: "Lavender", price: 149, img: "https://images.unsplash.com/photo-1596547609652-9fc5d8d428ae?auto=format&fit=crop&q=80&w=400", tag: "Aromatic" },
            { name: "Bonsai", price: 199, img: "https://images.unsplash.com/photo-1616610413441-f1653e1a0dae?auto=format&fit=crop&q=80&w=400", tag: "Premium" }
          ]
        };
      case 'Spring':
      default:
        return {
          title: "Spring Blossom Sale",
          subtitle: "Fresh Blooms Collection",
          icon: <Flower2 className="w-6 h-6 text-pink-400" />,
          bgClass: "from-pink-900 via-rose-900 to-emerald-900",
          offers: [
            { name: "Rose Collection", price: 199, img: "https://images.unsplash.com/photo-1596547609652-9fc5d8d428ae?auto=format&fit=crop&q=80&w=400", tag: "Bestseller" },
            { name: "Orchid", price: 299, img: "https://images.unsplash.com/photo-1599009849206-bd5b95a86d4e?auto=format&fit=crop&q=80&w=400", tag: "Exotic" },
            { name: "Spring Combo", price: 349, img: "https://images.unsplash.com/photo-1616610413441-f1653e1a0dae?auto=format&fit=crop&q=80&w=400", tag: "Flat 40% OFF" }
          ]
        };
    }
  };

  const config = getSeasonConfig();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with Season Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.bgClass} transition-colors duration-1000`} />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493673272479-a20888bcee10?auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay object-cover" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left: Main Seasonal Banner */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 text-white space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              {config.icon}
              <span className="font-bold tracking-wide uppercase text-sm">{currentSeason} Collection</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-serif font-bold leading-tight">
              {config.title}
            </h2>
            <p className="text-xl text-white/80">
              {config.subtitle}
            </p>
            
            {/* Countdown Timer */}
            <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl inline-block mt-4">
              <div className="flex items-center space-x-2 text-red-400 mb-3">
                <Zap className="w-5 h-5 fill-current" />
                <span className="font-bold uppercase tracking-wider text-sm">Flash Sale Ends In</span>
              </div>
              <div className="flex space-x-4 text-center">
                <div className="bg-white/10 rounded-xl p-3 min-w-[70px]">
                  <div className="text-3xl font-bold font-mono">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs text-white/60 mt-1 uppercase">Hours</div>
                </div>
                <div className="text-3xl font-bold font-mono py-2">:</div>
                <div className="bg-white/10 rounded-xl p-3 min-w-[70px]">
                  <div className="text-3xl font-bold font-mono">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs text-white/60 mt-1 uppercase">Mins</div>
                </div>
                <div className="text-3xl font-bold font-mono py-2">:</div>
                <div className="bg-white/10 rounded-xl p-3 min-w-[70px]">
                  <div className="text-3xl font-bold font-mono">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs text-white/60 mt-1 uppercase">Secs</div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link to="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-white text-neutral-900 font-bold rounded-xl hover:bg-neutral-100 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] group">
                Shop The Sale
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Offer Cards */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {config.offers.map((offer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden hover:bg-white/20 transition-all duration-500 flex flex-col cursor-pointer"
              >
                {/* Floating Discount Badge */}
                <div className="absolute top-4 right-4 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center shadow-red-500/30">
                  <Sparkles className="w-3 h-3 mr-1" /> Deal of the Day
                </div>
                
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img src={offer.img} alt={offer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-medium uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-1 rounded-md border border-white/20 mb-2 inline-block">
                      {offer.tag}
                    </span>
                    <h3 className="text-xl font-serif font-bold mb-1">{offer.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-300">Starting @ ₹{offer.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Marketing Badges row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-4 sm:gap-8"
        >
          {['Best Seller', 'Deal of the Day', 'Plant of the Week', 'Limited Stock', 'Trending Now', 'Editor\'s Choice'].map((badge, idx) => (
            <div key={idx} className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors cursor-default">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium tracking-wider uppercase">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
