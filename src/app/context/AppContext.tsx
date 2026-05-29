import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../data/mock";
import { toast } from "sonner";

interface CartItem extends Product {
  quantity: number;
}

interface User {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  user: User | null;
  login: (email: string, role: 'user' | 'admin') => void;
  logout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  showAuthPopup: boolean;
  setShowAuthPopup: (show: boolean) => void;
  requireAuth: (callback: () => void) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('plantsteller_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('plantsteller_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const requireAuth = (callback: () => void) => {
    if (!user) {
      setShowAuthPopup(true);
      toast.error("Please login to continue", {
        description: "You need to be signed in to perform this action.",
      });
      return;
    }
    callback();
  };

  const addToWishlist = (product: Product) => {
    requireAuth(() => {
      setWishlist(prev => {
        if (!prev.find(item => item.id === product.id)) {
          return [...prev, product];
        }
        return prev;
      });
      toast.success("Added to Wishlist");
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const addToCart = (product: Product) => {
    requireAuth(() => {
      setCart(prev => {
        const exists = prev.find(item => item.id === product.id);
        if (exists) {
          return prev.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      toast.success("Added to Cart");
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const login = (email: string, role: 'user' | 'admin') => {
    setUser({ name: email.split('@')[0], email, role });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, cartTotal,
      wishlist, addToWishlist, removeFromWishlist, isInWishlist,
      user, login, logout,
      darkMode, toggleDarkMode,
      showAuthPopup, setShowAuthPopup, requireAuth
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};