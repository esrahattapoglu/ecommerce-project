import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingCart, Heart, Eye } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const images = [
    '/productDetail/main-product.png',
    '/productDetail/thumbnail-1.jpg',
    '/productDetail/thumbnail-2.jpg'
  ];

  const colors = [
    { name: 'blue', class: 'bg-[#23A6F0]' },
    { name: 'green', class: 'bg-[#2DC071]' },
    { name: 'orange', class: 'bg-[#E77C40]' },
    { name: 'black', class: 'bg-[#252B42]' }
  ];

  const bestsellerProducts = [
    { id: 1, image: '/productDetail/bestseller-1.png' },
    { id: 2, image: '/productDetail/bestseller-2.png' },
    { id: 3, image: '/productDetail/bestseller-3.png' },
    { id: 4, image: '/productDetail/bestseller-4.png' },
    { id: 5, image: '/productDetail/bestseller-5.png' },
    { id: 6, image: '/productDetail/bestseller-6.png' },
    { id: 7, image: '/productDetail/bestseller-7.png' },
    { id: 8, image: '/productDetail/bestseller-8.png' }
  ];

  return (
    <div className="w-full">
      
      {/*breadcrumb */}
      <section className="w-full bg-[#FAFAFA] py-6 lg:py-6">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-sm font-bold pb-6 lg:pb-0">
            <Link to="/" className="text-[#252B42] hover:text-[#23A6F0]">
              Home
            </Link>
            <ChevronRight size={16} className="text-[#BDBDBD]" />
            <span className="text-[#BDBDBD]">Shop</span>
          </div>
        </div>
      </section>

      {/*product section */}
      <section className="w-full bg-[#FAFAFA] py-4 lg:py-8">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            
            {/* left product images */}
            <div className="w-full lg:w-1/2">
              
              {/* main image */}
              <div className="relative w-full aspect-[5/3] lg:aspect-[6/5] bg-white mb-4 overflow-hidden">
                <img 
                  src={images[currentImage]}
                  alt="Product" 
                  className="w-full h-full object-cover"
                />
                
                {/* navigation arrows  mobile and desktop */}
                <button 
                  onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                  className="flex lg:hidden absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 hover:opacity-80 transition-opacity items-center justify-center"
                >
                  <img 
                    src="/productDetail/arrow-left.png" 
                    alt="Previous" 
                    className="w-full h-full object-contain"
                  />
                </button>
                
                <button 
                  onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                  className="flex lg:hidden absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 hover:opacity-80 transition-opacity items-center justify-center"
                >
                  <img 
                    src="/productDetail/arrow-right.png" 
                    alt="Next" 
                    className="w-full h-full object-contain"
                  />
                </button>
                
                {/* desktop arrows */}
                <button 
                  onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                  className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 hover:opacity-80 transition-opacity items-center justify-center"
                >
                  <img 
                    src="/productDetail/arrow-left.png" 
                    alt="Previous" 
                    className="w-full h-full object-contain"
                  />
                </button>
                
                <button 
                  onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                  className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 hover:opacity-80 transition-opacity items-center justify-center"
                >
                  <img 
                    src="/productDetail/arrow-right.png" 
                    alt="Next" 
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>

              {/* thumbnails */}
              <div className="flex gap-4 justify-start">
                {images.slice(1, 3).map((img, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentImage(index + 1)}
                    className={"w-32 h-24 border-2 overflow-hidden " + (
                      currentImage === (index + 1) 
                        ? 'border-[#23A6F0]' 
                        : 'border-transparent hover:border-[#BDBDBD]'
                    )}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/*right product info */}
            <div className="w-full lg:w-1/2 flex flex-col gap-3 lg:gap-4">
              
             
              <h1 className="text-[#252B42] font-normal text-xl lg:text-2xl">
                Floating Phone
              </h1>

              {/*rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4].map((star) => (
                    <span key={star} className="text-[#F3CD03] text-xl">★</span>
                  ))}
                  <span className="text-[#BDBDBD] text-xl">★</span>
                </div>
                <span className="text-[#737373] font-bold text-sm">10 Reviews</span>
              </div>

             
              <h2 className="text-[#252B42] font-bold text-2xl">
                $1,139.33
              </h2>

              
              <div className="flex items-center gap-2">
                <span className="text-[#737373] font-bold text-sm">Availability :</span>
                <span className="text-[#23A6F0] font-bold text-sm">In Stock</span>
              </div>

           
              <p className="text-[#858585] text-sm leading-relaxed pb-6 lg:pb-8 pt-4 border-b border-[#BDBDBD] max-w-md">
                <span className="lg:hidden">
                  Met minim Mollie non desert<br />
                  Alamo est sit cliquey dolor do<br />
                  met sent. RELIT official consequent<br />
                  door ENIM RELIT Mollie.Excitation<br />
                  venial consequent sent nostrum met.
                </span>
                <span className="hidden lg:inline">
                  Met minim Mollie non desert Alamo est sit cliquey dolor<br />
                  do met sent. RELIT official consequent door ENIM RELIT Mollie.<br />
                  Excitation venial consequent sent nostrum met.
                </span>
              </p>

              {/*colors */}
              <div className="flex items-center gap-3 pb-7 lg:pt-2 lg:pb-9">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={"w-8 h-8 rounded-full " + color.class}
                  />
                ))}
              </div>

              {/*actions */}
              <div className="flex items-center gap-3 pt-4 pb-16 lg:pt-6">
                <button className="px-5 py-3 bg-[#23A6F0] text-white font-bold text-sm rounded hover:bg-[#1a8ad1] transition-colors">
                  Select Options
                </button>
                
                <button className="w-10 h-10 border border-[#E8E8E8] rounded-full flex items-center justify-center hover:border-[#23A6F0] transition-colors">
                  <Heart size={20} className="text-[#252B42]" />
                </button>
                
                <button className="w-10 h-10 border border-[#E8E8E8] rounded-full flex items-center justify-center hover:border-[#23A6F0] transition-colors">
                  <ShoppingCart size={20} className="text-[#252B42]" />
                </button>
                
                <button className="w-10 h-10 border border-[#E8E8E8] rounded-full flex items-center justify-center hover:border-[#23A6F0] transition-colors">
                  <Eye size={20} className="text-[#252B42]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/*tabs section */}
      <section className="w-full bg-white">
        <div className="container mx-auto px-8 lg:px-12">
          
          {/*tab headers */}
          <div className="flex flex-row items-center justify-center gap-4 lg:gap-8 border-b border-[#ECECEC] py-6">
            <button
              onClick={() => setActiveTab('description')}
              className={"font-semibold text-sm transition-colors " + (
                activeTab === 'description' 
                  ? 'text-[#252B42]' 
                  : 'text-[#737373] hover:text-[#252B42]'
              )}
            >
              Description
            </button>
            
            <button
              onClick={() => setActiveTab('additional')}
              className={"font-semibold text-sm transition-colors whitespace-nowrap " + (
                activeTab === 'additional' 
                  ? 'text-[#252B42]' 
                  : 'text-[#737373] hover:text-[#252B42]'
              )}
            >
              Additional Information
            </button>
            
            <button
              onClick={() => setActiveTab('reviews')}
              className={"font-semibold text-sm transition-colors " + (
                activeTab === 'reviews' 
                  ? 'text-[#252B42]' 
                  : 'text-[#737373] hover:text-[#252B42]'
              )}
            >
              Reviews <span className="text-[#23856D]">(0)</span>
            </button>
          </div>

          {/*tab content */}
          <div className="py-8 lg:py-12">
            {activeTab === 'description' && (
              <>
                {/*mobile layout */}
                <div className="lg:hidden flex flex-col gap-8">
                  
                  {/*image */}
                  <div className="w-full">
                    <img 
                      src="/productDetail/description-image.png"
                      alt="Product Description" 
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  {/*content */}
                  <div className="flex flex-col gap-8">
                    {/*title  3 paragraphs */}
                    <div className="flex flex-col gap-6">
                      <h3 className="text-[#252B42] font-bold text-2xl">
                        the quick fox jumps over
                      </h3>
                      
                      <div className="flex flex-col gap-5 text-[#737373] text-sm leading-relaxed">
                        <p>
                          Met minim Mollie non desert Alamo est sit<br />
                          cliquey dolor do met sent. RELIT official<br />
                          consequent door ENIM RELIT Mollie.<br />
                          Excitation venial consequent sent nostrum<br />
                          met.
                        </p>
                        
                        <p>
                          Met minim Mollie non desert Alamo est sit<br />
                          cliquey dolor do met sent. RELIT official<br />
                          consequent door ENIM RELIT Mollie.<br />
                          Excitation venial consequent sent nostrum<br />
                          met.
                        </p>
                        
                        <p>
                          Met minim Mollie non desert Alamo est sit<br />
                          cliquey dolor do met sent. RELIT official<br />
                          consequent door ENIM RELIT Mollie.<br />
                          Excitation venial consequent sent nostrum<br />
                          met.
                        </p>
                      </div>
                    </div>

                    {/* 2lists */}
                    <div className="grid grid-cols-1 gap-8">
                      <div className="flex flex-col gap-5">
                        <h3 className="text-[#252B42] font-bold text-2xl">
                          the quick fox jumps over
                        </h3>
                        
                        <ul className="flex flex-col gap-3">
                          {[1, 2, 3, 4].map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <ChevronRight size={16} className="text-[#737373] mt-1 flex-shrink-0" />
                              <span className="text-[#737373] text-sm">
                                the quick fox jumps over the lazy dog
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col gap-5">
                        <h3 className="text-[#252B42] font-bold text-2xl">
                          the quick fox jumps over
                        </h3>
                        
                        <ul className="flex flex-col gap-3">
                          {[1, 2, 3].map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <ChevronRight size={16} className="text-[#737373] mt-1 flex-shrink-0" />
                              <span className="text-[#737373] text-sm">
                                the quick fox jumps over the lazy dog
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

           {/* desktop layout - 3 columns */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-8">
                  
                  {/* column 1 image */}
                  <div className="w-full">
                    <img 
                      src="/productDetail/description-image.png"
                      alt="Product Description" 
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  {/* column 2: title + 3 paragraphs */}
                  <div className="flex flex-col gap-6 ml-8">
                    <h3 className="text-[#252B42] font-bold text-2xl">
                      the quick fox jumps over
                    </h3>
                    
                    <div className="flex flex-col gap-5 text-[#737373] text-sm leading-relaxed">
                      <p>
                        Met minim Mollie non desert Alamo est sit<br />
                        cliquey dolor do met sent. RELIT official<br />
                        consequent door ENIM RELIT Mollie.<br />
                        Excitation venial consequent sent nostrum<br />
                        met.
                      </p>
                      
                      <p>
                        Met minim Mollie non desert Alamo est sit<br />
                        cliquey dolor do met sent. RELIT official<br />
                        consequent door ENIM RELIT Mollie.<br />
                        Excitation venial consequent sent nostrum<br />
                        met.
                      </p>
                      
                      <p>
                        Met minim Mollie non desert Alamo est sit<br />
                        cliquey dolor do met sent. RELIT official<br />
                        consequent door ENIM RELIT Mollie.<br />
                        Excitation venial consequent sent nostrum<br />
                        met.
                      </p>
                    </div>
                  </div>

                 {/* column 3 2 Lists */}
                  <div className="flex flex-col gap-8 -ml-8">
                    
                    {/* first list */}
                    <div className="flex flex-col gap-5">
                      <h3 className="text-[#252B42] font-bold text-2xl pb-2">
                        the quick fox jumps over
                      </h3>
                      
                      <ul className="flex flex-col gap-3">
                        {[1, 2, 3, 4].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <ChevronRight size={24} className="text-[#737373] mt-1 flex-shrink-0" />
                            <span className="text-[#737373] text-sm font-semibold">
                              the quick fox jumps over the lazy dog
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                 {/* second list */}
                    <div className="flex flex-col gap-5">
                      <h3 className="text-[#252B42] font-bold text-2xl pb-2">
                        the quick fox jumps over
                      </h3>
                      
                      <ul className="flex flex-col gap-3">
                        {[1, 2, 3].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <ChevronRight size={24} className="text-[#737373] mt-1 flex-shrink-0" />
                            <span className="text-[#737373] text-sm font-semibold">
                              the quick fox jumps over the lazy dog
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </>
            )}

            {activeTab === 'additional' && (
              <div className="text-center text-[#737373]">
                Additional information content here
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center text-[#737373]">
                No reviews yet
              </div>
            )}
          </div>

        </div>
      </section>

      {/* bestseller products */}
      <section className="w-full bg-[#FAFAFA] py-8 lg:py-12">
        <div className="container mx-auto px-8 lg:px-12">
          
          {/* başlık alt çizgi */}
          <div className="mb-8">
            <h2 className="text-[#252B42] font-bold text-2xl mb-6 text-center lg:text-left">
              BESTSELLER PRODUCTS
            </h2>
            <div className="w-full h-[1px] bg-[#ECECEC]"></div>
          </div>

          {/* Ürün gridi her kart beyaz kutu içinde */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {bestsellerProducts.map((product) => (
              <div key={product.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <ProductCard
                  image={product.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* brand logos */}
      <section className="w-full bg-[#FAFAFA] py-12 border-b border-[#ECECEC]">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
            
            <img
              src="/logo1.png"
              alt="Hooli"
              className="h-12 lg:h-10 w-auto object-contain grayscale opacity-90 hover:opacity-50 transition-all"
            />

            <img
              src="/logo2.png"
              alt="Lyft"
              className="h-14 lg:h-12 w-auto object-contain grayscale opacity-90 hover:opacity-50 transition-all"
            />

            <img
              src="/logo3.png"
              alt="Brand 3"
              className="h-14 lg:h-12 w-auto object-contain grayscale opacity-90 hover:opacity-50 transition-all"
            />

            <img
              src="/logo4.png"
              alt="Stripe"
              className="h-14 lg:h-12 w-auto object-contain grayscale opacity-90 hover:opacity-50 transition-all"
            />

            <img
              src="/logo5.png"
              alt="AWS"
              className="h-14 lg:h-12 w-auto object-contain grayscale opacity-90 hover:opacity-50 transition-all"
            />

            <img
              src="/logo6.png"
              alt="Reddit"
              className="h-14 lg:h-12 w-auto object-contain grayscale opacity-90 hover:opacity-50 transition-all"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductDetailPage;