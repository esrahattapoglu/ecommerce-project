import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, Instagram, Youtube, Facebook, Twitter,
  ShoppingCart, Heart, Search, Menu, ChevronDown, User
} from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full">
     
      <div className="hidden md:flex bg-[#252B42] text-white">
        <div className="w-full px-8">
          <div className="flex justify-between items-center h-[58px] text-sm">
            
           
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>(225) 555-0118</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>michelle.rivera@example.com</span>
              </div>
            </div>

            
            <div className="font-bold">
              Follow Us and get a chance to win 80% off
            </div>

            
            <div className="flex items-center gap-3">
              <span>Follow Us :</span>
              <div className="flex items-center gap-2">
                <Instagram size={16} className="cursor-pointer hover:opacity-80" />
                <Youtube size={16} className="cursor-pointer hover:opacity-80" />
                <Facebook size={16} className="cursor-pointer hover:opacity-80" />
                <Twitter size={16} className="cursor-pointer hover:opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <nav className="bg-white">
        <div className="w-full px-8">
         
          <div className="flex items-center justify-between h-[70px]">
            
            
            <Link to="/" className="text-2xl font-bold text-[#252B42]">
              Bandage
            </Link>

        
        <div className="hidden md:flex items-center gap-4 mr-auto ml-32">
              <Link to="/" className="text-[#737373] hover:text-[#23856D] font-medium text-sm">
                Home
              </Link>
              
              
              <Link  to="/shop" className="flex items-center gap-1 text-[#737373] hover:text-[#23856D] font-medium text-sm">
              Shop
              <ChevronDown size={14} />
              
              </Link>
              
              <Link to="/about" className="text-[#737373] hover:text-[#23856D] font-medium text-sm">
                About
              </Link>
              <Link to="/blog" className="text-[#737373] hover:text-[#23856D] font-medium text-sm">
                Blog
              </Link>
              <Link to="/contact" className="text-[#737373] hover:text-[#23856D] font-medium text-sm">
                Contact
              </Link>
              <Link to="/pages" className="text-[#737373] hover:text-[#23856D] font-medium text-sm">
                Pages
              </Link>
            </div>

           
            <div className="flex items-center gap-3">
              
              <Link 
                to="/login" 
                className="hidden md:flex items-center gap-1 text-[#23A6F0] font-medium hover:opacity-80 text-sm"
              >
                <User size={12} />
                <span>Login / Register</span>
              </Link>

             
              <button className="text-[#737373] md:text-[#23A6F0] hover:opacity-80">
                <Search size={18} />
              </button>

             
              <Link to="/cart" className="flex items-center gap-1 text-[#737373] md:text-[#23A6F0] hover:opacity-80">
                <ShoppingCart size={18} />
                <span className="text-xs">1</span>
              </Link>

             
              <Link to="/wishlist" className="hidden md:flex items-center gap-1 text-[#23A6F0] hover:opacity-80">
                <Heart size={18} />
                <span className="text-xs">1</span>
              </Link>

      
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-[#737373]"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

        
       {isMobileMenuOpen && (
            <div className="md:hidden pb-6 pt-2">
              <div className="flex flex-col gap-5 text-center">
                <Link 
                  to="/" 
                  className="text-[#737373] hover:text-[#23856D] font-medium text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
             </Link>
                <Link 
                  to="/shop" 
                  className="text-[#737373] hover:text-[#23856D] font-medium text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link 
                  to="/about" 
                  className="text-[#737373] hover:text-[#23856D] font-medium text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/blog" 
                  className="text-[#737373] hover:text-[#23856D] font-medium text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  to="/contact" 
                  className="text-[#737373] hover:text-[#23856D] font-medium text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  to="/pages" 
                  className="text-[#737373] hover:text-[#23856D] font-medium text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pages
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;