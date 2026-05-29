import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, Heart, Star, ShoppingCart, ArrowRight, X, SlidersHorizontal, MapPin } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data/mock";
import { useAppContext } from "../context/AppContext";

export function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allBenefits = useMemo(() => {
    const benefits = new Set<string>();
    PRODUCTS.forEach(p => p.benefits?.forEach(b => benefits.add(b)));
    return Array.from(benefits);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBenefits = selectedBenefits.length === 0 || 
                              selectedBenefits.every(b => product.benefits?.includes(b));
                              
      return matchesCategory && matchesSearch && matchesPrice && matchesBenefits;
    });

    if (sortBy === 'price_asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeCategory, searchQuery, priceRange, sortBy, selectedBenefits]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4);
  }, [searchQuery]);

  return (
    <div className="pt-8 pb-24 bg-transparent min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white mb-3">Our Collection</h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">Find the perfect addition to your space.</p>
          </motion.div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative max-w-md w-full md:w-80" ref={searchRef}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors ${isSearchFocused ? 'text-emerald-500' : 'text-neutral-400'}`} />
              </div>
              <input
                type="text"
                className={`block w-full pl-12 pr-4 py-4 border rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm ${isSearchFocused ? 'border-emerald-500/50 shadow-emerald-500/20' : 'border-neutral-200 dark:border-neutral-800'}`}
                placeholder="Search plants, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              
              {/* Search Suggestions */}
              <AnimatePresence>
                {isSearchFocused && searchQuery && searchSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-2xl shadow-emerald-500/10 overflow-hidden z-50"
                  >
                    <ul>
                      {searchSuggestions.map(suggestion => (
                        <li key={suggestion.id}>
                          <Link 
                            to={`/product/${suggestion.id}`}
                            className="flex items-center p-3 hover:bg-emerald-50 dark:hover:bg-neutral-800/50 transition-colors"
                          >
                            <img src={suggestion.image} alt={suggestion.name} className="w-12 h-12 rounded-xl object-cover" />
                            <div className="ml-3">
                              <p className="text-sm font-bold text-neutral-900 dark:text-white">{suggestion.name}</p>
                              <p className="text-xs text-neutral-500">{suggestion.category}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.button 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`p-4 rounded-2xl border transition-all ${showFilters ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/80 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-emerald-500/50 hover:text-emerald-500'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, width: 0, marginRight: 0 }}
                animate={{ opacity: 1, width: 320, marginRight: 32 }}
                exit={{ opacity: 0, width: 0, marginRight: 0 }}
                className="hidden lg:block flex-shrink-0 overflow-hidden"
              >
                <div className="w-[320px] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl p-6 border border-neutral-200/50 dark:border-neutral-800/50 shadow-xl shadow-emerald-500/5">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif font-bold text-xl text-neutral-900 dark:text-white">Filters</h3>
                    <button onClick={() => setShowFilters(false)} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Sort */}
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">Sort By</h4>
                      <div className="space-y-2">
                        {[
                          { id: 'featured', label: 'Featured' },
                          { id: 'price_asc', label: 'Price: Low to High' },
                          { id: 'price_desc', label: 'Price: High to Low' }
                        ].map(option => (
                          <label key={option.id} className="flex items-center space-x-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${sortBy === option.id ? 'border-emerald-500' : 'border-neutral-300 dark:border-neutral-700 group-hover:border-emerald-500'}`}>
                              {sortBy === option.id && <div className="w-3 h-3 rounded-full bg-emerald-500" />}
                            </div>
                            <span className="text-neutral-600 dark:text-neutral-400 text-sm group-hover:text-neutral-900 dark:group-hover:text-white">{option.label}</span>
                            <input type="radio" className="hidden" checked={sortBy === option.id} onChange={() => setSortBy(option.id as any)} />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">Price Range</h4>
                      <input 
                        type="range" 
                        min="0" max="10000" step="100" 
                        value={priceRange[1]} 
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full accent-emerald-500"
                      />
                      <div className="flex justify-between text-xs text-neutral-500 mt-2">
                        <span>₹0</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">Features</h4>
                      <div className="space-y-2">
                        {allBenefits.map(benefit => (
                          <label key={benefit} className="flex items-center space-x-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedBenefits.includes(benefit) ? 'bg-emerald-500 border-emerald-500' : 'border-neutral-300 dark:border-neutral-700 group-hover:border-emerald-500'}`}>
                              {selectedBenefits.includes(benefit) && <div className="w-2 h-2 bg-white" />}
                            </div>
                            <span className="text-neutral-600 dark:text-neutral-400 text-sm group-hover:text-neutral-900 dark:group-hover:text-white">{benefit}</span>
                            <input 
                              type="checkbox" 
                              className="hidden" 
                              checked={selectedBenefits.includes(benefit)} 
                              onChange={() => {
                                if (selectedBenefits.includes(benefit)) {
                                  setSelectedBenefits(selectedBenefits.filter(b => b !== benefit));
                                } else {
                                  setSelectedBenefits([...selectedBenefits, benefit]);
                                }
                              }} 
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1">
            {/* Categories */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar gap-3">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105'
                      : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:text-emerald-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Smart Compatibility Checker */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
              <h3 className="font-serif font-bold text-xl text-neutral-900 dark:text-white mb-2">Plant Compatibility Checker</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">Let our AI find the perfect plants for your specific space and lifestyle.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-neutral-900 dark:text-white">
                  <option value="">Room Type</option>
                  <option value="living">Living Room</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="bathroom">Bathroom</option>
                  <option value="office">Home Office</option>
                </select>
                <select className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-neutral-900 dark:text-white">
                  <option value="">Sunlight Level</option>
                  <option value="low">Low / Indirect</option>
                  <option value="medium">Medium / Filtered</option>
                  <option value="high">High / Direct Sun</option>
                </select>
                <select className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-neutral-900 dark:text-white">
                  <option value="">Budget</option>
                  <option value="low">Under ₹500</option>
                  <option value="medium">₹500 - ₹1500</option>
                  <option value="high">Above ₹1500</option>
                </select>
                <button className="px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg">
                  Find My Match
                </button>
              </div>
            </motion.div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4 }}
                key={product.id}
                className="group relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
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
                
                <Link to={`/product/${product.id}`} className="p-6 flex flex-col flex-grow relative">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">
                      {product.category}
                    </div>
                    {product.rating && (
                      <div className="flex items-center text-amber-500 text-xs font-bold">
                        <Star className="w-3 h-3 fill-current mr-1" />
                        {product.rating}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-serif mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-neutral-900 dark:text-white">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
                      Details <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
            <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-3xl font-serif text-neutral-900 dark:text-white mb-4">No plants found</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg">Try adjusting your search or category filters.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-8 px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
