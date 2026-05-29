import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { PRODUCTS } from "../data/mock";
import { Package, ShoppingBag, Settings, LogOut, Users, PlusCircle, Shield, Laptop, History, CheckCircle2, Tag, Calendar } from "lucide-react";
import { motion } from "motion/react";

export function Dashboard() {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'security' | 'products' | 'customers' | 'offers'>('orders');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role === 'admin' && activeTab === 'orders') {
      setActiveTab('products');
    }
  }, [user]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-transparent py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-100 dark:border-neutral-800 mb-6 shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mb-4 uppercase shadow-lg shadow-emerald-500/20">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-serif font-bold text-neutral-900 dark:text-white mb-1">{user.name}</h2>
              <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md inline-flex capitalize">
                <Shield className="w-3 h-3 mr-1" /> {user.role} Account
              </div>
            </div>

            <nav className="space-y-1 bg-white dark:bg-neutral-900 rounded-3xl p-4 border border-neutral-100 dark:border-neutral-800 shadow-sm">
              {user.role === 'admin' ? (
                <>
                  <button onClick={() => setActiveTab('products')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'products' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                    <Package className="w-5 h-5" />
                    <span>Products</span>
                  </button>
                  <button onClick={() => setActiveTab('customers')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'customers' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                    <Users className="w-5 h-5" />
                    <span>Customers</span>
                  </button>
                  <button onClick={() => setActiveTab('offers')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'offers' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                    <Tag className="w-5 h-5" />
                    <span>Seasonal Offers</span>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'orders' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                    <ShoppingBag className="w-5 h-5" />
                    <span>My Orders</span>
                  </button>
                </>
              )}
              
              <button onClick={() => setActiveTab('security')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'security' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                <Shield className="w-5 h-5" />
                <span>Security</span>
              </button>
              
              <hr className="my-4 border-neutral-100 dark:border-neutral-800" />
              
              <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl font-medium transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'products' && user.role === 'admin' && <AdminView />}
            {activeTab === 'offers' && user.role === 'admin' && <AdminOffersView />}
            {activeTab === 'orders' && user.role === 'user' && <UserView />}
            {activeTab === 'security' && <SecurityView />}
          </div>
        </div>
      </div>
    </div>
  );
}

function SecurityView() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white">Account Security</h1>
            <p className="text-sm text-neutral-500">Manage your connected devices and login history</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center">
              <Laptop className="w-5 h-5 mr-2 text-neutral-400" /> Connected Devices
            </h3>
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl divide-y divide-neutral-200 dark:divide-neutral-800">
              {[
                { name: 'MacBook Pro - Chrome', location: 'Mumbai, India', status: 'Active now', isCurrent: true },
                { name: 'iPhone 14 Pro - Safari', location: 'Mumbai, India', status: 'Last active 2 hours ago', isCurrent: false }
              ].map((device, i) => (
                <div key={i} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-500">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-neutral-900 dark:text-white flex items-center">
                        {device.name}
                        {device.isCurrent && <span className="ml-2 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] uppercase tracking-wider rounded-md">This Device</span>}
                      </div>
                      <div className="text-xs text-neutral-500">{device.location} • {device.status}</div>
                    </div>
                  </div>
                  {!device.isCurrent && (
                    <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">Revoke Access</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center">
              <History className="w-5 h-5 mr-2 text-neutral-400" /> Recent Login History
            </h3>
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl divide-y divide-neutral-200 dark:divide-neutral-800">
              {[
                { date: 'Today, 10:23 AM', ip: '192.168.1.1', status: 'Success' },
                { date: 'Yesterday, 04:15 PM', ip: '192.168.1.1', status: 'Success' },
                { date: 'Oct 12, 09:00 AM', ip: '10.0.0.5', status: 'Failed Attempt' }
              ].map((log, i) => (
                <div key={i} className="p-4 flex justify-between items-center text-sm">
                  <div>
                    <div className="font-bold text-neutral-900 dark:text-white">{log.date}</div>
                    <div className="text-xs text-neutral-500">IP: {log.ip}</div>
                  </div>
                  <div className={`flex items-center space-x-1 font-medium ${log.status === 'Success' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {log.status === 'Success' ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-red-500" />}
                    <span>{log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AdminView() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800 min-h-[500px] shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white">Product Management</h1>
          <p className="text-sm text-neutral-500">Manage your store's inventory</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 text-sm font-bold">
          <PlusCircle className="w-4 h-4 mr-2" /> Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="py-4 px-4 text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Product</th>
              <th className="py-4 px-4 text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Category</th>
              <th className="py-4 px-4 text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Price</th>
              <th className="py-4 px-4 text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map(product => (
              <tr key={product.id} className="border-b border-neutral-100 dark:border-neutral-800/50 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                    <span className="font-medium text-neutral-900 dark:text-white">{product.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-neutral-600 dark:text-neutral-400">{product.category}</td>
                <td className="py-4 px-4 font-bold text-neutral-900 dark:text-white">₹{product.price.toLocaleString('en-IN')}</td>
                <td className="py-4 px-4 text-right">
                  <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserView() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800 min-h-[500px] flex items-center justify-center shadow-sm">
      <div className="text-center">
        <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-serif font-bold text-neutral-900 dark:text-white mb-2">No orders yet</h2>
        <p className="text-neutral-500 mb-6">Looks like you haven't made any purchases yet.</p>
        <button className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg">
          Start Shopping
        </button>
      </div>
    </div>
  );
}

function AdminOffersView() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm">
        <div>
          <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white mb-1">Seasonal Offers & Promotions</h2>
          <p className="text-sm text-neutral-500">Manage flash sales, seasonal banners, and dynamic deals.</p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center space-x-2">
          <PlusCircle className="w-5 h-5" />
          <span>Create New Offer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: "Summer Green Sale", type: "Season", status: "Active", discount: "Up to 50%", icon: "☀️", color: "text-amber-500", bg: "bg-amber-50" },
          { title: "Monsoon Garden Festival", type: "Season", status: "Scheduled", discount: "Flat 25%", icon: "🌧️", color: "text-blue-500", bg: "bg-blue-50" },
          { title: "Diwali Special", type: "Festival", status: "Scheduled", discount: "BOGO", icon: "🪔", color: "text-orange-500", bg: "bg-orange-50" },
          { title: "Deal of the Day", type: "Flash Sale", status: "Active", discount: "₹49 Starting", icon: "⚡", color: "text-red-500", bg: "bg-red-50" },
        ].map((offer, idx) => (
          <div key={idx} className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${offer.bg} dark:bg-neutral-800`}>
                  {offer.icon}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white">{offer.title}</h3>
                  <div className="text-xs text-neutral-500 flex items-center space-x-2 mt-1">
                    <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">{offer.type}</span>
                    <span className={`px-2 py-0.5 rounded-md font-medium ${offer.status === 'Active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30'}`}>
                      {offer.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-neutral-400 hover:text-emerald-600"><Settings className="w-5 h-5" /></button>
            </div>
            
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
              <div>
                <div className="text-xs text-neutral-500">Discount/Offer</div>
                <div className="font-bold text-neutral-900 dark:text-white">{offer.discount}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={offer.status === 'Active'} />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
