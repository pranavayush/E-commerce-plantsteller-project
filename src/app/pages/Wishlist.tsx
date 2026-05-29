import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Heart, ShoppingCart, Trash2, ArrowRight, BellRing } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useAppContext();

  return (
    <div className="pt-8 pb-24 bg-transparent min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white mb-4">Your Wishlist</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </motion.div>

        {wishlist.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center py-20 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50"
          >
            <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white mb-4">Your wishlist is empty</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
              Discover our premium collection of botanicals and save your favorites here.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1"
            >
              Explore Plants <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {wishlist.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id}
                  className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button 
                        onClick={() => removeFromWishlist(product.id)}
                        className="w-10 h-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 shadow-sm transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">
                        {product.category}
                      </div>
                      <span className="text-lg font-bold text-neutral-900 dark:text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-serif mb-4">
                      {product.name}
                    </h3>
                    
                    <div className="mt-auto space-y-3">
                      <button 
                        onClick={() => {
                          addToCart(product);
                          removeFromWishlist(product.id);
                        }}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Move to Cart</span>
                      </button>
                      
                      <button className="w-full py-3 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors">
                        <BellRing className="w-5 h-5" />
                        <span>Price Drop Alert</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}