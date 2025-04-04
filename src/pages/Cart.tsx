
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/mockData";

// For demo purposes, we'll show some items in cart
// In a real app, this would come from a cart context
interface CartItem {
  productId: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: "1", quantity: 1 },
    { productId: "4", quantity: 2 }
  ]);
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter(item => item.productId !== productId));
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  };
  
  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Calculate cart totals
  const cartDetails = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product,
      total: product ? product.price * item.quantity : 0
    };
  });
  
  const subtotal = cartDetails.reduce((sum, item) => sum + item.total, 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;
  
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-4">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartDetails.map((item) => {
              const product = item.product;
              if (!product) return null;
              
              return (
                <Card key={item.productId}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Link to={`/products/${product.id}`} className="shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-24 w-24 object-cover rounded"
                        />
                      </Link>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link to={`/products/${product.id}`} className="font-medium hover:underline">
                            {product.name}
                          </Link>
                          <div className="font-bold">${(product.price * item.quantity).toFixed(2)}</div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          ${product.price.toFixed(2)} each
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-1">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
              <Button asChild variant="outline">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full" onClick={() => navigate("/checkout")}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
