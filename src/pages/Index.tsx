
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import { products, categories } from "@/data/mockData";
import { ArrowRight, ArrowDown, TrendingUp, Gift, Clock, Check, Star } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { toast } from "@/lib/toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      title: "Summer Tech Collection",
      description: "Discover the latest tech gadgets for your digital lifestyle. Limited time offers available.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470",
      color: "from-blue-500/50 to-purple-500/50"
    },
    {
      title: "New Arrivals Weekly",
      description: "Be the first to shop our latest products with exclusive early access offers.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1470",
      color: "from-amber-500/50 to-red-500/50"
    },
    {
      title: "Premium Selection",
      description: "Hand-picked quality products with premium features at competitive prices.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470",
      color: "from-emerald-500/50 to-teal-500/50"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[600px] flex items-center overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`} 
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} mix-blend-multiply`}></div>
        </div>
      ))}
      
      <div className="container relative z-10">
        <div className="max-w-lg text-white animate-fade-in">
          <Badge variant="outline" className="bg-white/10 text-white mb-4 backdrop-blur-sm">
            {currentSlide === 0 ? "Featured Collection" : currentSlide === 1 ? "Just Launched" : "Best Sellers"}
          </Badge>
          <h1 className="text-5xl font-bold mb-4">{heroSlides[currentSlide].title}</h1>
          <p className="text-xl mb-8">{heroSlides[currentSlide].description}</p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="animate-pulse">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
              <Link to="/categories">Explore Categories</Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-8 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-white/30'}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts: React.FC = () => (
  <section className="py-16 bg-background">
    <div className="container">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Badge variant="outline" className="bg-primary/10 text-primary mb-2">
            Featured Products
          </Badge>
          <h2 className="text-3xl font-bold">Trending This Week</h2>
        </div>
        <Button asChild variant="outline" className="group">
          <Link to="/products">
            View All <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {products.slice(0, 8).map(product => (
            <CarouselItem key={product.id} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="h-full">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="static transform-none mx-2" />
          <CarouselNext className="static transform-none mx-2" />
        </div>
      </Carousel>
    </div>
  </section>
);

const CategoriesSection: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-primary/10 text-primary mb-2">
            Browse Categories
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map(category => (
            <div 
              key={category.id}
              className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <CategoryCard category={category} />
              
              <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${hoveredCategory === category.id ? 'opacity-100' : 'opacity-0'}`}>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  <Link to={`/categories/${category.id}`}>View Products</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialSection: React.FC = () => {
  const testimonials = [
    { 
      id: 1, 
      name: "Sarah Johnson", 
      role: "Tech Enthusiast",
      comment: "The products exceeded my expectations. Quick delivery and the quality is outstanding.",
      rating: 5
    },
    { 
      id: 2, 
      name: "Michael Chen", 
      role: "Professional Photographer",
      comment: "I've been searching for reliable tech accessories for years. Finally found my go-to store.",
      rating: 5
    },
    { 
      id: 3, 
      name: "Emma Wilson", 
      role: "Digital Nomad",
      comment: "Great customer service and fast shipping. Will definitely shop here again.",
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-primary/10 text-primary mb-2">
            Testimonials
          </Badge>
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it – hear from some of our satisfied customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <Card key={testimonial.id} className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                    />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const PromoBanner: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Subscribed successfully!", { 
        description: "Your discount code has been sent to your email."
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-primary">
      <div className="container">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <Badge variant="outline" className="bg-primary/10 text-primary mb-2 w-fit">
                Limited Offer
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get 15% Off Your First Order</h2>
              <p className="text-xl mb-8 text-muted-foreground">Sign up for our newsletter and receive a discount code for your first purchase.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex max-w-md gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 px-4 py-3 rounded-md border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="default" size="lg">Subscribe</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
            <div 
              className="bg-cover bg-center h-64 md:h-auto" 
              style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=1470)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const SellerInfoSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-primary/10 text-primary mb-2">
            Join Our Marketplace
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Sell Your Products With Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expand your business reach and connect with thousands of customers on our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Grow Your Revenue</h3>
              <p className="text-muted-foreground">
                Reach thousands of potential customers and increase your sales with our high-traffic platform.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Simple Setup</h3>
              <p className="text-muted-foreground">
                Get started quickly with our easy onboarding process and intuitive seller dashboard.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Fast Payments</h3>
              <p className="text-muted-foreground">
                Receive your earnings quickly with our secure and reliable payment processing system.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center">
          <Button size="lg" className="px-8" asChild>
            <Link to="/seller">Become a Seller</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="outline" className="bg-primary/10 text-primary mb-2">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl font-bold mb-6">The Ultimate Shopping Experience</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We provide a seamless shopping experience with premium features and benefits that make us the preferred choice for tech enthusiasts.
            </p>
            
            <div className="space-y-4">
              {[
                "Free shipping on orders over $50",
                "30-day money-back guarantee",
                "24/7 customer support",
                "Secure payment processing"
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-slate-100 h-48 rounded-lg" style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div className="bg-slate-100 h-64 rounded-lg" style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=1470)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-slate-100 h-64 rounded-lg" style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div className="bg-slate-100 h-48 rounded-lg" style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1470)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery."
    },
    {
      question: "Can I return items I've purchased?",
      answer: "Yes, we offer a 30-day return policy on all items. Products must be in their original condition and packaging."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping times vary by location."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email that you can use to monitor its progress."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay for secure and convenient transactions."
    }
  ];
  
  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-primary/10 text-primary mb-2">
            Customer Support
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and more
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Contact our support team.
          </p>
          <Button variant="outline">Contact Support</Button>
        </div>
      </div>
    </section>
  );
};

const Index: React.FC = () => {
  // Add a smooth scroll to top effect when page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <FeaturesSection />
      <SellerInfoSection />
      <TestimonialSection />
      <FAQSection />
      <PromoBanner />
    </Layout>
  );
};

export default Index;
