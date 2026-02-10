import { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Gravatar from 'react-gravatar';
import { logoutAction } from '../store/actions/authActions';
import { fetchCategoriesAction } from '../store/actions/clientActions';
import { 
  Phone, Mail, Instagram, Youtube, Facebook, Twitter,
  ShoppingCart, Heart, Search, Menu, ChevronDown, User, Package
} from 'lucide-react';
import CartDropdown from '../components/CartDropdown';
import SearchModal from '../components/SearchModal';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0); 
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  const cartDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.client.user);
  const categories = useSelector(state => state.client.categories);
  const isLoggedIn = user && user.email;

  const cart = useSelector(state => state.shopping.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  //  Wishlist sayısını localStorage'dan oku
  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlistCount(wishlist.length);
    };

    //ilk yüklemede oku
    updateWishlistCount();

    window.addEventListener('storage', updateWishlistCount);

    window.addEventListener('wishlistUpdated', updateWishlistCount);

    return () => {
      window.removeEventListener('storage', updateWishlistCount);
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
    };
  }, []);

  //cart dropdown dışına tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setIsCartDropdownOpen(false);
      }
    };

    if (isCartDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartDropdownOpen]);

  //user dropdown dışına tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isUserDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  const womenCategories = categories
    .filter(cat => cat.gender === 'k')
    .sort((a, b) => b.rating - a.rating);

  const menCategories = categories
    .filter(cat => cat.gender === 'e')
    .sort((a, b) => b.rating - a.rating);

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

  const getGenderText = (gender) => {
    return gender === 'k' ? 'kadin' : 'erkek';
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    window.location.href = '/';
  };

  const handleCartClick = () => {
    if (isMobile) {
      history.push('/cart');
    } else {
      setIsCartDropdownOpen(!isCartDropdownOpen);
    }
  };

  return (
    <header className="w-full">
      {/*top bar */}
      <div className="hidden md:flex bg-[#252B42] text-white">
        <div className="w-full px-8">
          <div className="flex justify-between items-center h-[58px] text-sm">
            
            {/*contact info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>(225) 555-0118</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>michelle.rivera@example.com</span>
              </div>
            </div>

            {/*promo text */}
            <div className="font-bold">
              Follow Us and get a chance to win 80% off
            </div>

            {/*social media */}
            <div className="flex items-center gap-3">
              <span>Follow Us :</span>
              <div className="flex items-center gap-2">
                <Instagram size={16} className="cursor-pointer hover:opacity-80" />
                <Youtube size={16} className="cursor-pointer hover:opacity-80" />
                <Facebook size={16} className="cursor-pointer hover:opacity-80" />
                <Twitter size={16} className="cursor-pointer hover:opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*main navbar */}
      <nav className="bg-white">
        <div className="w-full px-8">
          <div className="flex items-center justify-between h-[70px]">
            
            {/*logo */}
            <Link to="/" className="text-2xl font-bold text-[#252B42]">
              Bandage
            </Link>

            {/*desktop navigation */}
            <div className="hidden md:flex items-center gap-4 mr-auto ml-32">
              <Link to="/" className="text-[#737373] hover:text-[#23856D] font-medium text-sm">
                Home
              </Link>
              
              <div 
                className="relative"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <div className="flex items-center gap-1 text-[#737373] hover:text-[#23856D] font-medium text-sm cursor-pointer">
                  <Link to="/shop">Shop</Link>
                  <ChevronDown size={14} />
                </div>

                {isShopDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white shadow-lg border border-gray-200 rounded-md p-6 min-w-[400px]">
                      <div className="grid grid-cols-2 gap-8">
                        
                        {/*women categories */}
                        <div>
                          <h3 className="font-bold text-[#252B42] mb-3">
                            Women
                          </h3>
                          <div className="flex flex-col gap-2">
                            {womenCategories.map((category) => {
                              const genderText = getGenderText(category.gender);
                              const categorySlug = slugify(category.title);
                              const linkPath = `/shop/${genderText}/${categorySlug}/${category.id}`;
                              
                              return (
                                <Link
                                  key={category.id}
                                  to={linkPath}
                                  className="text-[#737373] hover:text-[#23A6F0] text-sm py-1 hover:underline"
                                  onClick={() => setIsShopDropdownOpen(false)}
                                >
                                  {translateCategory(category.title)}
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Men Categories */}
                        <div>
                          <h3 className="font-bold text-[#252B42] mb-3">
                            Men
                          </h3>
                          <div className="flex flex-col gap-2">
                            {menCategories.map((category) => {
                              const genderText = getGenderText(category.gender);
                              const categorySlug = slugify(category.title);
                              const linkPath = `/shop/${genderText}/${categorySlug}/${category.id}`;
                              
                              return (
                                <Link
                                  key={category.id}
                                  to={linkPath}
                                  className="text-[#737373] hover:text-[#23A6F0] text-sm py-1 hover:underline"
                                  onClick={() => setIsShopDropdownOpen(false)}
                                >
                                  {translateCategory(category.title)}
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Link to="/about" className="text-[#737373] hover:text-[#23856D] font-medium text-sm">
                About
              </Link>

              <Link to="/team" className="text-[#737373] hover:text-[#23856D] font-medium text-sm">
                Team
              </Link>

              <Link to="/blog" className="text-[#737373] hover:text-[#23856D] font-medium text-sm">
                Blog
              </Link>
              
              <Link to="/contact" className="text-[#737373] hover:text-[#23856D] font-medium text-sm">
                Contact
              </Link>
              
              
            </div>

            {/*right icons */}
            <div className="flex items-center gap-3">
              
              {/*Desktop User Dropdown */}
              {isLoggedIn ? (
                <div className="hidden md:block relative" ref={userDropdownRef}>
                  <div 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                  >
                    <Gravatar 
                      email={user.email} 
                      size={32}
                      rating="pg"
                      default="mp"
                      className="rounded-full"
                    />
                    <span className="text-[#23A6F0] font-medium text-sm">
                      {user.name}
                    </span>
                    <ChevronDown size={14} className="text-[#23A6F0]" />
                  </div>

                  {/*dropdown menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-md py-2 z-50">
                      <Link
                        to="/order-history"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#737373] hover:bg-gray-50 hover:text-[#23A6F0]"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Package size={16} />
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#737373] hover:bg-gray-50 hover:text-[#23A6F0] text-left"
                      >
                        <User size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-1 text-[#23A6F0] font-medium text-sm">
                  <User size={12} />
                  <Link to="/login" className="hover:opacity-80">
                    Login
                  </Link>
                  <span className="mx-1">/</span>
                  <Link to="/signup" className="hover:opacity-80">
                    Register
                  </Link>
                </div>
              )}
             
              {/*search */}
              <button 
  onClick={() => setIsSearchModalOpen(true)}
  className="text-[#737373] md:text-[#23A6F0] hover:opacity-80"
>
  <Search size={18} />
</button>


              {/*cart */}
              <div className="relative" ref={cartDropdownRef}>
                <div 
                  onClick={handleCartClick}
                  className="flex items-center gap-1 text-[#737373] md:text-[#23A6F0] hover:opacity-80 cursor-pointer"
                >
                  <ShoppingCart size={18} />
                  {cartItemCount > 0 && (
                    <span className="text-xs">{cartItemCount}</span>
                  )}
                </div>
                
                {!isMobile && isCartDropdownOpen && (
                  <CartDropdown onClose={() => setIsCartDropdownOpen(false)} />
                )}
              </div>

              {/*wishlist  */}
              <Link to="/wishlist" className="hidden md:flex items-center gap-1 text-[#23A6F0] hover:opacity-80">
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="text-xs">{wishlistCount}</span>
                )}
              </Link>

              {/*mobile menu toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-[#737373]"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/*mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-6 pt-2">
              <div className="flex flex-col gap-5 text-center">
                
                <Link 
                  to="/" 
                  className="text-[#737373] hover:text-[#23856D] font-medium text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                
                <Link 
                  to="/shop" 
                  className="text-[#737373] hover:text-[#23856D] font-medium text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                
                <Link 
                  to="/about" 
                  className="text-[#737373] hover:text-[#23856D] font-medium text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>

                <Link 
                  to="/team" 
                  className="text-[#737373] hover:text-[#23856D] font-medium text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Team
                </Link>

                <Link 
                  to="/blog" 
                  className="text-[#737373] hover:text-[#23856D] font-medium text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                
                <Link 
                  to="/contact" 
                  className="text-[#737373] hover:text-[#23856D] font-medium text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                

                {/*mobile user section */}
                {isLoggedIn ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Gravatar 
                        email={user.email} 
                        size={40}
                        rating="pg"
                        default="mp"
                        className="rounded-full"
                      />
                      <span className="text-[#23A6F0] font-medium text-lg">
                        {user.name}
                      </span>
                    </div>
                    <Link
                      to="/order-history"
                      className="text-[#737373] hover:text-[#23A6F0] font-medium text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="text-[#737373] hover:text-[#23A6F0] font-medium text-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-[#23A6F0] font-medium text-lg">
                    <User size={16} />
                    <Link 
                      to="/login" 
                      className="hover:opacity-80"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <span>/</span>
                    <Link 
                      to="/signup" 
                      className="hover:opacity-80"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}

                <div className="flex flex-col items-center justify-center gap-4 mt-2">
                  
                  <button 
  onClick={() => {
    setIsSearchModalOpen(true);
    setIsMobileMenuOpen(false);
  }}
  className="text-[#23A6F0] hover:opacity-80"
>
  <Search size={24} />
</button>

                  <Link 
                    to="/cart" 
                    className="flex items-center gap-1 text-[#23A6F0] hover:opacity-80"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingCart size={24} />
                    <span className="text-sm">{cartItemCount}</span>
                  </Link>

                  {/*mobile wishlist  */}
                  <Link 
                    to="/wishlist" 
                    className="flex items-center gap-1 text-[#23A6F0] hover:opacity-80"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart size={24} />
                    {wishlistCount > 0 && (
                      <span className="text-sm">{wishlistCount}</span>
                    )}
                  </Link>

                </div>

              </div>
            </div>
          )}
        </div>
      </nav>
      {/*search modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </header>
  );
};

export default Header;