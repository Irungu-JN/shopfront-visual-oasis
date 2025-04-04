
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrderById, getProductById } from "@/data/mockData";
import { Check, Truck, Package, Clock } from "lucide-react";

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = id ? getOrderById(id) : undefined;
  
  if (!order) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-6">We couldn't find the order you're looking for.</p>
          <Button onClick={() => navigate("/orders")}>View All Orders</Button>
        </div>
      </Layout>
    );
  }
  
  const orderItems = order.items.map(item => {
    const product = getProductById(item.productId);
    return {
      ...item,
      product,
      total: product ? product.price * item.quantity : 0
    };
  }).filter(item => item.product); // Filter out any items with no product
  
  const renderTrackingStatus = () => {
    if (order.status === "processing") {
      return (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <Clock className="h-5 w-5" />
            <h3 className="font-medium">Order Processing</h3>
          </div>
          <p className="text-blue-700">
            Your order is being prepared. We'll update you when it ships.
          </p>
        </div>
      );
    }
    
    if (order.status === "shipped") {
      return (
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4 text-amber-600">
            <Truck className="h-5 w-5" />
            <h3 className="font-medium">Order Shipped</h3>
          </div>
          <p className="text-amber-700 mb-4">
            Your order is on the way! Estimated delivery: {order.estimatedDelivery && new Date(order.estimatedDelivery).toLocaleDateString()}
          </p>
          {order.trackingNumber && (
            <div className="flex items-center gap-2 p-3 bg-white rounded border">
              <span className="text-sm font-medium">Tracking Number:</span>
              <span className="text-sm">{order.trackingNumber}</span>
            </div>
          )}
        </div>
      );
    }
    
    if (order.status === "delivered") {
      return (
        <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4 text-green-600">
            <Check className="h-5 w-5" />
            <h3 className="font-medium">Order Delivered</h3>
          </div>
          <p className="text-green-700">
            Your order was delivered on {order.estimatedDelivery && new Date(order.estimatedDelivery).toLocaleDateString()}.
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  // Progress bar steps
  const steps = [
    { name: "Processing", icon: Package, status: "complete" },
    { name: "Shipped", icon: Truck, status: order.status === "shipped" || order.status === "delivered" ? "complete" : "pending" },
    { name: "Delivered", icon: Check, status: order.status === "delivered" ? "complete" : "pending" }
  ];
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Order #{order.id}</h1>
            <p className="text-muted-foreground">
              Placed on {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/orders")}>
            Back to Orders
          </Button>
        </div>
        
        {renderTrackingStatus()}
        
        {/* Progress bar */}
        {order.status !== "cancelled" && (
          <div className="mb-8">
            <div className="relative">
              <div className="overflow-hidden h-2 mb-6 rounded bg-slate-200">
                <div 
                  className="bg-primary h-full" 
                  style={{ width: order.status === "processing" ? "33%" : order.status === "shipped" ? "66%" : "100%" }}
                />
              </div>
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.name} className="flex flex-col items-center">
                    <div 
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        step.status === "complete" ? "bg-primary text-white" : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="mt-2 text-sm font-medium">{step.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {orderItems.map(item => {
                    const product = item.product;
                    if (!product) return null;
                    
                    return (
                      <div key={item.productId} className="flex gap-4">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-16 w-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{product.name}</h3>
                            <span className="font-bold">${item.total.toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ${product.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <div>
                  <p>John Doe</p>
                  <p>1234 Elm Street</p>
                  <p>Apt 567</p>
                  <p>San Francisco, CA 94103</p>
                  <p>United States</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${(order.total * 0.93).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$5.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(order.total * 0.07).toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 bg-muted/20">
                <div className="w-full">
                  <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                  <p>Credit Card ending in 4242</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
