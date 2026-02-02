import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, List, ChevronRight, Search } from 'lucide-react';  
import ProductCard from '../components/ProductCard';
import { fetchCategoriesAction } from '../store/actions/clientActions';
import { fetchProductsAction } from '../store/actions/productActions';

const ShopPage = () => {
  const [viewType, setViewType] = useState('grid');
  const dispatch = useDispatch();
  
  // URL den categoryId al
  const { categoryId } = useParams();
  
  // sort ve filter state'leri
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  
  // reduxtan kategorileri çek
  const categories = useSelector(state => state.client.categories);
  
  // reduxtan ürünleri ve durumu çek
  const products = useSelector(state => state.product.productList);
  const total = useSelector(state => state.product.total);
  const fetchState = useSelector(state => state.product.fetchState);
  
  const isLoading = fetchState === 'FETCHING';
  const isFailed = fetchState === 'FAILED';
  
  //kategorileri sadece bir kere çek
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  
  // categoryId, sort, filter değişince ürünleri çek
  useEffect(() => {
    const params = {
      category: categoryId,
      sort: sort,
      filter: filter,
      limit: 600
    };
    
    // Debug: Hangi parametreler gönderiliyor?
    console.log(' API Request Parameters:', params);
    
    dispatch(fetchProductsAction(params));
  }, [categoryId, sort, filter, dispatch]);
  
  // Rating'e göre sırala ve top 5'i al
  const topCategories = categories
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  
  // Türkçe → İngilizce çeviri
  const categoryTranslations = {
    'Tişört': 'T-Shirt',
    'Ayakkabı': 'Shoes',
    'Ceket': 'Jacket',
    'Elbise': 'Dress',
    'Etek': 'Skirt',
    'Gömlek': 'Shirt',
    'Kazak': 'Sweater',
    'Pantalon': 'Pants'
  };

  const translateCategory = (title) => {
    return categoryTranslations[title] || title;
  };
  
  // Türkçe karakterleri 
  const slugify = (text) => {
    return text
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '');
  };
  
  // Gender dönüşümü (k=kadin, e=erkek)
  const getGenderText = (gender) => {
    return gender === 'k' ? 'kadin' : 'erkek';
  };

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
            {topCategories.map((category) => {
              const genderText = getGenderText(category.gender);
              const categorySlug = slugify(category.title);
              const linkPath = `/shop/${genderText}/${categorySlug}/${category.id}`;
              
              return (
                <Link 
                  key={category.id}
                  to={linkPath}
                  className="relative h-[300px] lg:h-[223px] overflow-hidden cursor-pointer group"
                >
                  {/* API'den gelen görsel */}
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Kategori bilgisi (overlay) */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                    <h3 className="font-bold text-lg">{translateCategory(category.title)}</h3>
                    <p className="text-sm">⭐ {category.rating}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

  {/* filter bar */}
<section className="w-full bg-white py-6">
  <div className="container mx-auto px-8 lg:px-12">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      
      {/* left results count - dinamik */}
      <div className="lg:flex-1 text-center lg:text-left">
        <p className="text-sm text-[#737373] font-bold">
          Showing all {total} results
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

      {/* right filter + sort */}
      <div className="flex items-center justify-center lg:justify-end gap-3 lg:flex-1">
        {/* Filter Input with Search Icon */}
        <div className="relative">
          <Search 
            size={16} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"
          />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search products..."
            className="pl-10 pr-3 py-3 border border-[#DDDDDD] rounded text-sm text-[#737373] focus:outline-none focus:border-[#23A6F0] w-[200px]"
          />
        </div>
        
        {/* Sort Select */}
        <select 
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-3 border border-[#DDDDDD] rounded text-sm text-[#737373] bg-white focus:outline-none focus:border-[#23A6F0]"
        >
          <option value="">Popularity</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="rating:asc">Rating: Low to High</option>
          <option value="rating:desc">Rating: High to Low</option>
        </select>
      </div>

    </div>
  </div>
</section>

      {/* products grid (dinamik) */}
      <section className="w-full bg-white py-12">
        <div className="container mx-auto px-8 lg:px-12">
          
          {/* Loading Spinner */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#23A6F0]"></div>
            </div>
          )}

          {/* Hata Mesajı */}
          {isFailed && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-red-500 text-lg font-bold mb-2">Ürünler yüklenirken hata oluştu!</p>
                <button 
                  onClick={() => dispatch(fetchProductsAction({ limit: 600 }))}
                  className="px-6 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a8ad1]"
                >
                  Tekrar Dene
                </button>
              </div>
            </div>
          )}

          {/*Boş Sonuç Mesajı */}
          {!isLoading && !isFailed && products.length === 0 && (
            <div className="flex flex-col justify-center items-center py-20">
              <p className="text-[#737373] text-lg font-bold mb-2">Ürün bulunamadı</p>
              <p className="text-[#BDBDBD] text-sm mb-4">Arama kriterlerini değiştirmeyi deneyin</p>
              <button 
                onClick={() => {
                  setFilter('');
                  setSort('');
                }}
                className="px-6 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a8ad1]"
              >
                Filtreleri Temizle
              </button>
            </div>
          )}

          {/* Ürün Listesi */}
          {!isLoading && !isFailed && products.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-16">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col">
                  <ProductCard
                    image={product.images?.[0]?.url || '/placeholder.png'}
                    title={product.name}
                    department={product.description || 'Product'}
                    oldPrice={product.price?.toFixed(2) || '0.00'}
                    newPrice={(product.price * 0.7)?.toFixed(2) || '0.00'}
                  />
                  
                  {/* renkli noktalar */}
                  <div className="flex items-center justify-center gap-1 -mt-4">
                    <div className="w-4 h-4 rounded-full bg-[#23A6F0]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#23856D]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#E77C40]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#23856D]"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
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