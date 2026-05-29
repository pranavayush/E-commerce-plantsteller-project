import { useAppContext } from "../context/AppContext";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, requireAuth } = useAppContext();
  const [step, setStep] = useState<'cart' | 'delivery' | 'success'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = () => {
    requireAuth(() => {
      setStep('delivery');
    });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
      toast.success("Order placed successfully!");
    }, 2000);
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-transparent flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="text-center max-w-md relative z-10"
        >
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-24 h-24 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-xl rounded-[2rem] flex items-center justify-center mx-auto mb-8"
          >
            <Trash2 className="w-10 h-10 text-emerald-400" />
          </motion.div>
          <h2 className="text-4xl font-serif font-bold text-neutral-900 dark:text-white mb-4">Your cart is empty</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8 text-lg">
            Looks like you haven't added any plants to your cart yet. Let's find something green for your space.
          </p>
          <Link to="/shop" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-2xl text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-1 w-full group">
            Explore Collection
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-transparent flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md relative z-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl p-10 border border-neutral-200 dark:border-neutral-800 shadow-2xl"
        >
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-4">Order Confirmed!</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8">
            Thank you for shopping with PlantSteller. Your green companions will be on their way soon.
          </p>
          <button 
            onClick={() => window.location.href = '/shop'}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-2xl text-white bg-emerald-600 hover:bg-emerald-500 transition-all w-full"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-transparent py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {step === 'delivery' && (
          <button onClick={() => setStep('cart')} className="flex items-center text-neutral-500 hover:text-emerald-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
          </button>
        )}
        
        <h1 className="text-4xl font-serif font-bold text-neutral-900 dark:text-white mb-10">
          {step === 'cart' ? 'Shopping Cart' : 'Delivery Details'}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 'cart' ? (
                <motion.div 
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-neutral-900 rounded-3xl shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden"
                >
                  <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {cart.map((item) => (
                      <li key={item.id} className="p-6 sm:p-8 flex items-center space-x-6">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-500 uppercase tracking-wider mb-1">{item.category}</p>
                              <h3 className="text-xl font-bold font-serif text-neutral-900 dark:text-white">
                                <Link to={`/product/${item.id}`}>{item.name}</Link>
                              </h3>
                            </div>
                            <p className="text-lg font-bold text-neutral-900 dark:text-white ml-4">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-10 text-center font-medium text-neutral-900 dark:text-white">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-neutral-400 hover:text-red-500 transition-colors p-2">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div 
                  key="delivery"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-xl shadow-emerald-500/5"
                >
                  <form id="delivery-form" onSubmit={handlePayment} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Full Name *</label>
                        <input required type="text" className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Mobile Number *</label>
                        <input required type="tel" className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Email Address *</label>
                      <input required type="email" className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Complete Address *</label>
                      <textarea required rows={3} className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors resize-none"></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">City *</label>
                        <input required type="text" className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">State *</label>
                        <input required type="text" className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Pincode *</label>
                        <input required type="text" className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors" />
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl shadow-xl shadow-emerald-500/5 border border-neutral-200/50 dark:border-neutral-800/50 p-8 sticky top-28">
              <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900 dark:text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Shipping</span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {cartTotal > 1000 ? 'Free' : '₹150'}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 mb-8">
                <div className="flex justify-between items-center text-xl">
                  <span className="font-bold text-neutral-900 dark:text-white">Total</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{(cartTotal + (cartTotal > 1000 ? 0 : 150)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              
              {step === 'cart' ? (
                <button 
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-lg shadow-emerald-500/20 text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                >
                  Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              ) : (
                <button 
                  form="delivery-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-lg shadow-emerald-500/20 text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Pay Now"}
                </button>
              )}
              
              <p className="mt-4 text-xs text-center text-neutral-500 flex items-center justify-center">
                 Secure checkout powered by Razorpay (Mocked)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
