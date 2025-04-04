
import React from "react";
import { Link } from "react-router-dom";
import { Order, getProductById } from "@/data/mockData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderCardProps {
  order: Order;
}

const OrderStatusBadge: React.FC<{ status: Order["status"] }> = ({ status }) => {
  const variants = {
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-amber-100 text-amber-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };
  
  const labels = {
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled"
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[status]}`}>
      {labels[status]}
    </span>
  );
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  // Get the first product image to display
  const firstItem = order.items[0];
  const productImage = firstItem ? getProductById(firstItem.productId)?.image : undefined;
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <Link to={`/orders/${order.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {productImage && (
              <div className="w-16 h-16 shrink-0">
                <img 
                  src={productImage} 
                  alt="Order item" 
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">{order.id}</h3>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(order.date).toLocaleDateString()} • {itemCount} item{itemCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t bg-muted/50 flex justify-between">
          <span className="text-sm">
            {order.status === "shipped" && order.estimatedDelivery && (
              <>Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</>
            )}
            {order.status === "processing" && (
              <>Preparing your order</>
            )}
            {order.status === "delivered" && (
              <>Delivered on {new Date(order.estimatedDelivery || "").toLocaleDateString()}</>
            )}
          </span>
          <span className="font-bold">${order.total.toFixed(2)}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default OrderCard;
