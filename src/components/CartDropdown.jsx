import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Plus, Minus, ShoppingCart as CartIcon } from 'lucide-react';
import { removeFromCart, updateProductCount } from '../store/actions/shoppingCartActions';

const CartDropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.shopping.cart);

  //toplam fiyat hesapla
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.product.price * item.count);
  }, 0);

  //boş sepet
  if (cart.length === 0) {
    return (
      <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-xl border border-gray-200 rounded-md p-8 z-50">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <CartIcon size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">Your cart is empty</p>
          <p className="text-sm text-gray-400">Add products to start shopping</p>
          <Link 
            to="/shop"
            onClick={onClose}
            className="mt-2 px-6 py-2 bg-[#23A6F0] text-white text-sm font-bold rounded hover:bg-[#1a8ad1] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white shadow-xl border border-gray-200 rounded-md z-50 max-h-[500px] flex flex-col">
      
      {/*header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-bold text-lg text-[#252B42]">
          My Cart ({cart.length} Products)
        </h3>
      </div>

      {/*products list */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item.product.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
              
              {/*product image */}
              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded">
                <img 
                  src={item.product.images?.[0]?.url || '/placeholder.png'} 
                  alt={item.product.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              {/*product info */}
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-sm font-medium text-[#252B42] line-clamp-2">
                  {item.product.name}
                </h4>
                
                {/*price */}
                <p className="text-sm font-bold text-[#23A6F0]">
                  ${item.product.price?.toFixed(2)}
                </p>

                {/*count controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (item.count > 1) {
                        dispatch(updateProductCount(item.product.id, item.count - 1));
                      }
                    }}
                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                  >
                    <Minus size={12} />
                  </button>
                  
                  <span className="text-sm font-medium min-w-[20px] text-center">
                    {item.count}
                  </span>
                  
                  <button
                    onClick={() => dispatch(updateProductCount(item.product.id, item.count + 1))}
                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                  >
                    <Plus size={12} />
                  </button>

                  {/*delete button */}
                  <button
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/*subtotal */}
                <p className="text-xs text-gray-500">
                  Total: ${(item.product.price * item.count).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        {/*total price */}
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium text-[#252B42]">Total:</span>
          <span className="font-bold text-lg text-[#23A6F0]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        {/*go to cart buttonu */}
        <Link 
          to="/cart"
          onClick={onClose}
          className="block w-full py-3 bg-[#23A6F0] text-white text-center font-bold rounded hover:bg-[#1a8ad1] transition-colors"
        >
          Go to Cart
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;