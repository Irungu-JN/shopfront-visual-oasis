
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ui/ProductCard";
import { products, categories } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  const filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    // Price filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setPriceRange([0, 1500]);
  };
  
  const FiltersPanel = () => (
    <div className={`${isMobile ? 'w-full' : 'w-64'} bg-white p-4 space-y-6 rounded-lg border`}>
      {isMobile && (
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Filters</h3>
          <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
            <X size={20} />
          </Button>
        </div>
      )}
      
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category.id}`} 
                checked={selectedCategory === category.id}
                onCheckedChange={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
              />
              <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <Slider 
          defaultValue={priceRange} 
          min={0} 
          max={1500} 
          step={10} 
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        onClick={handleClearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>
        
        <div className="flex gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {isMobile && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={18} />
            </Button>
          )}
        </div>
        
        <div className="flex gap-6">
          {/* Desktop filters sidebar */}
          {!isMobile && (
            <aside className="hidden md:block">
              <FiltersPanel />
            </aside>
          )}
          
          {/* Mobile filters modal */}
          {isMobile && showFilters && (
            <div className="fixed inset-0 bg-background z-50 p-4 overflow-auto">
              <FiltersPanel />
            </div>
          )}
          
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button onClick={handleClearFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
