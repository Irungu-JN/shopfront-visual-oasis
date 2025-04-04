
import React from "react";
import { Link } from "react-router-dom";
import { Category } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/categories/${category.id}`}>
      <Card className="overflow-hidden h-40 relative group">
        <CardContent className="p-0 h-full">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-white text-xl font-bold">{category.name}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
