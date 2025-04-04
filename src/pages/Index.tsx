
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import { products, categories } from "@/data/mockData";

const HeroSection: React.FC = () => (
  <div className="relative h-[500px] flex items-center">
    <div 
      className="absolute inset-0 bg-cover bg-center" 
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470)',
        filter: 'brightness(0.7)'
      }}
    />
    <div className="container relative z-10">
      <div className="max-w-lg text-white">
        <h1 className="text-5xl font-bold mb-4">Summer Tech Collection</h1>
        <p className="text-xl mb-6">Discover the latest tech gadgets for your digital lifestyle. Limited time offers available.</p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link to="/products">Shop Now</Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
            <Link to="/categories">Explore Categories</Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const FeaturedProducts: React.FC = () => (
  <section className="py-16 bg-background">
    <div className="container">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <Button asChild variant="outline">
          <Link to="/products">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>
);

const CategoriesSection: React.FC = () => (
  <section className="py-16 bg-slate-50">
    <div className="container">
      <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  </section>
);

const PromoBanner: React.FC = () => (
  <section className="py-16 bg-primary">
    <div className="container text-center text-white">
      <h2 className="text-3xl font-bold mb-2">Get 15% Off Your First Order</h2>
      <p className="text-xl mb-6 max-w-2xl mx-auto">Sign up for our newsletter and receive a discount code for your first purchase.</p>
      <div className="flex max-w-md mx-auto gap-2">
        <input 
          type="email" 
          placeholder="Your email address" 
          className="flex-1 px-4 py-3 rounded-md border text-black"
        />
        <Button variant="secondary" size="lg">Subscribe</Button>
      </div>
    </div>
  </section>
);

const Index: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <PromoBanner />
    </Layout>
  );
};

export default Index;
