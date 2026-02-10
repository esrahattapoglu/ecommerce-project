import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, ChevronUp, Package } from 'lucide-react';
import { fetchOrderHistoryAction } from '../store/actions/orderActions';

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  
  const orderHistory = useSelector(state => state.order.orderHistory);
  const fetchingHistory = useSelector(state => state.order.fetchingHistory);
  
  const [expandedOrders, setExpandedOrders] = useState([]);
  
  useEffect(() => {
    dispatch(fetchOrderHistoryAction());
  }, [dispatch]);
  
  //toggle sipariş detayları
  const toggleOrder = (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter(id => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };
  
  //kart numarası maskeleme
  const maskCardNumber = (cardNo) => {
    if (!cardNo) return '';
    const cardStr = cardNo.toString();
    if (cardStr.length < 10) return cardStr;
    const last4 = cardStr.substring(cardStr.length - 4);
    return `**** **** **** ${last4}`;
  };
  
  //tarih formatlama
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  //loading durumu
  if (fetchingHistory) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#23A6F0]"></div>
      </div>
    );
  }
  
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
            <span className="text-[#BDBDBD]">My Orders</span>
          </div>
        </div>
      </section>

      {/*main content */}
      <section className="w-full py-6 md:py-8 lg:py-12 bg-white">
        <div className="container mx-auto px-2 sm:px-3 md:px-8">
          
          {/*title */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#252B42] mb-6 md:mb-8">
            My Orders
          </h1>

          {/*empty state */}
          {orderHistory.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <Package size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg mb-2">You don't have any orders yet</p>
              <p className="text-gray-500 text-sm mb-6">Start shopping to place your first order!</p>
              <Link
                to="/shop"
                className="inline-block px-6 py-3 bg-[#23A6F0] text-white font-semibold rounded hover:bg-[#1a8ad1] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            /*order list */
            <div className="space-y-4">
              {orderHistory.map((order) => {
                const isExpanded = expandedOrders.includes(order.id);
                
                return (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* order summary  */}
                    <div
                      onClick={() => toggleOrder(order.id)}
                      className="p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        
                        {/*left: order info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-[#252B42]">
                              Order #{order.id}
                            </h3>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              ✅ Completed
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {formatDate(order.order_date)}
                          </p>
                        </div>

                        {/* right: price- toggle */}
                        <div className="flex items-center justify-between md:justify-end gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Total</p>
                            <p className="text-xl font-bold text-[#23A6F0]">
                              ${order.price.toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                            {isExpanded ? (
                              <ChevronUp size={20} className="text-[#23A6F0]" />
                            ) : (
                              <ChevronDown size={20} className="text-[#23A6F0]" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*order details  */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50">
                        
                        {/*products */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-[#252B42] mb-3">Products:</h4>
                          <div className="space-y-3">
                            {order.products.map((product, index) => (
                              <div key={index} className="flex items-center gap-4 bg-white p-3 rounded-lg">
                                {product.images && product.images[0] && (
                                  <img
                                    src={product.images[0].url}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="font-semibold text-[#252B42]">{product.name}</p>
                                  <p className="text-sm text-gray-600">{product.description}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Quantity: {product.count} x ${product.price.toFixed(2)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-[#252B42]">
                                    ${(product.price * product.count).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/*payment info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-[#252B42] mb-2">Payment Information:</h4>
                            <p className="text-sm text-gray-600">
                              💳 {order.card_name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {maskCardNumber(order.card_no)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrderHistoryPage;