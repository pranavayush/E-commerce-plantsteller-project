import { motion } from "motion/react";
import { useState } from "react";
import { Heart, MessageCircle, Share2, MapPin, Image as ImageIcon, Send } from "lucide-react";

export function Community() {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&q=80&w=800",
      caption: "My new Monstera is finally thriving in its new spot! 🌿✨ #IndoorJungle #PlantSteller",
      likes: 124,
      comments: 18,
      liked: false,
      time: "2 hours ago"
    },
    {
      id: 2,
      user: "Raj Patel",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1597055905081-8b43851759ce?auto=format&fit=crop&q=80&w=800",
      caption: "Added this beautiful Bonsai to my home office. Best decision ever. 🧘‍♂️🪴",
      likes: 89,
      comments: 5,
      liked: true,
      time: "5 hours ago"
    }
  ]);

  const [newPostText, setNewPostText] = useState("");

  const toggleLike = (id: number) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-transparent pt-8 pb-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white mb-4">Plant Community</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">Share your plant journey, get inspired, and connect with fellow plant lovers.</p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={() => setActiveTab('feed')} className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'feed' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'}`}>Community Feed</button>
          <button onClick={() => setActiveTab('leaderboard')} className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'leaderboard' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'}`}>Leaderboard</button>
          <button onClick={() => setActiveTab('featured')} className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'featured' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'}`}>Featured Setups</button>
        </div>

        {activeTab === 'feed' && (
          <>
            {/* Create Post */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-emerald-500/5 border border-neutral-200/50 dark:border-neutral-800/50 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 overflow-hidden flex-shrink-0 border border-emerald-200 dark:border-emerald-800/50">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="Your avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <textarea 
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Share your plant update, journal, or ask for advice..."
                    className="w-full bg-transparent border-none focus:ring-0 resize-none text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-500 text-lg min-h-[80px]"
                  />
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <button className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium px-4 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                      <ImageIcon className="w-5 h-5" />
                      <span>Photo</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl font-medium shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                      <span>Post</span>
                      <Send className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feed */}
            <div className="space-y-8">
              {posts.map((post, index) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl shadow-xl shadow-emerald-500/5 border border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img src={post.avatar} alt={post.user} className="w-12 h-12 rounded-full object-cover border border-neutral-200 dark:border-neutral-700" />
                        <div>
                          <h3 className="font-bold text-neutral-900 dark:text-white">{post.user}</h3>
                          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                            <MapPin className="w-3 h-3 mr-1" /> {post.location} • {post.time}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-lg mb-4">{post.caption}</p>
                  </div>
                  
                  <div className="w-full aspect-square md:aspect-video relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img src={post.image} alt="Plant showcase" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="p-6 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center space-x-1">
                        <Heart className={`w-4 h-4 ${post.liked ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                        <span>{post.likes} likes</span>
                      </div>
                      <div>{post.comments} comments</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className={`flex-1 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${post.liked ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold' : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 font-medium'}`}
                      >
                        <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                        <span>Like</span>
                      </button>
                      <button className="flex-1 py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 transition-colors font-medium">
                        <MessageCircle className="w-5 h-5" />
                        <span>Comment</span>
                      </button>
                      <button className="flex-1 py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 transition-colors font-medium">
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-emerald-500/5 border border-neutral-200/50 dark:border-neutral-800/50">
            <h2 className="text-2xl font-bold font-serif mb-6 text-center">🏆 Top Plant Lovers of the Month</h2>
            <div className="space-y-4">
              {[
                { rank: 1, name: "Priya Sharma", xp: 12500, plants: 42, icon: "👑" },
                { rank: 2, name: "Aarav Desai", xp: 10200, plants: 35, icon: "🥈" },
                { rank: 3, name: "Meera Reddy", xp: 9800, plants: 28, icon: "🥉" },
                { rank: 4, name: "Rahul K.", xp: 8500, plants: 21, icon: "🪴" },
                { rank: 5, name: "Sarah Jenkins", xp: 7900, plants: 19, icon: "🪴" },
              ].map((user) => (
                <div key={user.rank} className={`flex items-center justify-between p-4 rounded-2xl ${user.rank === 1 ? 'bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-900/10 border border-amber-200 dark:border-amber-800/50' : 'bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800'}`}>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl w-8 text-center">{user.icon}</span>
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white">{user.name}</h4>
                      <p className="text-sm text-neutral-500">{user.plants} Plants in Collection</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">{user.xp.toLocaleString()} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'featured' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl shadow-emerald-500/5 border border-neutral-200/50 dark:border-neutral-800/50">
              <div className="relative aspect-video">
                <img src="https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?auto=format&fit=crop&q=80&w=1200" alt="Featured setup" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <div className="inline-block bg-emerald-500 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Setup of the Month</div>
                    <h2 className="text-3xl font-serif font-bold mb-2">Urban Balcony Oasis</h2>
                    <p className="text-neutral-300">By Ananya Gupta • Mumbai</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-6">
                  "I transformed my 50 sq ft balcony into a lush tropical retreat. Using a mix of hanging Pothos, a large Monstera, and several Calatheas to create depth and humidity."
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-lg text-sm text-neutral-600 dark:text-neutral-300">Monstera Deliciosa</span>
                  <span className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-lg text-sm text-neutral-600 dark:text-neutral-300">Golden Pothos</span>
                  <span className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-lg text-sm text-neutral-600 dark:text-neutral-300">Calathea Ornata</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}