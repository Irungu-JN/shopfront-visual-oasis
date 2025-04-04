
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // This would come from a cart context in a real app
  const cartItemCount = 0;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">VisualOasis</span>
          </Link>
          
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
              <Link to="/products" className="text-sm font-medium hover:text-primary">Shop</Link>
              <Link to="/categories" className="text-sm font-medium hover:text-primary">Categories</Link>
              <Link to="/orders" className="text-sm font-medium hover:text-primary">Orders</Link>
            </nav>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-8 bg-background"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b shadow-lg z-50 fade-in">
          <nav className="flex flex-col p-4 gap-2">
            <Link to="/" className="p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>Home</Link>
            <Link to="/products" className="p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>Shop</Link>
            <Link to="/categories" className="p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>Categories</Link>
            <Link to="/orders" className="p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>Orders</Link>
            <div className="relative w-full mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8 bg-background"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
