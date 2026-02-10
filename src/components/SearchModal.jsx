import { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { useSelector } from 'react-redux';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const history = useHistory();
  
  const products = useSelector(state => state.product.productList);
  const categories = useSelector(state => state.client.categories);

  //modal açılınca inputa focus
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // ESC tuşuyla kapat
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; 
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  //live Search 
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      //ürünlerde ara
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5); // Max 5 sonuç

      //kategorilerde ara
      const filteredCategories = categories.filter(category =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3); 

      setSearchResults({
        products: filteredProducts,
        categories: filteredCategories
      });
    }, 300); 

    return () => clearTimeout(timer);
  }, [searchQuery, products, categories]);

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

  const handleProductClick = (product) => {
    const genderText = product.category_id === 1 ? 'kadin' : 'erkek';
    const categorySlug = slugify(product.category?.code || 'product');
    const productSlug = slugify(product.name);
    history.push(`/product/${genderText}/${categorySlug}/${product.category_id}/${productSlug}/${product.id}`);
    onClose();
  };

  const handleCategoryClick = (category) => {
    const genderText = category.gender === 'k' ? 'kadin' : 'erkek';
    const categorySlug = slugify(category.title);
    history.push(`/shop/${genderText}/${categorySlug}/${category.id}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {/*overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/*modal content */}
      <div className="relative w-full max-w-2xl mx-4 mt-20 bg-white rounded-lg shadow-2xl z-10">
        
        {/*header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-[#252B42]">Search Products</h2>
          <button 
            onClick={onClose}
            className="text-[#737373] hover:text-[#252B42]"
          >
            <X size={24} />
          </button>
        </div>

        {/*search input */}
        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={20} />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-12 pr-4 py-4 border-2 border-[#E8E8E8] rounded-lg text-base focus:outline-none focus:border-[#23A6F0] transition-colors"
            />
          </div>
        </div>

        {/*results */}
        <div className="px-6 pb-6 max-h-[400px] overflow-y-auto">
          
          {searchQuery && searchResults.products?.length === 0 && searchResults.categories?.length === 0 && (
            <p className="text-center text-[#737373] py-8">No results found</p>
          )}

          {/*products */}
          {searchResults.products?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#737373] uppercase mb-3">Products</h3>
              <div className="space-y-2">
                {searchResults.products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <img
                      src={product.images?.[0]?.url || '/placeholder.png'}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[#252B42] text-sm">{product.name}</p>
                      <p className="text-xs text-[#737373] line-clamp-1">{product.description}</p>
                    </div>
                    <p className="font-bold text-[#23856D]">${(product.price * 0.7).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/*categories */}
          {searchResults.categories?.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#737373] uppercase mb-3">Categories</h3>
              <div className="space-y-2">
                {searchResults.categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <p className="font-medium text-[#252B42] text-sm">{category.title}</p>
                    <span className="text-xs text-[#23A6F0]">View All →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default SearchModal;