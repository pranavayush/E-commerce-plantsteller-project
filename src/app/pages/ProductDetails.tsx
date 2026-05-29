import { useParams, Link } from "react-router";
import { PRODUCTS } from "../data/mock";
import { useAppContext } from "../context/AppContext";
import { ArrowLeft, ShoppingBag, Droplets, Sun, Info, Star, Heart, CheckCircle2, MessageSquare, Image as ImageIcon, Trash2, Edit2, Gift, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

// Mock reviews
const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Aditi S.",
    rating: 5,
    comment: "Absolutely beautiful plant! Arrived in perfect condition and the packaging was so premium. It completely transformed my living room.",
    date: "2 days ago",
    images: ["https://images.unsplash.com/photo-1604762524889-3e2fcc145683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"]
  },
  {
    id: "2",
    author: "Rahul K.",
    rating: 4,
    comment: "Healthy plant, but took a little longer to deliver than expected. Overall happy with the purchase.",
    date: "1 week ago"
  }
];

export function ProductDetails() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();
  const [added, setAdded] = useState(false);
  
  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-[#FAFAF9] dark:bg-neutral-950">
        <div>
          <h2 className="text-3xl font-serif mb-4">Plant not found</h2>
          <Link to="/shop" className="text-emerald-600 hover:underline">Return to Shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;

    if (editingReviewId) {
      setReviews(reviews.map(r => r.id === editingReviewId ? { ...r, rating: newReview.rating, comment: newReview.comment } : r));
      setEditingReviewId(null);
    } else {
      const review: Review = {
        id: Date.now().toString(),
        author: "You",
        rating: newReview.rating,
        comment: newReview.comment,
        date: "Just now"
      };
      setReviews([review, ...reviews]);
    }
    
    setNewReview({ rating: 5, comment: "" });
    setIsSubmittingReview(false);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  const handleEditReview = (review: Review) => {
    setEditingReviewId(review.id);
    setNewReview({ rating: review.rating, comment: review.comment });
    setIsSubmittingReview(true);
    // Scroll to form (simplified)
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-transparent py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link to="/shop" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-emerald-600 mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-2xl shadow-neutral-200/50 dark:shadow-black/50 sticky top-32"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
            />
            <button 
              onClick={(e) => {
                e.preventDefault();
                isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product);
              }}
              className="absolute top-6 right-6 w-12 h-12 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-400 hover:text-red-500 shadow-lg transition-all transform hover:scale-110"
            >
              <Heart className={`w-6 h-6 transition-colors ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-center py-6"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                  {product.category}
                </div>
                {product.rating && (
                  <div className="flex items-center space-x-1 text-amber-500 font-bold bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="text-3xl font-medium text-emerald-600 dark:text-emerald-400 mb-6">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
              
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {product.benefits && (
                <div className="mb-10">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">Key Benefits</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center space-x-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Smart Plant Match Score */}
              <div className="mb-10 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="flex items-center space-x-2 mb-6 relative z-10">
                  <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Smart Plant Match Score</h3>
                </div>
                
                <div className="space-y-4 relative z-10">
                  {[
                    { label: "Beginner Friendly", score: Math.floor(Math.random() * 3) + 7 },
                    { label: "Maintenance (Low = Better)", score: Math.floor(Math.random() * 4) + 3 },
                    { label: "Air Purification", score: Math.floor(Math.random() * 4) + 6 },
                    { label: "Pet Safety", score: Math.floor(Math.random() * 5) + 5 },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-end mb-1.5 text-sm">
                        <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.label}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.score}/10</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.score * 10}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Care instructions */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm flex items-start space-x-4 group hover:border-emerald-500/30 transition-colors">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-2xl text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white mb-1">Light</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">{product.lightLevel} Light</div>
                </div>
              </div>
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm flex items-start space-x-4 group hover:border-blue-500/30 transition-colors">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white mb-1">Water</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">{product.waterLevel} Water</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-5 px-8 rounded-2xl font-bold text-lg flex items-center justify-center transition-all duration-300 ${
                  added 
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 scale-[0.98]' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-1'
                }`}
              >
                {added ? (
                  'Added to Cart!'
                ) : (
                  <>
                    <ShoppingBag className="w-6 h-6 mr-3" /> Add to Cart
                  </>
                )}
              </button>

              <button className="flex-1 py-5 px-8 rounded-2xl font-bold text-lg flex items-center justify-center transition-all duration-300 bg-white dark:bg-neutral-900 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-neutral-800 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
                <Gift className="w-6 h-6 mr-3" /> Gift this Plant
              </button>
            </div>

            {/* Smart Bundles */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-6 border border-emerald-100 dark:border-emerald-800/30 mb-8">
              <h3 className="font-serif font-bold text-lg text-emerald-900 dark:text-emerald-100 mb-4">Complete the Set: Purifying Bundle</h3>
              <div className="flex items-center gap-4">
                <img src={product.image} className="w-16 h-16 rounded-xl object-cover" />
                <span className="text-2xl text-emerald-300">+</span>
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-200">
                  <img src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 pl-2">
                  <p className="font-bold text-sm text-neutral-900 dark:text-white mb-1">Add Premium Ceramic Pot</p>
                  <p className="text-sm font-bold text-emerald-600">₹899 <span className="line-through text-neutral-400 font-normal ml-1">₹1,200</span></p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">Add Both</button>
              </div>
            </div>

            <div className="mt-8 flex items-start space-x-4 text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-100/50 dark:bg-neutral-900/50 p-5 rounded-2xl">
              <Info className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
              <p>Plant size and appearance may vary slightly from the photos. We guarantee the health of all plants upon arrival and offer 24/7 care support.</p>
            </div>
          </motion.div>
        </div>

        {/* Customer Reviews Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-neutral-200 dark:border-neutral-800 pt-16 mb-24"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-2">Customer Reviews</h2>
              <div className="flex items-center space-x-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-neutral-300 dark:text-neutral-700'}`} />
                  ))}
                </div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">{product.rating} out of 5</span>
                <span className="text-neutral-500 dark:text-neutral-400">({reviews.length} reviews)</span>
              </div>
            </div>
            <button 
              onClick={() => {
                setIsSubmittingReview(!isSubmittingReview);
                setEditingReviewId(null);
                setNewReview({ rating: 5, comment: "" });
              }}
              className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Write a Review
            </button>
          </div>

          <AnimatePresence>
            {isSubmittingReview && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-12"
              >
                <form onSubmit={handleReviewSubmit} className="bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                  <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white">
                    {editingReviewId ? 'Edit Your Review' : 'Share Your Experience'}
                  </h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Overall Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button 
                          key={star} 
                          type="button" 
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star className={`w-8 h-8 ${star <= newReview.rating ? 'text-amber-500 fill-current' : 'text-neutral-300 dark:text-neutral-700'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Your Review</label>
                    <textarea 
                      required
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="What did you love about this plant?"
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none h-32"
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Add Photos (Optional)</label>
                    <div className="border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl p-8 text-center bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer">
                      <ImageIcon className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Click to upload or drag and drop images here</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button type="submit" className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-500 transition-colors">
                      {editingReviewId ? 'Update Review' : 'Submit Review'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsSubmittingReview(false)}
                      className="px-8 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-8">
            {reviews.map(review => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white">{review.author}</h4>
                      <div className="flex items-center space-x-2 text-sm mt-1">
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-neutral-300 dark:text-neutral-700'}`} />
                          ))}
                        </div>
                        <span className="text-neutral-400">•</span>
                        <span className="text-neutral-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  {review.author === "You" && (
                    <div className="flex space-x-2">
                      <button onClick={() => handleEditReview(review)} className="p-2 text-neutral-400 hover:text-emerald-500 bg-neutral-50 dark:bg-neutral-800 rounded-full transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteReview(review.id)} className="p-2 text-neutral-400 hover:text-red-500 bg-neutral-50 dark:bg-neutral-800 rounded-full transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                  {review.comment}
                </p>

                {review.images && review.images.length > 0 && (
                  <div className="flex gap-4 mt-4">
                    {review.images.map((img, idx) => (
                      <div key={idx} className="w-24 h-24 rounded-xl overflow-hidden cursor-pointer">
                        <img src={img} alt="Review" className="w-full h-full object-cover hover:scale-110 transition-transform" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
            
            {reviews.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
                <p className="text-lg text-neutral-500 dark:text-neutral-400">No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-neutral-200 dark:border-neutral-800 pt-16"
        >
          <div className="flex items-center space-x-2 text-emerald-600 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold tracking-wider uppercase text-sm">Smart Suggestions</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-8">Recently Viewed & Similar Plants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((p) => (
              <Link to={`/product/${p.id}`} key={p.id} className="group bg-white dark:bg-neutral-900 rounded-3xl p-4 border border-neutral-100 dark:border-neutral-800 hover:border-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/10">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 mb-4 relative">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-bold font-serif text-lg text-neutral-900 dark:text-white group-hover:text-emerald-600 transition-colors">{p.name}</h3>
                <p className="text-neutral-500 text-sm mb-2">{p.category}</p>
                <div className="font-bold text-emerald-600">₹{p.price.toLocaleString('en-IN')}</div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
