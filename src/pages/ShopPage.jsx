import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
  const [viewType, setViewType] = useState('grid');

  // category cards data
  const categories = [
    { id: 1, image: '/shopPage/shop-card-1.png' },
    { id: 2, image: '/shopPage/shop-card-2.png' },
    { id: 3, image: '/shopPage/shop-card-3.png' },
    { id: 4, image: '/shopPage/shop-card-4.png' },
    { id: 5, image: '/shopPage/shop-card-5.png' }
  ];

  // products data 
  const products = [
    { id: 1, image: '/shopPage/product-cover-1.png' },
    { id: 2, image: '/shopPage/product-cover-2.png' },
    { id: 3, image: '/shopPage/product-cover-3.png' },
    { id: 4, image: '/shopPage/product-cover-4.png' },
    { id: 5, image: '/shopPage/product-cover-5.png' },
    { id: 6, image: '/shopPage/product-cover-6.png' },
    { id: 7, image: '/shopPage/product-cover-7.png' },
    { id: 8, image: '/shopPage/product-cover-8.png' },
    { id: 9, image: '/shopPage/product-cover-9.png' },
    { id: 10, image: '/shopPage/product-cover-10.png' },
    { id: 11, image: '/shopPage/product-cover-11.png' },
    { id: 12, image: '/shopPage/product-cover-12.png' }
  ];

  return (
    <div className="w-full ">
      
      {/* shop header + category cards */}

      <section className="w-full bg-[#FAFAFA] py-8">
        <div className="container mx-auto px-8 lg:px-12">
          
         
          <div className="flex flex-col items-center gap-y-14 lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            
            <h2 className="text-2xl font-bold text-[#252B42]">
              Shop
            </h2>

            <div className="flex items-center gap-2 text-sm font-bold">
              <Link to="/" className="text-[#252B42] hover:text-[#23A6F0]">
                Home
              </Link>
              <ChevronRight size={16} className="text-[#BDBDBD]" />
              <span className="text-[#737373]">Shop</span>
            </div>
          </div>

          {/* category cards */}
<div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
  {categories.map((category) => (
    <div 
      key={category.id}
      className="relative h-[300px] lg:h-[223px] overflow-hidden cursor-pointer group"
    >
      {/* mobil görsel */}
      <img
        src={`/shopPage/shop-card-${category.id}Mb.png`}
        alt={`Category ${category.id}`}
        className="block lg:hidden w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      {/* desktop görsel */}
      <img
        src={category.image}
        alt={`Category ${category.id}`}
        className="hidden lg:block w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  ))}
</div>
        </div>
      </section>

  {/* filter bar */}
<section className="w-full bg-white py-6">
  <div className="container mx-auto px-8 lg:px-12">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      
      {/* left results count */}
      <div className="lg:flex-1 text-center lg:text-left">
        <p className="text-sm text-[#737373] font-bold">
          Showing all 12 results
        </p>
      </div>

    
      {/* center views */}
<div className="flex items-center justify-center gap-2 lg:flex-1">
  <span className="text-sm text-[#737373] font-bold">
    Views:
  </span>
  <button
    onClick={() => setViewType('grid')}
    className="p-3 py-3 border border-[#ECECEC] rounded"
  >
    <Grid 
      size={16} 
      className="text-[#252B42]"
    />
  </button>
  <button
    onClick={() => setViewType('list')}
    className="p-3 py-3 border border-[#ECECEC] rounded"
  >
    <List 
      size={16} 
      className="text-[#252B42]"
    />
  </button>
</div>

      {/* right popularity + filter */}
      <div className="flex items-center justify-center lg:justify-end gap-3 lg:flex-1">
        <select className="px-1 py-3 border border-[#DDDDDD] rounded text-sm text-[#737373] bg-white focus:outline-none focus:border-[#23A6F0]">
          <option>Popularity</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
        
        <button className="px-5 py-3 bg-[#23A6F0] text-white font-bold text-sm rounded hover:bg-[#1a8ad1] transition-colors">
          Filter
        </button>
      </div>

    </div>
  </div>
</section>

      {/* products grid */}
      <section className="w-full bg-white py-12">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col">
                <ProductCard
                  image={product.image}
                  title="Graphic Design"
                  department="English Department"
                  oldPrice="16.48"
                  newPrice="6.48"
                />
                
          {/* renkli noktalar  */}
                <div className="flex items-center justify-center gap-1 -mt-4">
                  <div className="w-4 h-4 rounded-full bg-[#23A6F0]"></div>
                  <div className="w-4 h-4 rounded-full bg-[#23856D]"></div>
                  <div className="w-4 h-4 rounded-full bg-[#E77C40]"></div>
                  <div className="w-4 h-4 rounded-full bg-[#23856D]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*pagination */}
      <section className="w-full bg-white py-10 ">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="flex justify-center  items-center">
            
            <button className="px-5 py-5 border border-[#BDBDBD] text-[#BDBDBD] bg-[#FAFAFA] font-bold text-sm rounded-l hover:border-[#23A6F0] hover:text-[#23A6F0] transition-colors">
              First
            </button>

            <button className="px-4 py-5 border-t border-b border-[#E9E9E9] text-[#23A6F0] font-bold text-sm hover:bg-[#23A6F0] hover:text-white transition-colors">
              1
            </button>

            <button className="px-4 py-5 bg-[#23A6F0] text-white font-bold text-sm">
              2
            </button>

            <button className="px-4 py-5 border-t border-b border-[#E9E9E9] text-[#23A6F0] font-bold text-sm hover:bg-[#23A6F0] hover:text-white transition-colors">
              3
            </button>

            <button className="px-5 py-5 border border-[#E9E9E9] text-[#23A6F0] font-bold text-sm rounded-r hover:bg-[#23A6F0] hover:text-white transition-colors">
              Next
            </button>
          </div>
        </div>
      </section>

      {/*brand logos */}
      <section className="w-full bg-[#FAFAFA] py-12 border-b border-[#ECECEC]">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 items-center justify-items-center">
            
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

export default ShopPage;