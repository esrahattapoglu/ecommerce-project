import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';


const HomePage = () => {
  return (
    <div className="w-full ">


      {/* 1- hero section*/}
      <HeroSlider />



      {/* 2- brand logos section*/}
      <section className="w-full bg-white pt-4 pb-8 lg:pt-6 lg:pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            

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




      {/* 3- three card*/}
      <section className="w-full bg-white py-12 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:grid-rows-2">

            {/*sol kart */}
            <div className="relative aspect-[4/5] lg:aspect-square lg:row-span-2 overflow-hidden">

              
              <img
                src="/grid1Mobile.jpg"
                alt="Men Category"
                className="w-full h-full object-fill lg:hidden"
              />

            
              <img
                src="/grid1.png"
                alt="Men Category"
                className="hidden lg:block w-full h-full object-fill"
              />

              {/* mavi kutu*/}
              <div className="absolute bottom-0 left-0 bg-[#2196F3] bg-opacity-70 
          px-10 py-12 w-full
          lg:px-14 lg:py-16 lg:w-[550px]">

                <h3 className="text-white font-bold text-2xl lg:text-3xl mb-6 leading-tight">
                  <span className="block lg:inline">Top Product Of</span>
                  <span className="block lg:inline"> the Week</span>
                </h3>

                <button className="px-10 py-3 lg:px-12 lg:py-4 border-2 border-white text-white font-bold text-base hover:bg-white hover:text-[#2196F3] transition-all">
                  EXPLORE ITEMS
                </button>
              </div>
            </div>

            {/* sağ üst kart*/}
            <div className="relative h-[360px] lg:h-[330px] overflow-hidden">

              
              <img
                src="/grid2Mobile.jpg"
                alt="Women Category"
                className="w-full h-full object-fill lg:hidden"
              />

              <img
                src="/grid2.jpg"
                alt="Women Category"
                className="hidden lg:block w-full h-full object-fill"
              />

              <div className="absolute bottom-0 left-0 bg-[#2196F3] bg-opacity-70 
          px-8 py-12 w-full
          lg:px-12 lg:py-10 lg:w-[450px]">

                <h3 className="text-white font-bold text-xl lg:text-2xl mb-5 leading-tight">
                  <span className="block lg:inline">Top Product Of</span>
                  <span className="block lg:inline"> the Week</span>
                </h3>

                <button className="px-8 py-2 lg:px-10 lg:py-3 border-2 border-white text-white text-base font-bold hover:bg-white hover:text-[#2196F3] transition-all">
                  EXPLORE ITEMS
                </button>
              </div>
            </div>

            {/*sağ alt kart */}
            <div className="relative h-[360px] lg:h-[330px] overflow-hidden">

              <img
                src="/grid3Mobile.png"
                alt="Accessories Category"
                className="w-full h-full object-fill lg:hidden"
              />

              
              <img
                src="/grid3.jpg"
                alt="Accessories Category"
                className="hidden lg:block w-full h-full object-fill"
              />

              <div className="absolute bottom-0 left-0 bg-[#2196F3] bg-opacity-70 
          px-8 py-12 w-full
          lg:px-12 lg:py-10 lg:w-[450px]">

                <h3 className="text-white font-bold text-xl lg:text-2xl mb-5 leading-tight">
                  <span className="block lg:inline">Top Product Of</span>
                  <span className="block lg:inline"> the Week</span>
                </h3>

                <button className="px-8 py-2 lg:px-10 lg:py-3 border-2 border-white text-white text-base font-bold hover:bg-white hover:text-[#2196F3] transition-all">
                  EXPLORE ITEMS
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>






      {/* 4- BESTSELLER PRODUCTS */}
      <section className="w-full bg-white py-12 lg:py-20">
        <div className="container mx-auto px-10 lg:px-12">

        
          <div className="flex flex-col items-center text-center mb-12 lg:mb-16 gap-3">
            <h4 className="hidden lg:block text-[#737373] text-xl">
              Featured Products
            </h4>
            <h2 className="text-[#252B42] font-bold text-2xl lg:text-3xl">
              BESTSELLER<br className="lg:hidden" /> PRODUCTS
            </h2>
            <p className="text-[#737373] text-sm max-w-md">
              Problems trying to resolve the<br className="lg:hidden" /> conflict between
            </p>
          </div>

          {/* ürün kartları*/}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 mb-12">

            {/*Ürün 1*/}
            <ProductCard image="/product-1.png" />

            {/*Ürün 2*/}
            <ProductCard image="/product-2.png" />

            {/* 
           Ürün 3*/}
            <ProductCard image="/product-3.png" />

            {/*Ürün 4*/}
            <ProductCard image="/product-4.png" />

            {/*Ürün 5*/}
            <ProductCard image="/product-5.png" />

            {/*Ürün 6*/}
            <ProductCard image="/product-6.png" />

            {/*Ürün 7*/}
            <ProductCard image="/product-7.png" />

            {/*Ürün 8*/}
            <ProductCard image="/product-8.png" />

            {/*Ürün 9*/}
            <ProductCard image="/product-9.png" />

            {/*Ürün 10*/}
            <ProductCard image="/product-10.png" />
          </div>

          

          <div className="flex justify-center">
            <button className="px-10 py-3 border-2 border-[#23A6F0] text-[#23A6F0] font-bold text-sm rounded-md hover:bg-[#23A6F0] hover:text-white transition-all">
              LOAD MORE PRODUCTS
            </button>
          </div>
        </div>
      </section>






      {/*5- WE LOVE WHAT WE DO */}
      
<section className="w-full bg-white py-12 pt-24 lg:py-20">
  <div className="container mx-auto px-4 lg:px-12">

    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

      
      <div className="w-full lg:w-1/2 flex flex-col gap-6 text-left pl-12 lg:pl-0 order-1 lg:order-2">

        <h5 className="text-[#23A6F0] font-bold text-base">
          Featured Products
        </h5>

        <h2 className="text-[#252B42] font-bold text-5xl lg:text-5xl leading-tight">
          We love<br className="lg:hidden" /> what we do
        </h2>

       
        {/*mobil paragraf 1*/}
        <p className="lg:hidden text-[#737373] text-base leading-relaxed">
          Problems trying to resolve the <br />
          conflict between the two major <br />
          realms of Classical physics: <br />
          Newtonian mechanics.
        </p>

        {/*desktop p1*/}
        <p className="hidden lg:block text-[#737373] text-base leading-relaxed">
          Problems trying to resolve the conflict between<br />
          the two major realms of Classical physics:<br />
          Newtonian mechanics.
        </p>

        {/* mobil paragraf 2*/}
        <p className="lg:hidden text-[#737373] text-base leading-relaxed">
          Problems trying to resolve the <br />
          conflict between the two major <br />
          realms of Classical physics: <br />
          Newtonian mechanics
        </p>

        {/* desktop p2 */}
        <p className="hidden lg:block text-[#737373] text-base leading-relaxed">
          Problems trying to resolve the conflict between<br />
          the two major realms of Classical physics:<br />
          Newtonian mechanics
        </p>

      </div>

      {/*2 görsel*/}
      <div className="w-full lg:w-1/2 flex gap-4 order-2 lg:order-1">

        {/*1.görsel */}
        <div className="w-[45%]">
          <img
            src="/team-1.png"
            alt="Team Member 1"
            className="w-full h-[550px] lg:h-[600px] object-cover"
          />
        </div>

        {/*2.görsel */}
        <div className="w-[60%]">
          <img
            src="/team-2.png"
            alt="Team Member 2"
            className="w-full h-[550px] lg:h-[600px] object-cover"
          />
        </div>

      </div>

    </div>

  </div>
</section>






      {/* 6-THE BEST SERVICES */}
      <section className="w-full bg-white py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-12">

          <div className="flex flex-col items-center text-center mb-24 gap-3">
            <h4 className="text-[#737373] text-xl">
              Featured Products
            </h4>
            <h2 className="text-[#252B42] font-bold text-xl lg:text-2xl">
              THE BEST SERVICES
            </h2>
            <p className="text-[#737373] text-sm max-w-md">
              Problems trying to resolve<br className="lg:hidden" /> the conflict between
            </p>
          </div>

          {/* 3 servis kartı */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

            {/*servis 1 */}
            <div className="flex flex-col items-center text-center gap-5 px-6">

              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src="/service-1.svg"
                  alt="Easy Wins"
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-[#252B42] font-bold text-xl">
                Easy Wins
              </h3>

        
              <p className="text-[#737373] text-sm leading-relaxed">
                Get your best looking smile <br /> now!
              </p>

            </div>

            {/*servis 2*/}
            <div className="flex flex-col items-center text-center gap-5 px-6">

           
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src="/service-2.png"
                  alt="Concrete"
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-[#252B42] font-bold text-xl">
                Concrete
              </h3>

           
              <p className="text-[#737373] text-sm leading-relaxed">
                Defalcate is most focused in <br /> helping you discover your most <br />beautiful smile
              </p>

            </div>

            {/*servis 3*/}
            <div className="flex flex-col items-center text-center gap-5 px-6">

              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src="/service-3.png"
                  alt="Hack Growth"
                  className="w-full h-full object-contain"
                />
              </div>

         
              <h3 className="text-[#252B42] font-bold text-xl">
                Hack Growth
              </h3>

             
              <p className="text-[#737373] text-sm leading-relaxed">
                Overcame any hurdle or any <br /> other problem.
              </p>

            </div>

          </div>

        </div>
      </section>







      {/* 7- FEATURED POSTS  */}
      <section className="w-full bg-white py-12 pt-24 lg:py-20">
        <div className="container mx-auto px-12 lg:px-12">

          <div className="flex flex-col items-center text-center mb-12 gap-3">
            <h4 className="text-[#23A6F0] text-sm font-bold">
              Practice Advice
            </h4>
            <h2 className="text-[#252B42] font-bold text-5xl pb-6 lg:text-4xl">
              Featured Posts
            </h2>
          </div>

          {/*2 blok kartı*/}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

            {/* post1*/}
            <div className="flex flex-col lg:flex-row bg-white shadow-sm border lg:shadow-none lg:border-0 overflow-hidden">

              {/* görsel alanı */}
              <div className="relative lg:w-2/5 flex-shrink-0">
                {/*mobil görsel */}
                <img
                  src="/post-1Mobile.png"
                  alt="Featured Post 1"
                  className="block lg:hidden w-full aspect-[4/3] object-cover"
                />

                {/*deskop görsel*/}
                <img
                  src="/post-1.png"
                  alt="Featured Post 1"
                  className="hidden lg:block w-full h-full object-cover"
                />

                
                <div className="absolute top-5 left-5 bg-[#E74040] text-white px-3 py-1 text-xs font-bold">
                  <span className="lg:hidden">NEW</span>
                  <span className="hidden lg:inline">Sale</span>
                </div>

                {/* Action Buttons (deskop)*/}
                <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 gap-2">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <img src="/icon-like.png" alt="Like" className="w-10 h-10" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <img src="/icon-basket.png" alt="Cart" className="w-10 h-10" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <img src="/icon-eye.png" alt="View" className="w-10 h-10" />
                  </button>
                </div>
              </div>

              {/*içerik alanı*/}
              <div className="flex flex-col gap-4 p-6 lg:w-3/5">

                {/*mobil içerik*/}
                <div className="lg:hidden flex flex-col gap-3">

                 
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#23A6F0] hover:text-[#1a8ad1] cursor-pointer">Google</span>

                    <span className="text-[#737373] hover:text-[#252B42] cursor-pointer">Trending</span>

                    <span className="text-[#737373] hover:text-[#252B42] cursor-pointer">New</span>
                  </div>

                  
                  <h3 className="text-[#252B42] font-normal text-2xl leading-tight">
                    Loudest à la Madison #1<br />(L'integral)
                  </h3>

                  
                  <p className="text-[#737373] text-sm leading-relaxed">
                    We focus on ergonomics and meeting <br /> you where you work. It's only a <br />keystroke away.
                  </p>

                  
                  <div className="flex items-center gap-10 text-xs text-[#737373]">
                    <div className="flex items-center gap-1">
                      <img src="/icon-clock.png" alt="Date" className="w-4 h-4" />
                      <span>22 April 2021</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <img src="/icon-chart.png" alt="Comments" className="w-4 h-4" />
                      <span>10 comments</span>
                    </div>
                  </div>

                  
                  <button className="flex items-center gap-2 text-[#252B42] font-bold text-sm hover:gap-3 transition-all mt-2">
                    <span>Learn More</span>
                    <img src="/icon-arrow.png" alt="Arrow" />
                  </button>

                </div>

                {/*deskop içerik*/}
                <div className="hidden lg:flex lg:flex-col lg:gap-4">

                  <div className="flex items-center justify-between">
                    <Link to="#" className="text-[#23A6F0] text-sm font-bold hover:underline">
                      English Department
                    </Link>
                    <div className="flex items-center gap-1 bg-[#252B42] text-white px-2 py-1 rounded-full">
                      <img src="/icon-star.png" alt="Rating" className="w-3 h-3" />
                      <span className="text-xs font-bold">4.9</span>
                    </div>
                  </div>

                 
                  <h3 className="text-[#252B42] font-bold text-base">
                    Graphic Design
                  </h3>

                  
                  <p className="text-[#737373] text-sm leading-relaxed">
                    We focus on ergonomics and<br />
                    meeting you where you work. It's<br />
                    only a keystroke away.
                  </p>

                  
                  <div className="flex items-center gap-2 text-sm text-[#737373]">
                    <img src="/icon-sales.png" alt="Sales" className="w-4 h-4" />
                    <span>15 Sales</span>
                  </div>

                 
                  <div className="flex items-center gap-2">
                    <span className="text-[#BDBDBD] font-bold text-base line-through">
                      $16.48
                    </span>
                    <span className="text-[#23856D] font-bold text-base">
                      $6.48
                    </span>
                  </div>

                  {/*renkler*/}
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-[#23A6F0]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#23856D]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#E77C40]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#252B42]"></div>
                  </div>

                  {/* alt bilgiler */}
                  <div className="flex items-center gap-4 text-xs text-[#737373]">
                    <div className="flex items-center gap-1">
                      <img src="/icon-clock.png" alt="Duration" className="w-4 h-4" />
                      <span>22h...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src="/icon-book.png" alt="Lessons" className="w-4 h-4" />
                      <span>64 Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src="/icon-chart.png" alt="Progress" className="w-4 h-4" />
                      <span>Progress</span>
                    </div>
                  </div>

                  
                  <button className="flex items-center gap-2 text-[#23A6F0] font-bold text-sm mt-2 hover:gap-3 transition-all border border-[#23A6F0] rounded-full px-5 py-2 w-fit">
                    <span>Learn More</span>
                    <img src="/icon-arrow.png" alt="Arrow" />
                  </button>

                </div>

              </div>

            </div>

            {/* post 2*/}
            <div className="flex flex-col lg:flex-row bg-white shadow-sm border lg:shadow-none lg:border-0 overflow-hidden">

              {/*görsel alanı*/}
              <div className="relative lg:w-2/5 flex-shrink-0">
                {/*mobil görsel */}
                <img
                  src="/post-2Mobile.png"
                  alt="Featured Post 2"
                  className="block lg:hidden w-full aspect-[4/3] object-cover"
                />

                {/*deskop görseli*/}
                <img
                  src="/post-2.png"
                  alt="Featured Post 2"
                  className="hidden lg:block w-full h-full object-cover"
                />

                
                <div className="absolute top-5 left-5 bg-[#E74040] text-white px-3 py-1 text-xs font-bold">
                  <span className="lg:hidden">NEW</span>
                  <span className="hidden lg:inline">Sale</span>
                </div>

                {/* Action Buttons (deskop)*/}
                <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 gap-2">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <img src="/icon-like.png" alt="Like" className="w-10 h-10" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <img src="/icon-basket.png" alt="Cart" className="w-10 h-10" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <img src="/icon-eye.png" alt="View" className="w-10 h-10" />
                  </button>
                </div>
              </div>

              {/*içerik slanı*/}
              <div className="flex flex-col gap-4 p-6 lg:w-3/5">

                {/*mobil içerik*/}
                <div className="lg:hidden flex flex-col gap-3">

                 
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#23A6F0] hover:text-[#1a8ad1] cursor-pointer">Google</span>

                    <span className="text-[#737373] hover:text-[#252B42] cursor-pointer">Trending</span>

                    <span className="text-[#737373] hover:text-[#252B42] cursor-pointer">New</span>
                  </div>

                  
                  <h3 className="text-[#252B42] font-normal text-2xl leading-tight">
                    Loudest à la Madison #1<br />(L'integral)
                  </h3>

               
                  <p className="text-[#737373] text-sm leading-relaxed">
                    We focus on ergonomics and meeting <br />you where you work. It's only a <br />keystroke away.
                  </p>

                 
                  <div className="flex items-center gap-10 text-xs text-[#737373]">
                    <div className="flex items-center gap-1">
                      <img src="/icon-clock.png" alt="Date" className="w-4 h-4" />
                      <span>22 April 2021</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <img src="/icon-chart.png" alt="Comments" className="w-4 h-4" />
                      <span>10 comments</span>
                    </div>
                  </div>

               
                  <button className="flex items-center gap-2 text-[#252B42] font-bold text-sm hover:gap-3 transition-all mt-2">
                    <span>Learn More</span>
                    <img src="/icon-arrow.png" alt="Arrow" />
                  </button>

                </div>

                {/*desktop içerik */}
                <div className="hidden lg:flex lg:flex-col lg:gap-4">

                
                  <div className="flex items-center justify-between">
                    <Link to="#" className="text-[#23A6F0] text-sm font-bold hover:underline">
                      English Department
                    </Link>
                    <div className="flex items-center gap-1 bg-[#252B42] text-white px-2 py-1 rounded-full">
                      <img src="/icon-star.png" alt="Rating" className="w-3 h-3" />
                      <span className="text-xs font-bold">4.9</span>
                    </div>
                  </div>

       
                  <h3 className="text-[#252B42] font-bold text-base">
                    Graphic Design
                  </h3>

                 
                  <p className="text-[#737373] text-sm leading-relaxed">
                    We focus on ergonomics and<br />
                    meeting you where you work. It's<br />
                    only a keystroke away.
                  </p>

               
                  <div className="flex items-center gap-2 text-sm text-[#737373]">
                    <img src="/icon-sales.png" alt="Sales" className="w-4 h-4" />
                    <span>15 Sales</span>
                  </div>

                 
                  <div className="flex items-center gap-2">
                    <span className="text-[#BDBDBD] font-bold text-base line-through">
                      $16.48
                    </span>
                    <span className="text-[#23856D] font-bold text-base">
                      $6.48
                    </span>
                  </div>

                  {/*renkler*/}
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-[#23A6F0]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#23856D]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#E77C40]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#252B42]"></div>
                  </div>

                
                  <div className="flex items-center gap-4 text-xs text-[#737373]">
                    <div className="flex items-center gap-1">
                      <img src="/icon-clock.png" alt="Duration" className="w-4 h-4" />
                      <span>22h...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src="/icon-book.png" alt="Lessons" className="w-4 h-4" />
                      <span>64 Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src="/icon-chart.png" alt="Progress" className="w-4 h-4" />
                      <span>Progress</span>
                    </div>
                  </div>

            
                  <button className="flex items-center gap-2 text-[#23A6F0] font-bold text-sm mt-2 hover:gap-3 transition-all border border-[#23A6F0] rounded-full px-5 py-2 w-fit">
                    <span>Learn More</span>
                    <img src="/icon-arrow.png" alt="Arrow" />
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>






    </div>
  );
};

export default HomePage;