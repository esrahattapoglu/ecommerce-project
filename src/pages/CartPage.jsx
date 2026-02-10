import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronRight, ShoppingCart as CartIcon, Trash2, Plus, Minus } from 'lucide-react';
import { removeFromCart, updateProductCount, toggleProduct } from '../store/actions/shoppingCartActions';
import { useHistory } from 'react-router-dom';

const CartPage = () => {
 const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.shopping.cart);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountError, setDiscountError] = useState('');

  //kargo sabitleri
  const SHIPPING_COST = 29.99;
  const FREE_SHIPPING_THRESHOLD = 150;

  //demo indirim kodları
  const DISCOUNT_CODES = {
    'INDIRIM10': { type: 'percentage', value: 10, description: '10% Discount' }
  };

  //seçili ürünleri filtrele
  const selectedItems = cart.filter(item => item.checked);
  
  //ara toplam 
  const subtotal = selectedItems.reduce((sum, item) => 
    sum + (item.product.price * item.count), 0
  );

  //kargo hesaplama
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const shippingDiscount = subtotal >= FREE_SHIPPING_THRESHOLD ? SHIPPING_COST : 0;
  
  //indirim hesaplama
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === 'percentage') {
      discountAmount = (subtotal * appliedDiscount.value) / 100;
    } else if (appliedDiscount.type === 'fixed') {
      discountAmount = appliedDiscount.value;
    }
  }

  //genel toplam 
  const grandTotal = subtotal + shippingCost - discountAmount;

  //indirim kodu uygula
  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    
    if (!code) {
      setDiscountError('Please enter a discount code');
      return;
    }

    if (DISCOUNT_CODES[code]) {
      setAppliedDiscount(DISCOUNT_CODES[code]);
      setDiscountError('');
      setDiscountCode('');
    } else {
      setDiscountError('Invalid discount code');
      setAppliedDiscount(null);
    }
  };

  //indirim kodu kaldır
  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    setDiscountError('');
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
            <Link to="/shop" className="text-[#23A6F0] hover:text-[#1a8ad1]">
              Shop
            </Link>
            <ChevronRight size={16} className="text-[#BDBDBD]" />
            <span className="text-[#BDBDBD]">Cart</span>
          </div>
        </div>
      </section>

      {/*main content */}
      <section className="w-full py-6 md:py-8 lg:py-12 bg-white">
        <div className="container mx-auto px-2 sm:px-3 md:px-8">
          
          {/*title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#252B42] mb-6 md:mb-8">
            My Cart ({selectedItems.length}/{cart.length} Products Selected)
          </h1>

          {/*boş sepet */}
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <CartIcon size={48} className="text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-[#252B42] mb-2">
                Your Cart is Empty
              </h2>
              <p className="text-gray-500 mb-6">
                Add products to start shopping
              </p>
              <Link 
                to="/shop"
                className="px-8 py-3 bg-[#23A6F0] text-white font-bold rounded hover:bg-[#1a8ad1] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            /* ürünler ve özet layout */
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              
              {/*sol: ürün listesi */}
              <div className="lg:col-span-2 space-y-3 md:space-y-4">
                {cart.map((item) => (
                  <div 
                    key={item.product.id}
                    className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 md:p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-1.5 sm:gap-2 md:gap-4">
                      
                      {/*checkbox */}
                      <div className="flex-shrink-0 flex items-start pt-0.5 sm:pt-1 md:pt-2">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => dispatch(toggleProduct(item.product.id))}
                          className="w-4 h-4 md:w-5 md:h-5 text-[#23A6F0] border-gray-300 rounded focus:ring-[#23A6F0] cursor-pointer"
                        />
                      </div>

                      {/*ürün görseli */}
                      <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={item.product.images?.[0]?.url || '/placeholder.png'}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/*ürün bilgileri */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        
                        {/*üst: isim ve fiyat */}
                        <div>
                          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-[#252B42] mb-1 md:mb-2 line-clamp-2">
                            {item.product.name}
                          </h3>
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#23A6F0]">
                            ${item.product.price?.toFixed(2)}
                          </p>
                        </div>

                        {/*alt: miktar kontrolü ve silme */}
                        <div className="flex items-center justify-between mt-2 md:mt-4 gap-1 sm:gap-2">
                          
                          {/*miktar kontrol */}
                          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
                            <button
                              onClick={() => {
                                if (item.count > 1) {
                                  dispatch(updateProductCount(item.product.id, item.count - 1));
                                }
                              }}
                              disabled={item.count <= 1}
                              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center border-2 border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus size={12} className="sm:hidden" />
                              <Minus size={14} className="hidden sm:block md:hidden" />
                              <Minus size={16} className="hidden md:block" />
                            </button>
                            
                            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-[#252B42] min-w-[24px] sm:min-w-[30px] md:min-w-[40px] text-center">
                              {item.count}
                            </span>
                            
                            <button
                              onClick={() => dispatch(updateProductCount(item.product.id, item.count + 1))}
                              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center border-2 border-gray-300 rounded hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={12} className="sm:hidden" />
                              <Plus size={14} className="hidden sm:block md:hidden" />
                              <Plus size={16} className="hidden md:block" />
                            </button>
                          </div>

                          {/*ara toplam ve silme */}
                          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
                            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-[#252B42]">
                              ${(item.product.price * item.count).toFixed(2)}
                            </p>
                            
                            <button
                              onClick={() => dispatch(removeFromCart(item.product.id))}
                              className="text-red-500 hover:text-red-700 p-1 md:p-2 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 size={16} className="sm:hidden" />
                              <Trash2 size={18} className="hidden sm:block md:hidden" />
                              <Trash2 size={20} className="hidden md:block" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/*sağ: özet kutusu */}
              <div className="lg:col-span-1 w-full">
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 lg:sticky lg:top-4">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#252B42] mb-3 sm:mb-4 md:mb-6 pb-2 sm:pb-3 md:pb-4 border-b border-gray-200">
                    Order Summary
                  </h2>

                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    {/*seçili ürün sayısı */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm md:text-base text-gray-600">Selected Products:</span>
                      <span className="text-xs sm:text-sm md:text-base font-semibold text-[#252B42]">
                        {selectedItems.length} items
                      </span>
                    </div>

                    {/*ürünün toplamı */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm md:text-base text-gray-600">Subtotal:</span>
                      <span className="text-xs sm:text-sm md:text-base font-semibold text-[#252B42]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/*kargo toplam */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm md:text-base text-gray-600">Shipping Total:</span>
                      <span className="text-xs sm:text-sm md:text-base font-semibold text-[#252B42]">
                        ${SHIPPING_COST.toFixed(2)}
                      </span>
                    </div>

                    {/*150$ ve üzeri kargo bedava (İndirim) */}
                    {shippingDiscount > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm md:text-base text-gray-600">Free Shipping over $150:</span>
                        <span className="text-xs sm:text-sm md:text-base font-semibold text-red-500 line-through">
                          -${shippingDiscount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/*uygulanan indirim */}
                    {appliedDiscount && discountAmount > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm md:text-base text-gray-600">
                          Discount ({appliedDiscount.description}):
                        </span>
                        <span className="text-xs sm:text-sm md:text-base font-semibold text-green-600">
                          -${discountAmount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/*ayırıcı */}
                    <div className="border-t border-gray-200 pt-2 sm:pt-3 md:pt-4 mt-2 sm:mt-3 md:mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base md:text-lg font-bold text-[#252B42]">Total:</span>
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#23A6F0]">
                          ${grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/*indirim kodu butonu */}
                    {!appliedDiscount && (
                      <button
                        onClick={() => setShowDiscountInput(!showDiscountInput)}
                        className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-[#23A6F0] transition-colors mt-2"
                      >
                        <Plus size={14} className="sm:hidden" />
                        <Plus size={16} className="hidden sm:block" />
                        <span className="font-medium">ENTER DISCOUNT CODE</span>
                      </button>
                    )}

                    {/*indirim kodu input */}
                    {showDiscountInput && !appliedDiscount && (
                      <div className="space-y-2">
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="Enter discount code"
                            value={discountCode}
                            onChange={(e) => {
                              setDiscountCode(e.target.value);
                              setDiscountError('');
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleApplyDiscount();
                              }
                            }}
                            className="flex-1 border border-gray-300 px-3 py-2 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#23A6F0] focus:border-transparent"
                          />
                          <button
                            onClick={handleApplyDiscount}
                            className="px-3 sm:px-4 py-2 bg-[#23A6F0] text-white text-xs sm:text-sm font-medium rounded hover:bg-[#1a8ad1] transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        {discountError && (
                          <p className="text-xs text-red-500">{discountError}</p>
                        )}
                      </div>
                    )}

                    {/* uygulanan indirim kodu - kaldırma */}
                    {appliedDiscount && (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded px-3 py-2">
                        <span className="text-xs sm:text-sm text-green-700 font-medium">
                          ✓ Discount code applied
                        </span>
                        <button
                          onClick={handleRemoveDiscount}
                          className="text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    {/*sepeti onayla butonu */}
                    <button
  onClick={() => history.push('/create-order')}
  disabled={selectedItems.length === 0}
  className="w-full py-2 sm:py-2.5 md:py-3 bg-[#23A6F0] text-white text-xs sm:text-sm md:text-base font-bold rounded hover:bg-[#1a8ad1] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-3 sm:mt-4 md:mt-6"
>
  Confirm Cart
</button>

                    {selectedItems.length === 0 && (
                      <p className="text-xs md:text-sm text-center text-gray-500 mt-2">
                        Please select at least one product
                      </p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default CartPage;