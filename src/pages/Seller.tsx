
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/toast";
import { Check, Store, TrendingUp, Gift, Clock } from "lucide-react";

const Seller: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    website: "",
    productDescription: "",
    categories: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully!", {
      description: "We'll review your application and get back to you shortly."
    });
    // In a real app, you would submit this to your backend
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">Become a Seller</h1>
              <p className="text-xl text-muted-foreground">
                Join our marketplace and start selling your products to thousands of customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Store className="mr-2" /> Apply to Sell on VisualOasis
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input 
                        id="businessName" 
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input 
                        id="website" 
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="categories">Product Categories</Label>
                      <Input 
                        id="categories" 
                        name="categories"
                        placeholder="e.g., Electronics, Clothing, Home"
                        value={formData.categories}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="productDescription">Product Description</Label>
                      <Textarea 
                        id="productDescription" 
                        name="productDescription"
                        placeholder="Tell us about the products you want to sell..."
                        value={formData.productDescription}
                        onChange={handleChange}
                        rows={5}
                        required 
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" size="lg">Submit Application</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="mt-12 bg-primary/5 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">What happens next?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 bg-primary/20 rounded-full p-1">
                    <Check size={16} className="text-primary" />
                  </div>
                  <p>Our team will review your application within 2-3 business days</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 bg-primary/20 rounded-full p-1">
                    <Check size={16} className="text-primary" />
                  </div>
                  <p>You'll receive an email with login credentials to our seller portal</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 bg-primary/20 rounded-full p-1">
                    <Check size={16} className="text-primary" />
                  </div>
                  <p>Set up your store profile, add products, and start selling!</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Seller;
