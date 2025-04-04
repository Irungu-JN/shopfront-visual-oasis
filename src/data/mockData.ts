
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: { productId: string; quantity: number }[];
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Modern Laptop Pro",
    category: "electronics",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=500",
    description: "High-performance laptop with the latest technology for professionals.",
    rating: 4.8,
    inStock: true
  },
  {
    id: "2",
    name: "Wireless Noise-Cancelling Headphones",
    category: "electronics",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",
    description: "Premium headphones with active noise cancellation for immersive sound experience.",
    rating: 4.6,
    inStock: true
  },
  {
    id: "3",
    name: "Smart Watch Series 5",
    category: "electronics",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=500",
    description: "Advanced smartwatch with health tracking, GPS and smartphone connectivity.",
    rating: 4.5,
    inStock: true
  },
  {
    id: "4",
    name: "Premium Coffee Maker",
    category: "home",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=500",
    description: "Programmable coffee maker that brews the perfect cup every time.",
    rating: 4.4,
    inStock: true
  },
  {
    id: "5",
    name: "Modern Floor Lamp",
    category: "home",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=500",
    description: "Elegant floor lamp with adjustable brightness for your living space.",
    rating: 4.3,
    inStock: true
  },
  {
    id: "6",
    name: "Cotton Lounge Chair",
    category: "furniture",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=500",
    description: "Comfortable lounge chair with ergonomic design and premium materials.",
    rating: 4.7,
    inStock: false
  },
  {
    id: "7",
    name: "Designer Dining Table",
    category: "furniture",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=500",
    description: "Modern dining table that seats up to 6 people, perfect for family gatherings.",
    rating: 4.5,
    inStock: true
  },
  {
    id: "8",
    name: "Casual Cotton T-Shirt",
    category: "clothing",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500",
    description: "Comfortable cotton t-shirt, perfect for everyday wear.",
    rating: 4.2,
    inStock: true
  }
];

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=500"
  },
  {
    id: "home",
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?q=80&w=500"
  },
  {
    id: "furniture",
    name: "Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=500"
  },
  {
    id: "clothing",
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=500"
  }
];

export const orders: Order[] = [
  {
    id: "ORD-12345",
    date: "2025-03-25",
    status: "delivered",
    total: 1549.98,
    items: [
      { productId: "1", quantity: 1 },
      { productId: "2", quantity: 1 }
    ],
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2025-03-28"
  },
  {
    id: "ORD-12346",
    date: "2025-04-01",
    status: "shipped",
    total: 349.99,
    items: [
      { productId: "3", quantity: 1 }
    ],
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2025-04-08"
  },
  {
    id: "ORD-12347",
    date: "2025-04-03",
    status: "processing",
    total: 219.98,
    items: [
      { productId: "4", quantity: 1 },
      { productId: "8", quantity: 3 }
    ]
  }
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper function to get order by ID
export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};
