import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ChevronRight, ShoppingCart, Heart, Eye } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProductByIdAction, fetchProductsAction } from '../store/actions/productActions';
import { addToCart } from '../store/actions/shoppingCartActions';

const ProductDetailPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isInWishlist, setIsInWishlist] = useState(false); 
  
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const product = useSelector(state => state.product.selectedProduct);
  const fetchState = useSelector(state => state.product.fetchState);
  const allProducts = useSelector(state => state.product.productList);
  
  const isLoading = fetchState === 'FETCHING';
  const isFailed = fetchState === 'FAILED';
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (productId) {
      dispatch(fetchProductByIdAction(productId));
    }
    
    // bestseller için ürünleri çek
    if (!allProducts || allProducts.length === 0) {
      dispatch(fetchProductsAction({ limit: 50, offset: 0 }));
    }
  }, [productId, dispatch, allProducts]);
  
  // wishlist kontrolü (localStorage)
  useEffect(() => {
    if (product) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setIsInWishlist(wishlist.some(item => item.id === product.id));
    }
  }, [product]);
  
  const images = product?.images?.length > 0 
    ? product.images.map(img => img.url)
    : ['/productDetail/main-product.png', '/productDetail/thumbnail-1.jpg', '/productDetail/thumbnail-2.jpg'];

  const colors = [
    { name: 'blue', class: 'bg-[#23A6F0]' },
    { name: 'green', class: 'bg-[#2DC071]' },
    { name: 'orange', class: 'bg-[#E77C40]' },
    { name: 'black', class: 'bg-[#252B42]' }
  ];

  //bestseller products - backend den çekilir
  const bestsellerProducts = allProducts
    .filter(p => p.id !== product?.id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  // description image
  const descriptionImage = product?.images?.[0]?.url || '/productDetail/description-image.png';
  
  //add to cart handler with toast
  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('Product is out of stock!', {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    
    try {
      dispatch(addToCart(product));
      toast.success('Product added to your cart!', {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error('Error adding product!', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  //wishlist toggle
  const handleToggleWishlist = () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      
      if (isInWishlist) {
        //wishlist'ten çıkar
        const newWishlist = wishlist.filter(item => item.id !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        setIsInWishlist(false);
        toast.info('Removed from wishlist', {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        //wishlist'e ekle
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(true);
        toast.success('Added to wishlist!', {
          position: "top-right",
          autoClose: 2000,
        });
      }

       //headerı güncelle
    window.dispatchEvent(new Event('wishlistUpdated'));


    } catch (error) {
      toast.error('Error updating wishlist!', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  
  //quick view 
const handleQuickView = () => {
  //description tabına geç
  setActiveTab('description');
  
  //description section'a scroll yap
  const descriptionSection = document.querySelector('[data-section="description"]');
  if (descriptionSection) {
    descriptionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

  return (
    <div className="w-full">
      
      {/*breadcrumb */}
      <section className="w-full bg-[#FAFAFA] py-6 lg:py-6">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Link to="/" className="text-[#252B42] hover:text-[#23A6F0]">
                Home
              </Link>
              <ChevronRight size={16} className="text-[#BDBDBD]" />
              <span className="text-[#BDBDBD]">Shop</span>
            </div>
            
            <button
              onClick={() => history.goBack()}
              className="px-4 py-2 text-sm font-bold text-[#23A6F0] hover:text-[#1a8ad1] transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </section>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#23A6F0]"></div>
        </div>
      )}

      {isFailed && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <p className="text-red-500 text-lg font-bold mb-2">Error loading product!</p>
            <button 
              onClick={() => dispatch(fetchProductByIdAction(productId))}
              className="px-6 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a8ad1]"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {!isLoading && !isFailed && product && (
        <>
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
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* navigation arrows */}
                    {images.length > 1 && (
                      <>
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
                      </>
                    )}
                  </div>

                  {/* thumbnails */}
                  {images.length > 1 && (
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
                  )}
                </div>

                {/*right product info */}
                <div className="w-full lg:w-1/2 flex flex-col gap-3 lg:gap-4">
                  
                  <h1 className="text-[#252B42] font-normal text-xl lg:text-2xl">
                    {product.name}
                  </h1>

                  {/*rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star} 
                          className={star <= Math.floor(product.rating) ? "text-[#F3CD03] text-xl" : "text-[#BDBDBD] text-xl"}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-[#737373] font-bold text-sm">
                      {product.sell_count} Reviews
                    </span>
                  </div>

                  <h2 className="text-[#252B42] font-bold text-2xl">
                    ${product.price?.toFixed(2)}
                  </h2>

                  <div className="flex items-center gap-2">
                    <span className="text-[#737373] font-bold text-sm">Availability :</span>
                    <span className={`font-bold text-sm ${product.stock > 0 ? 'text-[#23A6F0]' : 'text-red-500'}`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <p className="text-[#858585] text-sm leading-relaxed pb-6 lg:pb-8 pt-4 border-b border-[#BDBDBD] max-w-md">
                    {product.description}
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
                    {/*ana buton "Add to Cart" */}
                    <button 
                      onClick={handleAddToCart}
                      disabled={product.stock <= 0}
                      className={`px-5 py-3 text-white font-bold text-sm rounded transition-colors ${
                        product.stock > 0 
                          ? 'bg-[#23A6F0] hover:bg-[#1a8ad1]'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Add to Cart
                    </button>
                    
                    {/* kalp ikonu- Wishlist Toggle */}
                    <button 
                      onClick={handleToggleWishlist}
                      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                      className={`w-10 h-10 border rounded-full flex items-center justify-center transition-all ${
                        isInWishlist
                          ? 'border-red-500 bg-red-50'
                          : 'border-[#E8E8E8] hover:border-[#23A6F0] hover:bg-blue-50'
                      }`}
                    >
                      <Heart 
                        size={20} 
                        className={isInWishlist ? 'text-red-500 fill-red-500' : 'text-[#252B42]'}
                      />
                    </button>
                    
                   
                    {/* sepet ikonu - Sepete Git */}
<button 
  onClick={() => history.push('/cart')}
  title="Go to cart"
  className="w-10 h-10 border border-[#E8E8E8] rounded-full flex items-center justify-center hover:border-[#23A6F0] hover:bg-blue-50 transition-colors"
>
  <ShoppingCart size={20} className="text-[#252B42]" />
</button>
                    
                    {/*göz ikonu */}
                    <button 
                      onClick={handleQuickView}
                      title="View product details"
                      className="w-10 h-10 border border-[#E8E8E8] rounded-full flex items-center justify-center hover:border-[#23A6F0] hover:bg-blue-50 transition-colors"
                    >
                      <Eye size={20} className="text-[#252B42]" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/*tabs section */}
          <section className="w-full bg-white" data-section="description">
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
                  Reviews <span className="text-[#23856D]">({product.sell_count})</span>
                </button>
              </div>

              {/*tab content */}
              <div className="py-8 lg:py-12">
                {activeTab === 'description' && (
                  <>
                    {/*mobile layout */}
                    <div className="lg:hidden flex flex-col gap-8">
                      
                      {/*image - SABİT YÜKSEKLIK */}
                      <div className="w-full h-[400px]">
                        <img 
                          src={descriptionImage}
                          alt="Product Description" 
                          className="w-full h-full object-cover rounded"
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
                      
                      {/* column 1 image - SABİT YÜKSEKLIK */}
                      <div className="w-full h-[500px]">
                        <img 
                          src={descriptionImage}
                          alt="Product Description" 
                          className="w-full h-full object-cover rounded"
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

              {/* Ürün gridi - DİNAMİK */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {bestsellerProducts.map((product) => (
                  <div key={product.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <ProductCard
                      product={product}
                      image={product.images?.[0]?.url || '/placeholder.png'}
                      title={product.name}
                      department={product.description || 'Product'}
                      oldPrice={product.price?.toFixed(2) || '0.00'}
                      newPrice={(product.price * 0.7)?.toFixed(2) || '0.00'}
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
        </>
      )}

    </div>
  );
};

export default ProductDetailPage;