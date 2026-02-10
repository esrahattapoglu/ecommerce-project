import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, List, ChevronRight, Search } from 'lucide-react';  
import ProductCard from '../components/ProductCard';
import { fetchCategoriesAction } from '../store/actions/clientActions';
import { fetchProductsAction } from '../store/actions/productActions';

const ShopPage = () => {
  //Mobilde default "list", Desktop'ta "grid"
  const [viewType, setViewType] = useState(() => {
    return window.innerWidth < 1024 ? 'list' : 'grid';
  });
  
  const dispatch = useDispatch();
  
  //URL den categoryId al
  const { categoryId } = useParams();
  
  // sort ve filter state'leri
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  
  //pagination state'leri
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  
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
  
  //categoryId, sort, filter, page değişince ürünleri çek
  useEffect(() => {
    // Sayfa değişince yukarı scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    //offset hesapla
    const offset = (page - 1) * limit;
    
    const params = {
      category: categoryId,
      sort: sort,
      filter: filter,
      limit: limit,
      offset: offset
    };
    
    console.log('📡 API Request Parameters:', params);
    
    dispatch(fetchProductsAction(params));
  }, [categoryId, sort, filter, page, limit, dispatch]);
  
  //rating'e göre sırala ve top 5'i al
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
                  {/*API'den gelen görsel */}
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/*kategori bilgisi (overlay) */}
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
                className={`p-3 py-3 border rounded transition-colors ${
                  viewType === 'grid'
                    ? 'border-[#23A6F0] bg-[#23A6F0]'
                    : 'border-[#ECECEC]'
                }`}
              >
                <Grid 
                  size={16} 
                  className={viewType === 'grid' ? 'text-white' : 'text-[#252B42]'}
                />
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`p-3 py-3 border rounded transition-colors ${
                  viewType === 'list'
                    ? 'border-[#23A6F0] bg-[#23A6F0]'
                    : 'border-[#ECECEC]'
                }`}
              >
                <List 
                  size={16} 
                  className={viewType === 'list' ? 'text-white' : 'text-[#252B42]'}
                />
              </button>
            </div>

            {/* right filter + sort */}
            <div className="flex items-center justify-center lg:justify-end gap-3 lg:flex-1">
              {/*filter input with Search Icon */}
              <div className="relative">
                <Search 
                  size={16} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"
                />
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setPage(1);
                  }}
                  placeholder={window.innerWidth < 640 ? "Search..." : "Search products..."}
                  className="pl-10 pr-3 py-3 border border-[#DDDDDD] rounded text-sm text-[#737373] focus:outline-none focus:border-[#23A6F0] w-[140px] sm:w-[200px]"
                />
              </div>
              
              {/*sort select */}
              <select 
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="w-[130px] sm:w-auto px-3 py-3 border border-[#DDDDDD] rounded text-sm text-[#737373] bg-white focus:outline-none focus:border-[#23A6F0]"
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
          
          {/*loading spinner */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#23A6F0]"></div>
            </div>
          )}

          {/* Error Message*/}
          {isFailed && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-red-500 text-lg font-bold mb-2">Error loading products!</p>
                <button 
                  onClick={() => dispatch(fetchProductsAction({ limit: 25, offset: 0 }))}
                  className="px-6 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a8ad1]"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/*empty results message */}
          {!isLoading && !isFailed && products.length === 0 && (
            <div className="flex flex-col justify-center items-center py-20">
              <p className="text-[#737373] text-lg font-bold mb-2">No products found</p>
              <p className="text-[#BDBDBD] text-sm mb-4">Try changing your search criteria</p>
              <button 
                onClick={() => {
                  setFilter('');
                  setSort('');
                  setPage(1);
                }}
                className="px-6 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a8ad1]"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Ürün Listesi */}
          {!isLoading && !isFailed && products.length > 0 && (
            <>
              {/* GRID VIEW - Mobil: 2'li, Desktop: 4'lü */}
              {viewType === 'grid' && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-x-8 lg:gap-y-16">
                  {products.map((product) => (
                    <div key={product.id} className="flex flex-col">
                      <ProductCard
                        product={product}  
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

              {/* LIST VIEW - Mobil: ProductCard tek sütun, Desktop: Büyük detaylı */}
              {viewType === 'list' && (
                <>
                  {/*MOBİL: ProductCard (tek sütun) */}
                  <div className="grid grid-cols-1 gap-y-12 lg:hidden">
                    {products.map((product) => (
                      <div key={product.id} className="flex flex-col">
                        <ProductCard
                          product={product}  
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

                  {/*DESKTOP: Büyük detaylı kart */}
                  <div className="hidden lg:flex flex-col gap-6">
                    {products.map((product) => {
                      const genderText = product.category_id === 1 ? 'kadin' : 'erkek';
                      const categorySlug = slugify(product.category?.code || 'product');
                      const productSlug = slugify(product.name);
                      const productLink = `/product/${genderText}/${categorySlug}/${product.category_id}/${productSlug}/${product.id}`;

                      return (
                        <div key={product.id} className="flex flex-row gap-6 bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-6">
                          
                          {/* Resim - Sol taraf */}
                          <Link to={productLink} className="w-1/3 flex-shrink-0">
                            <div className="aspect-square overflow-hidden rounded">
                              <img
                                src={product.images?.[0]?.url || '/placeholder.png'}
                                alt={product.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                              />
                            </div>
                          </Link>

                          {/* İçerik - Orta (Centered) */}
                          <div className="w-2/3 flex flex-col items-center justify-center text-center gap-4">
                            
                            {/* Başlık */}
                            <Link to={productLink}>
                              <h3 className="text-[#252B42] font-bold text-2xl hover:text-[#23A6F0] transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            
                            {/* Açıklama */}
                            <p className="text-[#737373] text-base line-clamp-2 max-w-md">
                              {product.description || 'High-quality product with excellent features'}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span 
                                    key={star} 
                                    className={star <= Math.floor(product.rating) ? "text-[#F3CD03] text-lg" : "text-[#BDBDBD] text-lg"}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="text-[#737373] text-sm">
                                ({product.sell_count || 0} reviews)
                              </span>
                            </div>

                            {/* Fiyat */}
                            <div className="flex items-center gap-3">
                              <span className="text-[#BDBDBD] line-through text-lg">
                                ${product.price?.toFixed(2)}
                              </span>
                              <span className="text-[#23856D] font-bold text-3xl">
                                ${(product.price * 0.7)?.toFixed(2)}
                              </span>
                            </div>

                            {/* Stock Durumu */}
                            <div className="flex items-center gap-2">
                              <span className="text-[#737373] font-bold text-sm">Availability:</span>
                              <span className={`font-bold text-sm ${product.stock > 0 ? 'text-[#23A6F0]' : 'text-red-500'}`}>
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </div>

                            {/* Renkler */}
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-[#23A6F0] border-2 border-gray-300"></div>
                              <div className="w-6 h-6 rounded-full bg-[#23856D] border-2 border-gray-300"></div>
                              <div className="w-6 h-6 rounded-full bg-[#E77C40] border-2 border-gray-300"></div>
                              <div className="w-6 h-6 rounded-full bg-[#252B42] border-2 border-gray-300"></div>
                            </div>

                            {/* Buton - En Alta */}
                            <Link
                              to={productLink}
                              className="mt-4 px-8 py-3 bg-[#23A6F0] text-white font-bold text-sm rounded hover:bg-[#1a8ad1] transition-colors"
                            >
                              View Details
                            </Link>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* pagination - DİNAMİK */}
      <section className="w-full bg-white py-10">
        <div className="container mx-auto px-8 lg:px-12">
          {!isLoading && !isFailed && products.length > 0 && (() => {
            // Toplam sayfa sayısı
            const totalPages = Math.ceil(total / limit);
            
            // Gösterilecek sayfa numaraları (max 5 sayfa)
            const getPageNumbers = () => {
              const pages = [];
              const maxVisible = 5;
              
              let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
              let endPage = Math.min(totalPages, startPage + maxVisible - 1);
              
              if (endPage - startPage + 1 < maxVisible) {
                startPage = Math.max(1, endPage - maxVisible + 1);
              }
              
              for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
              }
              
              return pages;
            };
            
            const pageNumbers = getPageNumbers();
            
            return (
              <div className="flex justify-center items-center">
                {/* First Button */}
                <button
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className={`px-5 py-5 border font-bold text-sm rounded-l transition-colors ${
                    page === 1
                      ? 'border-[#BDBDBD] text-[#BDBDBD] bg-[#FAFAFA] cursor-not-allowed'
                      : 'border-[#E9E9E9] text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white'
                  }`}
                >
                  First
                </button>

                {/* Page Numbers */}
                {pageNumbers.map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-4 py-5 font-bold text-sm transition-colors ${
                      pageNum === page
                        ? 'bg-[#23A6F0] text-white'
                        : 'border-t border-b border-[#E9E9E9] text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className={`px-5 py-5 border font-bold text-sm rounded-r transition-colors ${
                    page === totalPages
                      ? 'border-[#BDBDBD] text-[#BDBDBD] bg-[#FAFAFA] cursor-not-allowed'
                      : 'border-[#E9E9E9] text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white'
                  }`}
                >
                  Next
                </button>
              </div>
            );
          })()}
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