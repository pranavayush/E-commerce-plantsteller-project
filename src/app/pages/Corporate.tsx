import { useState } from "react";
import { motion } from "motion/react";
import { Building2, Users, Gift, Sparkles, Send, Upload, ShieldCheck, Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function Corporate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Corporate request submitted successfully!");
    }, 1500);
  };

  return (
    <div className="pt-8 pb-24 bg-transparent min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mb-6">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide uppercase">B2B & Bulk Orders</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 dark:text-white mb-6">
            Corporate Gifting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">Reimagined</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-neutral-600 dark:text-neutral-400">
            Elevate your corporate relationships with premium, sustainable botanical gifts. Perfect for employee onboarding, client appreciation, and special events.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-xl shadow-emerald-500/5"
          >
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white mb-4">Request Received</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                  Thank you for choosing PlantSteller. Our corporate team will get back to you within 24 hours with a custom quotation.
                </p>
                <button onClick={() => setSubmitted(false)} className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Company Name *</label>
                    <input required type="text" className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Contact Person *</label>
                    <input required type="text" className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Phone Number *</label>
                    <input required type="tel" className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Email Address *</label>
                  <input required type="email" className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Event Type</label>
                    <select className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors">
                      <option>Employee Gifts</option>
                      <option>Client Gifts</option>
                      <option>Corporate Events</option>
                      <option>Conferences</option>
                      <option>Festivals (Diwali, etc.)</option>
                      <option>Welcome Kits</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Estimated Quantity</label>
                    <select className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors">
                      <option>20 - 50</option>
                      <option>50 - 100</option>
                      <option>100 - 500</option>
                      <option>500+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Budget Range (Per Gift)</label>
                  <select className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors">
                    <option>₹500 - ₹1,000</option>
                    <option>₹1,000 - ₹2,500</option>
                    <option>₹2,500 - ₹5,000</option>
                    <option>Above ₹5,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Custom Branding (Optional)</label>
                  <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-6 text-center hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors cursor-pointer group">
                    <Upload className="w-8 h-8 mx-auto text-neutral-400 group-hover:text-emerald-500 mb-2" />
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Click to upload company logo</p>
                    <p className="text-xs text-neutral-500 mt-1">SVG, PNG, JPG (Max 5MB)</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Personalized Gift Message / Additional Details</label>
                  <textarea rows={4} className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors resize-none"></textarea>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-emerald-500/30"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">Processing...</span>
                  ) : (
                    <span className="flex items-center">Request Quotation <Send className="w-5 h-5 ml-2" /></span>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-emerald-950 text-white rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center mix-blend-overlay" />
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-4">Why PlantSteller Corporate?</h3>
                <ul className="space-y-4">
                  {[
                    { icon: ShieldCheck, text: "Seamless Corporate Billing" },
                    { icon: Sparkles, text: "Premium Packaging & Custom Branding" },
                    { icon: Users, text: "End-to-End Delivery Management" },
                    { icon: Gift, text: "Exclusive Bulk Pricing Discounts" }
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <div className="bg-emerald-500/20 p-2 rounded-lg">
                        <feature.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span className="text-emerald-50">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-neutral-600 dark:text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Need Immediate Assistance?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">Our corporate team is available 24/7</p>
              <a 
                href="https://wa.me/919354447494" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold transition-colors shadow-lg shadow-[#25D366]/30"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}