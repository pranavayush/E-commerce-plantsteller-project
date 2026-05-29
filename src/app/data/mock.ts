export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
  lightLevel: 'Low' | 'Medium' | 'High';
  waterLevel: 'Low' | 'Medium' | 'High';
  isNew?: boolean;
  benefits?: string[];
  rating?: number;
}

export const CATEGORIES = ['All', 'Indoor Plants', 'Outdoor Plants', 'Medicinal Plants', 'Flowering Plants', 'Air Purifying Plants', 'Bonsai Collection', 'Succulents', 'Hanging Plants'];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    price: 1299.00,
    category: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1616610413441-f1653e1a0dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50JTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzk5ODg0ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Also known as the Swiss Cheese Plant, this stunning tropical beauty features large, glossy, fenestrated leaves. Perfect for adding a modern architectural feel to any room.',
    featured: false,
    lightLevel: 'Medium',
    waterLevel: 'Medium',
    isNew: true,
    benefits: ['Air Purifying', 'Statement Piece'],
    rating: 4.8
  },
  {
    id: '2',
    name: 'Fiddle Leaf Fig',
    price: 1599.00,
    category: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1531875985735-f135dac5f230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWRkbGUlMjBsZWFmJTIwZmlnJTIwbW9kZXJufGVufDF8fHx8MTc3OTk4ODQ4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A striking statement plant with large, heavily veined, violin-shaped leaves. Elevates the aesthetic of spacious, brightly lit living areas.',
    featured: false,
    lightLevel: 'High',
    waterLevel: 'Medium',
    benefits: ['Improves Humidity', 'Focal Point'],
    rating: 4.6
  },
  {
    id: '3',
    name: 'Premium Bonsai Tree',
    price: 3499.00,
    category: 'Bonsai Collection',
    image: 'https://images.unsplash.com/photo-1778553244030-500d659fdb08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib25zYWklMjB0cmVlJTIwbHV4dXJ5fGVufDF8fHx8MTc3OTk4OTQzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'An ancient art form brought to your living room. This premium Bonsai tree offers a sense of tranquility and luxurious minimalism.',
    featured: true,
    lightLevel: 'High',
    waterLevel: 'Medium',
    isNew: true,
    benefits: ['Stress Relief', 'Artistic Decor'],
    rating: 4.9
  },
  {
    id: '4',
    name: 'Elegant White Lily',
    price: 899.00,
    category: 'Flowering Plants',
    image: 'https://images.unsplash.com/photo-1616694547693-b0f829a6cf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWx5JTIwZmxvd2VyJTIwd2hpdGUlMjBpbmRvb3J8ZW58MXx8fHwxNzc5OTg5NDMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Symbolizing purity and refined beauty, the indoor White Lily adds a fragrant, sophisticated touch to any premium interior.',
    featured: true,
    lightLevel: 'High',
    waterLevel: 'Medium',
    benefits: ['Beautiful Fragrance', 'Mood Enhancer'],
    rating: 4.7
  },
  {
    id: '5',
    name: 'Classic Velvet Rose',
    price: 699.00,
    category: 'Flowering Plants',
    image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NlJTIwZmxvd2VyJTIwZWxlZ2FudHxlbnwxfHx8fDE3Nzk5ODk0MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A deeply elegant potted rose variety offering continuous blooms. Requires bright indirect light to maintain its luxurious appearance.',
    featured: true,
    lightLevel: 'High',
    waterLevel: 'Medium',
    benefits: ['Romantic Aesthetic', 'Floral Aroma'],
    rating: 4.8
  },
  {
    id: '6',
    name: 'Aloe Vera',
    price: 399.00,
    category: 'Medicinal Plants',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9lJTIwdmVyYSUyMHBsYW50fGVufDF8fHx8MTc3OTg4NTg2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A structural masterpiece and nature’s healer. Its thick, fleshy leaves store soothing gel perfect for skin care.',
    featured: true,
    lightLevel: 'High',
    waterLevel: 'Low',
    benefits: ['Skin Healing', 'Air Purifying'],
    rating: 4.9
  },
  {
    id: '7',
    name: 'Snake Plant Laurentii',
    price: 599.00,
    category: 'Air Purifying Plants',
    image: 'https://images.unsplash.com/photo-1668426231244-1827c29ef8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFrZSUyMHBsYW50JTIwaW5kb29yfGVufDF8fHx8MTc3OTgyMDQzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'One of the most resilient indoor plants available. Features upright, sword-like leaves with striking yellow edges. Excellent air purifier.',
    featured: true,
    lightLevel: 'Low',
    waterLevel: 'Low',
    benefits: ['Night Oxygen', 'Indestructible'],
    rating: 4.9
  },
  {
    id: '8',
    name: 'Holy Basil (Tulsi)',
    price: 299.00,
    category: 'Medicinal Plants',
    image: 'https://images.unsplash.com/photo-1665479754958-1a8bdc47cc0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dWxzaSUyMGhvbHklMjBiYXNpbCUyMHBsYW50fGVufDF8fHx8MTc3OTk4OTQyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A sacred plant in Indian tradition, revered for its aromatic leaves and numerous health benefits. Best kept in sunny spots.',
    featured: true,
    lightLevel: 'High',
    waterLevel: 'Medium',
    benefits: ['Immunity Booster', 'Aromatic'],
    rating: 4.7
  },
  {
    id: '9',
    name: 'Golden Pothos (Money Plant)',
    price: 499.00,
    category: 'Air Purifying Plants',
    image: 'https://images.unsplash.com/photo-1651749298723-76f60d3f8025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMHBsYW50JTIwcG90aG9zfGVufDF8fHx8MTc3OTk4OTQzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A lush, trailing vine that brings instant vibrancy. Known for supposedly bringing wealth and prosperity to its caretakers.',
    featured: true,
    lightLevel: 'Low',
    waterLevel: 'Medium',
    benefits: ['Air Purifying', 'Low Maintenance'],
    rating: 4.8
  },
  {
    id: '10',
    name: 'French Lavender',
    price: 799.00,
    category: 'Medicinal Plants',
    image: 'https://images.unsplash.com/photo-1565011523534-747a8601f10a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMHBsYW50JTIwcG90fGVufDF8fHx8MTc3OTk4OTQyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Famous for its calming fragrance and striking purple blooms. Ideal for bright windowsills or patio settings.',
    featured: true,
    lightLevel: 'High',
    waterLevel: 'Medium',
    benefits: ['Improves Sleep', 'Stress Relief'],
    rating: 4.9
  },
  {
    id: '11',
    name: 'Phalaenopsis Orchid',
    price: 1499.00,
    category: 'Flowering Plants',
    image: 'https://images.unsplash.com/photo-1619783547903-33edeced430a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoaWQlMjBmbG93ZXIlMjBpbmRvb3J8ZW58MXx8fHwxNzc5OTg5NDMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'An exceptionally elegant orchid with long-lasting blooms. Adds a touch of refined luxury to modern workspaces or living areas.',
    featured: true,
    lightLevel: 'Medium',
    waterLevel: 'Low',
    benefits: ['Long-lasting Blooms', 'Exotic Look'],
    rating: 4.8
  },
  {
    id: '12',
    name: 'Star Jasmine',
    price: 899.00,
    category: 'Flowering Plants',
    image: 'https://images.unsplash.com/photo-1623171404570-1d196759fe20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXNtaW5lJTIwcGxhbnR8ZW58MXx8fHwxNzc5OTg5NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A beautiful vining plant producing delicate white flowers with a famously intoxicating, sweet fragrance.',
    featured: true,
    lightLevel: 'High',
    waterLevel: 'Medium',
    benefits: ['Intoxicating Scent', 'Natural Decor'],
    rating: 4.7
  }
];