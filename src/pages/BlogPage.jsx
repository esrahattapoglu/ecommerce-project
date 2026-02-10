import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const BlogPage = () => {
  return (
    <div className="w-full">
      {/*breadcrumb */}
      <section className="w-full bg-[#FAFAFA] py-4 md:py-6">
        <div className="container mx-auto px-2 sm:px-3 md:px-8">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Link to="/" className="text-[#252B42] hover:text-[#23A6F0]">
              Home
            </Link>
            <ChevronRight size={16} className="text-[#BDBDBD]" />
            <span className="text-[#BDBDBD]">Blog</span>
          </div>
        </div>
      </section>

      {/*FEATURED POSTS */}
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

export default BlogPage;