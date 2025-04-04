
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/sonner";
import { Check, CreditCard, Landmark } from "lucide-react";

type CheckoutStep = "shipping" | "payment" | "review";

// Demo data for checkout (would come from cart context in a real app)
const subtotal = 1429.98;
const shipping = 5.99;
const tax = subtotal * 0.07;
const total = subtotal + shipping + tax;

const OrderSummary: React.FC = () => (
  <Card>
    <CardContent className="p-6">
      <h3 className="font-bold text-lg mb-4">Order Summary</h3>
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
  </Card>
);

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: ""
  });
  
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: ""
  });
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("payment");
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("review");
  };
  
  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!", {
      description: "Check your email for order confirmation."
    });
    
    // Here you would submit the order to your backend
    // For demo purposes, we'll just redirect to a success page
    setTimeout(() => navigate("/orders/ORD-12348"), 1500);
  };
  
  const renderShippingForm = () => (
    <form onSubmit={handleShippingSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input 
            id="firstName"
            value={shippingInfo.firstName}
            onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input 
            id="lastName"
            value={shippingInfo.lastName}
            onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input 
            id="address"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
          <Input 
            id="apartment"
            value={shippingInfo.apartment}
            onChange={(e) => setShippingInfo({...shippingInfo, apartment: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input 
            id="city"
            value={shippingInfo.city}
            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input 
            id="state"
            value={shippingInfo.state}
            onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input 
            id="zipCode"
            value={shippingInfo.zipCode}
            onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone"
            type="tel"
            value={shippingInfo.phone}
            onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email"
            value={shippingInfo.email}
            onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">Continue to Payment</Button>
    </form>
  );
  
  const renderPaymentForm = () => (
    <form onSubmit={handlePaymentSubmit}>
      <div className="mb-6 space-y-4">
        <div>
          <Label className="text-lg font-medium mb-3">Payment Method</Label>
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={setPaymentMethod}
            className="mt-2 space-y-2"
          >
            <div className="flex items-center space-x-2 border p-3 rounded">
              <RadioGroupItem value="credit-card" id="credit-card" />
              <Label htmlFor="credit-card" className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Credit / Debit Card
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded">
              <RadioGroupItem value="bank-transfer" id="bank-transfer" />
              <Label htmlFor="bank-transfer" className="flex items-center">
                <Landmark className="mr-2 h-5 w-5" />
                Bank Transfer
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {paymentMethod === "credit-card" && (
          <>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardInfo.number}
                onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input 
                id="nameOnCard"
                placeholder="John Doe"
                value={cardInfo.name}
                onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input 
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardInfo.expiry}
                  onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc"
                  placeholder="123"
                  value={cardInfo.cvc}
                  onChange={(e) => setCardInfo({...cardInfo, cvc: e.target.value})}
                  required
                />
              </div>
            </div>
          </>
        )}
        
        {paymentMethod === "bank-transfer" && (
          <div className="p-4 bg-muted rounded-md">
            <p>Please use the following details to complete your bank transfer:</p>
            <p className="mt-2"><strong>Account Name:</strong> VisualOasis Inc.</p>
            <p><strong>Account Number:</strong> 1234567890</p>
            <p><strong>Bank:</strong> Example Bank</p>
            <p><strong>Reference:</strong> Your email address</p>
          </div>
        )}
      </div>
      
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep("shipping")}
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="flex-1"
        >
          Continue to Review
        </Button>
      </div>
    </form>
  );
  
  const renderReviewStep = () => (
    <div>
      <div className="space-y-4 mb-6">
        <div className="bg-muted p-4 rounded-md">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Shipping Information</h3>
            <Button 
              variant="link" 
              className="p-0 h-auto" 
              onClick={() => setCurrentStep("shipping")}
            >
              Edit
            </Button>
          </div>
          <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
          <p>{shippingInfo.address}</p>
          {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
          <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
          <p>{shippingInfo.phone}</p>
          <p>{shippingInfo.email}</p>
        </div>
        
        <div className="bg-muted p-4 rounded-md">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Payment Method</h3>
            <Button 
              variant="link" 
              className="p-0 h-auto" 
              onClick={() => setCurrentStep("payment")}
            >
              Edit
            </Button>
          </div>
          {paymentMethod === "credit-card" ? (
            <div className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              <span>Credit Card ending in {cardInfo.number.slice(-4)}</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Landmark className="mr-2 h-5 w-5" />
              <span>Bank Transfer</span>
            </div>
          )}
        </div>
      </div>
      
      <Button onClick={handlePlaceOrder} className="w-full">
        Place Order
      </Button>
    </div>
  );
  
  const renderStepContent = () => {
    switch (currentStep) {
      case "shipping":
        return renderShippingForm();
      case "payment":
        return renderPaymentForm();
      case "review":
        return renderReviewStep();
    }
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center border ${currentStep === "shipping" ? "bg-primary text-white" : "bg-muted text-foreground"}`}>
                      {currentStep === "shipping" ? "1" : <Check size={16} />}
                    </div>
                    <span>Shipping</span>
                  </div>
                  <div className="h-px bg-border w-full max-w-[60px]" />
                  <div className="flex items-center gap-4">
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center border ${currentStep === "payment" ? "bg-primary text-white" : currentStep === "review" ? "bg-muted text-foreground" : "border"}`}>
                      {currentStep === "payment" ? "2" : currentStep === "review" ? <Check size={16} /> : "2"}
                    </div>
                    <span>Payment</span>
                  </div>
                  <div className="h-px bg-border w-full max-w-[60px]" />
                  <div className="flex items-center gap-4">
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center border ${currentStep === "review" ? "bg-primary text-white" : "border"}`}>
                      3
                    </div>
                    <span>Review</span>
                  </div>
                </div>
                
                {renderStepContent()}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
