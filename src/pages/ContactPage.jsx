import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Linkedin, Phone, MapPin, Mail } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="w-full font-montserrat">
      
     
{/* 1- hero section */}
<section className="w-full bg-white py-2 lg:py-4 overflow-hidden">
  <div className="container mx-auto px-12 lg:px-12">  
    
    <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-0 min-h-[600px] lg:min-h-[550px]">
      
      {/* Sol text content */}

      <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left order-1 lg:order-1 lg:pl-24">
        
     <h5 className="text-[#252B42] font-bold text-base tracking-wide">
          CONTACT US
        </h5>

        <h1 className="text-[#252B42] font-bold text-5xl lg:text-6xl leading-tight">
          Get in touch<br />today!
        </h1>
        

        <p className="text-[#737373] text-xl leading-relaxed">
          {/* mobil*/}
          <span className="lg:hidden">
            We know how large<br />
            objects will act,but things<br />
            on a small scale just do<br />
            not act that way.
          </span>
          
          {/* Desktop*/}
          <span className="hidden lg:inline">
            We know how large objects will act,<br />
            but things on a small scale
          </span>
        </p>
        
        
        <div className="flex flex-col gap-2 text-[#252B42] font-bold text-base">
          <p>Phone : +451 215 215</p>
          <p>Fax : +451 215 215</p>
        </div>
        
       
        <div className="flex items-center gap-6 justify-center lg:justify-start">
          <Link to="#" className="text-[#252B42] hover:text-[#23A6F0] transition-colors">
            <Twitter size={24} />
          </Link>
          <Link to="#" className="text-[#252B42] hover:text-[#23A6F0] transition-colors">
            <Facebook size={24} />
          </Link>
          <Link to="#" className="text-[#252B42] hover:text-[#23A6F0] transition-colors">
            <Instagram size={24} />
          </Link>
          <Link to="#" className="text-[#252B42] hover:text-[#23A6F0] transition-colors">
            <Linkedin size={24} />
          </Link>
        </div>
        
      </div>
      
      {/* sağ hero image */}
      <div className="w-full lg:w-1/2 flex justify-center items-center order-2 lg:order-2 lg:-mt-16">
        <div className="relative w-full lg:w-[150%]">
          <img 
            src="/contactPage/contact-hero.png" 
            alt="Contact Us" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      
    </div>
    
  </div>
</section>

      
      {/* 2- contact card section */}
<section className="w-full bg-white py-16 lg:py-24">
  <div className="container mx-auto px-12 lg:px-12">
    
    {/* section header */}
    <div className="flex flex-col items-center text-center mb-16 gap-3">
      <h5 className="text-[#252B42] font-bold text-sm tracking-wider">
        VISIT OUR OFFICE
      </h5>
      <h2 className="text-[#252B42] font-bold text-4xl lg:text-5xl leading-tight max-w-2xl">
        We help small businesses<br />with big ideas
      </h2>
    </div>
    
    {/* 3 contact cards */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      
      {/* card 1 - phone*/}
      <div className="flex flex-col items-center text-center gap-4 py-16 px-8 bg-white">
        
        <Phone size={72} className="text-[#23A6F0]" strokeWidth={1.5} />
        
        <div className="flex flex-col gap-1">
          <p className="text-[#252B42] font-bold text-sm">georgia.young@example.com</p>
          <p className="text-[#252B42] font-bold text-sm">georgia.young@ple.com</p>
        </div>
        
        <h3 className="text-[#252B42] font-bold text-base">
          Get Support
        </h3>
        
        <button className="px-8 py-3 border-2 border-[#23A6F0] text-[#23A6F0] rounded-full font-bold text-sm hover:bg-[#23A6F0] hover:text-white transition-all">
          Submit Request
        </button>
        
      </div>
      
      {/* card 2 location dark */}
      <div className="flex flex-col items-center text-center gap-4 py-20 px-8 bg-[#252B42]">
        
        <MapPin size={72} className="text-[#23A6F0]" strokeWidth={1.5} />
        
        <div className="flex flex-col gap-1">
          <p className="text-white font-bold text-sm">georgia.young@example.com</p>
          <p className="text-white font-bold text-sm">georgia.young@ple.com</p>
        </div>
        
        <h3 className="text-white font-bold text-base">
          Get Support
        </h3>
        
        <button className="px-8 py-3 border-2 border-[#23A6F0] text-[#23A6F0] rounded-full font-bold text-sm hover:bg-[#23A6F0] hover:text-white transition-all">
          Submit Request
        </button>
        
      </div>
      
      {/* card 3 mail */}
      <div className="flex flex-col items-center text-center gap-4 py-16 px-8 bg-white">
        
        <Mail size={72} className="text-[#23A6F0]" strokeWidth={1.5} />
        
        <div className="flex flex-col gap-1">
          <p className="text-[#252B42] font-bold text-sm">georgia.young@example.com</p>
          <p className="text-[#252B42] font-bold text-sm">georgia.young@ple.com</p>
        </div>
        
        <h3 className="text-[#252B42] font-bold text-base">
          Get Support
        </h3>
        
        <button className="px-8 py-3 border-2 border-[#23A6F0] text-[#23A6F0] rounded-full font-bold text-sm hover:bg-[#23A6F0] hover:text-white transition-all">
          Submit Request
        </button>
        
      </div>
      
    </div>
    
  </div>
</section>

      {/* 3- lets talk section */}
      <section className="w-full bg-white py-4 pb-16 lg:py-8 -mt-8">
        <div className="container mx-auto pb-8 lg:pb-12 pt-0">
          
          <div className="flex flex-col items-center text-center gap-6">
            
            
            <img 
              src="/contactPage/contact-arrow.png" 
              alt="Arrow" 
              className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
            />
            
           
            <h5 className="text-[#252B42] font-bold text-sm tracking-wider">
              WE Can't WAIT TO MEET YOU
            </h5>
            
            
            <h2 className="text-[#252B42] font-bold text-5xl lg:text-6xl">
              Let's Talk
            </h2>
            
            
            <button className="px-10 py-4 bg-[#23A6F0] text-white font-bold text-sm rounded-md hover:bg-[#1a8ad1] transition-all mt-4">
              Try it free now
            </button>
            
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default ContactPage;