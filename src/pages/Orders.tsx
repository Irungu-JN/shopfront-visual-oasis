
import React from "react";
import Layout from "@/components/layout/Layout";
import OrderCard from "@/components/ui/OrderCard";
import { orders } from "@/data/mockData";
import { Package } from "lucide-react";

const Orders: React.FC = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground">
              When you place orders, they will appear here for you to track.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
