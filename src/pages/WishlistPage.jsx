import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ChevronRight, Trash2, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { addToCart } from '../store/actions/shoppingCartActions';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  //load wishlist from localStorage
  useEffect(() => {
    const loadWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlist(savedWishlist);
    };

    loadWishlist();

    //listen for updates
    window.addEventListener('wishlistUpdated', loadWishlist);
    return () => window.removeEventListener('wishlistUpdated', loadWishlist);
  }, []);

  //remove from wishlist
  const handleRemove = (productId) => {
    const newWishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setWishlist(newWishlist);
    window.dispatchEvent(new Event('wishlistUpdated'));
    
    toast.info('Removed from wishlist', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  //add to cart
  const handleAddToCart = (product) => {
    try {
      dispatch(addToCart(product));
      toast.success('Product added to cart!', {
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

  //navigate to product detail
  const handleProductClick = (product) => {
    const genderText = product.category_id === 1 ? 'kadin' : 'erkek';
    const categorySlug = product.category?.code || 'product';
    const productSlug = product.name.toLowerCase().replace(/\s+/g, '-');
    history.push(`/product/${genderText}/${categorySlug}/${product.category_id}/${productSlug}/${product.id}`);
  };

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
            <span className="text-[#BDBDBD]">Wishlist</span>
          </div>
        </div>
      </section>

      {/*main content */}
      <section className="w-full py-6 md:py-8 lg:py-12 bg-white">
        <div className="container mx-auto px-2 sm:px-3 md:px-8">
          
          {/*title */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#252B42] mb-6 md:mb-8">
            My Wishlist ({wishlist.length})
          </h1>

          {/*empty state */}
          {wishlist.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg mb-2">Your wishlist is empty</p>
              <p className="text-gray-500 text-sm mb-6">Add products you love to your wishlist!</p>
              <Link
                to="/shop"
                className="inline-block px-6 py-3 bg-[#23A6F0] text-white font-semibold rounded hover:bg-[#1a8ad1] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            /*wishlist grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/*product image */}
                  <div 
                    onClick={() => handleProductClick(product)}
                    className="relative aspect-square cursor-pointer overflow-hidden bg-gray-100"
                  >
                    <img
                      src={product.images?.[0]?.url || '/placeholder.png'}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  {/*product info */}
                  <div className="p-4">
                    <h3 
                      onClick={() => handleProductClick(product)}
                      className="text-[#252B42] font-bold text-sm mb-2 line-clamp-2 cursor-pointer hover:text-[#23A6F0]"
                    >
                      {product.name}
                    </h3>
                    
                    <p className="text-[#737373] text-xs mb-3 line-clamp-1">
                      {product.description}
                    </p>

                    {/*price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[#23A6F0] font-bold text-lg">
                        ${product.price?.toFixed(2)}
                      </span>
                    </div>

                    {/*actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 px-4 py-2 bg-[#23A6F0] text-white text-sm font-bold rounded hover:bg-[#1a8ad1] transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                      
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="px-3 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WishlistPage;