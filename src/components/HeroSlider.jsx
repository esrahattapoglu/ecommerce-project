import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, type: 'gradient' },
    { id: 2, type: 'overlay' }
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full bg-white py-8 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-4">
        
        <div className="relative">
          
  {/*slieds container*/}
          <div className="relative">
            
            {/* slide1 */}
            <div
              className={"transition-all duration-700 " + (
                currentSlide === 0 
                  ? 'opacity-100 relative' 
                  : 'opacity-0 absolute top-0 left-0 w-full pointer-events-none'
              )}
            >
              <div className="bg-gradient-to-r from-[#96E9FB] to-[#ABEFC6] rounded-[20px] overflow-hidden lg:overflow-visible relative">
                <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between min-h-[700px] lg:min-h-[600px] pt-12 pb-0 lg:py-0 px-6 lg:px-16 relative">
                  
                  {/*yazılar mobilde üstte ortalı deskopta solda */}
                  <div className="flex flex-col gap-5 w-full max-w-md text-center lg:text-left z-10 lg:ml-12">
                    
                  
                    <h5 className="text-[#23A6F0] font-bold text-base tracking-wider">
                      SUMMER 2020
                    </h5>
                    
                    
                    <h1 className="text-[#252B42] font-bold text-[40px] leading-[50px] lg:text-5xl lg:leading-tight">
                      NEW<br className="md:hidden" /> COLLECTION
                    </h1>
                    
                   
                    <p className="text-[#737373] text-lg lg:text-xl leading-relaxed max-w-[220px] mx-auto lg:mx-0 lg:max-w-md">
                      We know how large objects will act,<br className="hidden lg:block" /> but things on a small scale.
                    </p>
                    
                
                    <div className="mt-2">
                      <Link 
                    to="/shop" 
                        className="inline-block px-10 py-4 bg-[#23A6F0] text-white font-bold text-md rounded-md hover:bg-[#1a8ad1] transition-all"
                      >
                        SHOP NOW
                      </Link>
                    </div>
                  </div>

                  {/* görsel mobilde küçük ve tam alttan deskopta sağda*/}
                  <div className="relative w-full mt-12 lg:mt-0 lg:absolute lg:bottom-0 lg:right-[-80px] lg:w-auto z-20">
                    <div className="relative w-full h-[392px] lg:w-[700px] lg:h-[600px] flex items-end justify-center">
                      
                      
                      {/* mobil görseli */}
                      <img 
                        src="/homepageMobile.png" 
                        alt="New Collection" 
                        className="block lg:hidden h-full w-auto object-contain object-bottom max-w-none"
                      />
                      
                      {/*deskop görseli*/}
                      <img 
                        src="/homepage2.png" 
                        alt="New Collection" 
                        className="hidden lg:block h-full w-auto object-contain object-bottom max-w-none"
                      />
                      
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/*slide2 */}
            <div
              className={"transition-all duration-700 " + (
                currentSlide === 1 
                  ? 'opacity-100 relative' 
                  : 'opacity-0 absolute top-0 left-0 w-full pointer-events-none'
              )}
            >
              <div className="relative bg-[#868686] rounded-[20px] overflow-hidden">
                
                {/*background image */}
                <div className="relative min-h-[823px] lg:min-h-[600px]">
                  
                  
                {/* deskop */}
                  <div 
                    className="hidden lg:block absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: 'url(/hero-slider.jpg)'
                    }}
                  />
                  
                {/* mobile*/}
                  <div 
                    className="lg:hidden absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: 'url(/hero-slider-mobile.jpg)'
                    }}
                  />

                
                  <div className="relative flex flex-col items-center justify-center text-center h-full min-h-[800px] lg:min-h-[600px] pt-12 pb-0 lg:py-0 px-6 lg:px-16 z-10">
                    
                    
                    
                    <h1 className="text-white font-bold text-[48px] leading-[56px] lg:text-[64px] lg:leading-[72px] mb-8 whitespace-nowrap">
                      BLACK FRIDAY
                    </h1>
                    
                   
                    <p className="text-white text-lg lg:text-xl leading-relaxed max-w-md lg:max-w-2xl mb-10">
                     
                      <span className="lg:hidden">
                        We know how large objects<br />
                        will act, but things on a<br />
                        small scale.
                      </span>
                      
                      
                      <span className="hidden lg:inline">
                        We know how large objects will act, but things on a<br />
                        small scale just do not act that way.
                      </span>
                    </p>
                    
                  
                    <Link 
                      to="/shop" 
                      className="inline-block px-10 py-4 bg-[#23A6F0] text-white font-bold text-xl rounded-md hover:bg-[#1a8ad1] transition-all"
                    >
                      Start Now
                    </Link>
                    
                  </div>
                  
                </div>
              </div>
            </div>

          </div>

          {/*navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all z-30 shadow-xl"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="text-[#252B42]" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all z-30 shadow-xl"
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="text-[#252B42]" />
          </button>

         {/*dots navigation*/}
          <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={"h-1 rounded-full transition-all " + (
                  index === currentSlide 
                    ? 'bg-white w-16' 
                    : 'bg-white/60 w-8 hover:bg-white/90'
                )}
                aria-label={"Go to slide " + (index + 1)}
              />
            ))}
          </div>

        </div>
        
      </div>
    </section>
  );
};

export default HeroSlider;