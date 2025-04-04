
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">VisualOasis</h3>
            <p className="text-slate-300 mb-4">
              Your premium shopping destination for quality products and exceptional service.
            </p>
            <div className="flex items-center gap-4">
              <Link to="#" className="text-white hover:text-primary">
                <Instagram size={20} />
              </Link>
              <Link to="#" className="text-white hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="text-white hover:text-primary">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/products" className="hover:text-primary">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-primary">Categories</Link></li>
              <li><Link to="#" className="hover:text-primary">New Arrivals</Link></li>
              <li><Link to="#" className="hover:text-primary">Featured</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="#" className="hover:text-primary">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-primary">FAQ</Link></li>
              <li><Link to="#" className="hover:text-primary">Shipping & Returns</Link></li>
              <li><Link to="/orders" className="hover:text-primary">Order Tracking</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@visualoasis.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} VisualOasis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
