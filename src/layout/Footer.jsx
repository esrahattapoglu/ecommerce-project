import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';


const Footer = () => {


  return (
    <footer className="w-full">
      {/* bandage- social */}
      <div className="bg-[#FAFAFA] border-b">
        <div className="container mx-auto px-10 lg:px-12 py-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
         <h2 className="text-2xl font-bold text-[#252B42]">
              Bandage
            </h2>
            
    
       <div className="flex items-center gap-5">
              <Facebook 
                className="text-[#23A6F0] cursor-pointer hover:opacity-80" 
                size={24} 

              />
              <Instagram 
                className="text-[#23A6F0] cursor-pointer hover:opacity-80" 
                size={24} 
              />
              <Twitter 
                className="text-[#23A6F0] cursor-pointer hover:opacity-80" 
                size={24} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* main footer 5 columns */}
      <div className="bg-white">
        <div className="container mx-auto px-10 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* column 1 */}
            <div className="flex flex-col gap-5">
              <h3 className="text-[#252B42] font-bold text-base">
                Company Info
              </h3>
              <nav className="flex flex-col gap-3">
                <Link to="/about" className="text-[#737373] text-sm hover:text-[#23856D]">
                  About Us
                </Link>
                <Link to="/carrier" className="text-[#737373] text-sm hover:text-[#23856D]">
                  Carrier
                </Link>
                <Link to="/hiring" className="text-[#737373] text-sm hover:text-[#23856D]">
                  We are hiring
                </Link>
                <Link to="/blog" className="text-[#737373] text-sm hover:text-[#23856D]">
                  Blog
                </Link>
              </nav>
            </div>

            {/* column 2*/}
            <div className="flex flex-col gap-5">
              <h3 className="text-[#252B42] font-bold text-base">
                Legal
              </h3>
              <nav className="flex flex-col gap-3">
                <Link to="/about" className="text-[#737373] text-sm hover:text-[#23856D]">
                  About Us
                </Link>
                <Link to="/carrier" className="text-[#737373] text-sm hover:text-[#23856D]">
                  Carrier
                </Link>
                <Link to="/hiring" className="text-[#737373] text-sm hover:text-[#23856D]">
                  We are hiring
                </Link>
                <Link to="/blog" className="text-[#737373] text-sm hover:text-[#23856D]">
                  Blog
                </Link>
              </nav>
            </div>

            {/* Column 3*/}
            <div className="flex flex-col gap-5">
              <h3 className="text-[#252B42] font-bold text-base">
                Features
              </h3>
              <nav className="flex flex-col gap-3">
                <Link to="/business-marketing" className="text-[#737373] text-sm hover:text-[#23856D]">
                  Business Marketing
                </Link>
                <Link to="/user-analytic" className="text-[#737373] text-sm hover:text-[#23856D]">
                  User Analytic
                </Link>
                <Link to="/live-chat" className="text-[#737373] text-sm hover:text-[#23856D]">
                  Live Chat
                </Link>
                <Link to="/support" className="text-[#737373] text-sm hover:text-[#23856D]">
                  Unlimited Support
                </Link>
              </nav>
            </div>

            {/* column 4*/}
            <div className="flex flex-col gap-5">
              <h3 className="text-[#252B42] font-bold text-base">
                Resources
              </h3>
              <nav className="flex flex-col gap-3">
                <Link to="/ios-android" className="text-[#737373] text-sm hover:text-[#23856D]">
                  IOS & Android
                </Link>
                <Link to="/demo" className="text-[#737373] text-sm hover:text-[#23856D]">
                  Watch a Demo
                </Link>
                <Link to="/customers" className="text-[#737373] text-sm hover:text-[#23856D]">
                  Customers
                </Link>
                <Link to="/api" className="text-[#737373] text-sm hover:text-[#23856D]">
                  API
                </Link>
              </nav>
            </div>

            {/*column 5*/}
            <div className="flex flex-col gap-5">
              <h3 className="text-[#252B42] font-bold text-base">
                Get In Touch
              </h3>
              <div className="flex flex-col gap-4">
               
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your Email"
                    className="flex-1 px-4 py-3 border border-[#E6E6E6] rounded-l-md text-sm focus:outline-none focus:border-[#23A6F0]"
                  />
                  <button className="px-6 py-3 bg-[#23A6F0] text-white rounded-r-md hover:bg-[#1a8ad1] transition-colors text-sm font-medium">
                    Subscribe
                  </button>
                </div>
                <p className="text-[#737373] text-xs">
                  Lore imp sum dolor Amit
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* bottom*/}
      <div className="bg-[#FAFAFA]">
        <div className="container mx-auto px-10 lg:px-12 py-6">
          <p className="text-[#737373] text-sm text-center md:text-left">
            Made With Love By<br className="md:hidden" /> Finland All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;