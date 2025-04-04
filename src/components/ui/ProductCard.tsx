
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/data/mockData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <Card className="product-card h-full">
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image"
              loading="lazy"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Badge variant="destructive" className="text-sm px-3 py-1">Out of Stock</Badge>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4">
          <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
          <div className="flex justify-between items-center w-full mt-1">
            <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
            <div className="flex items-center gap-1">
              <span className="text-amber-500">★</span>
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
