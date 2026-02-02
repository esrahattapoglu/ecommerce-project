import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="w-full">
      
{/* 1- hero section */}
<section className="w-full bg-white py-8 lg:py-16">
  <div className="container mx-auto px-8 lg:px-12">
    
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
      
      {/* Sol text content */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left order-1 lg:order-1 lg:-mt-12 lg:pl-12 px-6 lg:px-0">
        
        {/* about company sadeec desktop*/}
        <h5 className="hidden lg:block text-[#252B42] font-semibold text-base">
          ABOUT COMPANY
        </h5>
        
        <h1 className="text-[#252B42] font-bold text-4xl lg:text-6xl leading-tight">
          ABOUT US
        </h1>
        
        {/* mobil paragraf */}
        <p className="lg:hidden text-[#737373] text-xl leading-relaxed">
          We know how large<br />
          objects will act, but things<br />
          on a small scale just do<br />
          not act that way.
        </p>
        
        {/* desktop paragraf */}
        <p className="hidden lg:block text-[#737373] text-xl leading-relaxed max-w-md">
          We know how large objects will act,<br />
          but things on a small scale
        </p>
        
        <div className="mt-4 mb-28 lg:mb-8">
          <Link 
            to="/contact" 
            className="inline-block px-10 py-4 bg-[#23A6F0] text-white font-bold text-sm rounded-md hover:bg-[#1a8ad1] transition-all"
          >
            Get Quote Now
          </Link>
        </div>
        
      </div>
      
      {/* sağ hero image*/}
      <div className="w-full lg:w-1/2 order-2 lg:order-2 flex items-center justify-center">
        <div className="w-full lg:w-[150%]">
          <img 
            src="/aboutPage/about-hero.png" 
            alt="About Us" 
            className="w-full h-auto object-contain transform lg:scale-125"
          />
        </div>
      </div>
      
    </div>
    
  </div>
</section>

{/* 2- problems trying section */}
<section className="w-full bg-white py-8 lg:py-12">
  <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12">
    
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-4">
      
      {/* Sol kolon */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <p className="text-[#E74040] text-md mb-6">
          Problems trying
        </p>
        
        {/* mobil başlık */}
        <h2 className="lg:hidden text-[#252B42] font-bold text-3xl leading-tight">
          Met minim Mollie non<br />
          desert Alamo est sit<br />
          cliquey dolor do met<br />
          sent.
        </h2>
        
        {/* desktop başlık */}
        <h2 className="hidden lg:block text-[#252B42] font-bold text-3xl leading-tight">
          Met minim Mollie non desert<br />
          Alamo est sit cliquey dolor do<br />
          met sent.
        </h2>
      </div>
      
      {/* Sağ kolon */}
      <div className="w-full lg:w-1/2 lg:pt-10 text-left">
        
        {/* mobil paragraf */}
        <p className="lg:hidden text-[#737373] text-md leading-relaxed ml-10 my-12">
          Problems trying to resolve
          the conflict bet <br /> the two
          major realms of Classical
          physics: <br />Newtonian mechanics
        </p>
        
        {/* desktop paragraf */}
        <p className="hidden lg:block text-[#737373] text-md leading-relaxed">
          Problems trying to resolve the conflict between the two major realms of<br className="hidden lg:block" />
          Classical physics: Newtonian mechanics
        </p>
      </div>
      
    </div>
    
  </div>
</section>

     
      {/* 3- stats section */}
<section className="w-full bg-white py-12 lg:py-24">
  <div className="w-full max-w-[1350px] mx-auto px-8 lg:px-12">
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center">
      
      {/* Stat 1 */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[#252B42] font-bold text-5xl">
          15K
        </h3>
        <p className="text-[#737373] font-bold text-base">
          Happy Customers
        </p>
      </div>
      
      {/* Stat 2 */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[#252B42] font-bold text-5xl">
          150K
        </h3>
        <p className="text-[#737373] font-bold text-base">
          Monthly Visitors
        </p>
      </div>
      
      {/* Stat 3 */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[#252B42] font-bold text-5xl">
          15
        </h3>
        <p className="text-[#737373] font-bold text-base">
          Countries Worldwide
        </p>
      </div>
      
      {/* Stat 4 */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[#252B42] font-bold text-5xl">
          100+
        </h3>
        <p className="text-[#737373] font-bold text-base">
          Top Partners
        </p>
      </div>
      
    </div>
    
  </div>
</section>

{/* 4- video section */}
<section className="w-full bg-white py-8 lg:py-12">
  <div className="w-full max-w-[1200px] mx-auto px-8 lg:px-12">
    
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
      <img 
        src="/aboutPage/about-video.png" 
        alt="Video" 
        className="w-full h-full object-cover"
      />
    </div>
    
  </div>
</section>

{/* 5- meet our team section */}
<section className="w-full bg-white py-12 lg:py-20">
  <div className="w-full max-w-[1200px] mx-auto px-8 lg:px-12">
    
   {/* section title */}
    <div className="flex flex-col items-center text-center mb-16 gap-3">
      
      {/* Mobil  */}
      <h2 className="lg:hidden text-[#252B42] font-bold text-4xl">
        Meet Our<br />Team
      </h2>
      
      {/* Desktop */}
      <h2 className="hidden lg:block text-[#252B42] font-bold text-4xl">
        Meet Our Team
      </h2>
      
      {/* Mobil */}
      <p className="lg:hidden text-[#737373] text-sm max-w-md">
        Problems trying to resolve<br />
        the conflict between the two major<br />
        realms of Classical physics:<br />
        Newtonian mechanics
      </p>
      
      {/* Desktop */}
      <p className="hidden lg:block text-[#737373] text-sm max-w-md">
        Problems trying to resolve the conflict between<br />
        the two major realms of Classical physics: Newtonian mechanics
      </p>
    </div>

    {/* team cards*/}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* team member 1 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-full aspect-square overflow-hidden mb-6">
          <img 
            src="/aboutPage/team-1.png" 
            alt="Team Member" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-[#252B42] font-bold text-base mb-2">
          Username
        </h3>
        <p className="text-[#737373] font-semibold text-sm mb-4">
          Profession
        </p>
        {/* social icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-[#23A6F0] hover:opacity-80">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-[#23A6F0] hover:opacity-80">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-[#23A6F0] hover:opacity-80">
            <Twitter size={24} />
          </a>
        </div>
      </div>

      {/* team member 2 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-full aspect-square overflow-hidden mb-6">
          <img 
            src="/aboutPage/team-2.png" 
            alt="Team Member" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-[#252B42] font-bold text-base mb-2">
          Username
        </h3>
        <p className="text-[#737373] font-semibold text-sm mb-4">
          Profession
        </p>
        {/* social icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-[#23A6F0] hover:opacity-80">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-[#23A6F0] hover:opacity-80">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-[#23A6F0] hover:opacity-80">
            <Twitter size={24} />
          </a>
        </div>
      </div>

      {/* team member 3 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-full aspect-square overflow-hidden mb-6">
          <img 
            src="/aboutPage/team-3.png" 
            alt="Team Member" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-[#252B42] font-bold text-base mb-2">
          Username
        </h3>
        <p className="text-[#737373] font-semibold text-sm mb-4">
          Profession
        </p>
        {/* social icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-[#23A6F0] hover:opacity-80">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-[#23A6F0] hover:opacity-80">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-[#23A6F0] hover:opacity-80">
            <Twitter size={24} />
          </a>
        </div>
      </div>

    </div>
    
  </div>
</section>
      
      {/* 6- brands logos section */}
<section className="w-full bg-[#FAFAFA] py-16 lg:py-20">
  <div className="w-full max-w-[1200px] mx-auto px-8 lg:px-12">
    
    <div className="flex flex-col items-center text-center mb-20 gap-5">
      {/* Mobil  */}
      <h2 className="lg:hidden text-[#252B42] font-bold text-4xl">
        Big<br />Companies<br />Are Here
      </h2>
      
      {/* Desktop  */}
      <h2 className="hidden lg:block text-[#252B42] font-bold text-4xl">
        Big Companies Are Here
      </h2>
      
      {/* Mobil  */}
      <p className="lg:hidden text-[#737373] text-sm max-w-md">
        Problems trying to resolve the conflict<br />
        between the two major realms of Classical<br />
        physics: Newtonian mechanics
      </p>
      
      {/* Desktop */}
      <p className="hidden lg:block text-[#737373] text-sm max-w-md">
        Problems trying to resolve the conflict between<br />
        the two major realms of Classical physics: Newtonian mechanics
      </p>
    </div>

    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 pb-12">
      
      <div className="flex-shrink-0">
        <img
          src="/logo1.png"
          alt="Hooli"
          className="h-12 lg:h-10 w-auto object-contain grayscale opacity-90 hover:opacity-50 transition-all"
        />
      </div>

      <div className="flex-shrink-0">
        <img
          src="/logo2.png"
          alt="Lyft"
          className="h-14 lg:h-12 w-auto object-contain grayscale opacity-90 hover:opacity-50 transition-all"
        />
      </div>

      <div className="flex-shrink-0">
        <img
          src="/logo3.png"
          alt="Brand 3"
          className="h-14 lg:h-12 w-auto object-contain grayscale opacity-90 hover:opacity-50 transition-all"
        />
      </div>

      <div className="flex-shrink-0">
        <img
          src="/logo4.png"
          alt="Stripe"
          className="h-14 lg:h-12 w-auto object-contain grayscale opacity-90 hover:opacity-50 transition-all"
        />
      </div>

      <div className="flex-shrink-0">
        <img
          src="/logo5.png"
          alt="AWS"
          className="h-14 lg:h-12 w-auto object-contain grayscale opacity-90 hover:opacity-50 transition-all"
        />
      </div>

      <div className="flex-shrink-0">
        <img
          src="/logo6.png"
          alt="Reddit"
          className="h-14 lg:h-12 w-auto object-contain grayscale opacity-90 hover:opacity-50 transition-all"
        />
      </div>

    </div>
    
  </div>
</section>

      
      {/* 7- work with us section */}
<section className="w-full bg-white">
  <div className="w-full">
    
    <div className="flex flex-col lg:flex-row">
      
      {/* Sol mavi kutu */}
      <div className="w-full lg:w-[60%] bg-[#2A7CC7] flex items-center justify-center py-20 lg:py-0 lg:min-h-[640px]">
        <div className="flex flex-col gap-6 text-white px-10 lg:px-20 w-full lg:max-w-2xl text-center lg:text-left">
          
          <h5 className="font-bold text-base tracking-wide">
            WORK WITH US
          </h5>
          
          <h2 className="font-bold text-[40px] leading-tight">
            Now Let's<br className="lg:hidden" /> grow Yours
          </h2>
          
          <p className="text-sm leading-relaxed">
            The gradual accumulation of<br className="lg:hidden" /> information about atomic and<br />
            small-scale behavior during the<br className="lg:hidden" /> first quarter of the 20th
          </p>
          
          <div className="mt-2">
            <button className="px-10 py-3 border-2 border-white text-white font-bold text-sm rounded-md hover:bg-white hover:text-[#2A7CC7] transition-all">
              Button
            </button>
          </div>
          
        </div>
      </div>
      
      {/* Sağ  Görsel sadece desktop için */}
      <div className="hidden lg:block lg:w-[40%]">
        <img 
          src="/aboutPage/work-with-us.png" 
          alt="Work With Us" 
          className="w-full h-[640px] object-cover"
        />
      </div>
      
    </div>
    
  </div>
</section>

    </div>
  );
};

export default AboutPage;