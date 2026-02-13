import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CreditCard, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  fetchCardsAction,
  addCardAction,
  updateCardAction,
  deleteCardAction,
  setSelectedCard
} from '../store/actions/cardActions';
import { createOrderAction } from '../store/actions/orderActions';
import { CLEAR_CART } from '../store/reducers/shoppingCartReducer';

const PaymentStep = ({ onBack, onComplete }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  //redux state
  const cards = useSelector(state => state.card.cards);
  const selectedCard = useSelector(state => state.card.selectedCard);
  const fetchState = useSelector(state => state.card.fetchState);
  const cart = useSelector(state => state.shopping.cart);
  const selectedShipping = useSelector(state => state.address.selectedShippingAddress);
  const orderLoading = useSelector(state => state.order.loading);
  
  //local state
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [use3DSecure, setUse3DSecure] = useState(false);
  const [installment, setInstallment] = useState(1);
  const [savedCardCvv, setSavedCardCvv] = useState(''); 
  
  //form state
  const [formData, setFormData] = useState({
    card_no: '',
    name_on_card: '',
    expire_month: '',
    expire_year: '',
    cvv: ''
  });
  
  //component mount olunca kartları çek
  useEffect(() => {
    dispatch(fetchCardsAction());
  }, [dispatch]);
  
  //sepet hesaplamaları
  const selectedItems = cart.filter(item => item.checked);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  const SHIPPING_COST = 29.99;
  const FREE_SHIPPING_THRESHOLD = 150;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = subtotal + shippingCost;
  
  //kart numarası maskeleme
  const maskCardNumber = (cardNo) => {
    if (!cardNo || cardNo.length < 10) return cardNo;
    const first6 = cardNo.substring(0, 6);
    const last4 = cardNo.substring(cardNo.length - 4);
    return `${first6.substring(0, 4)} ${first6.substring(4, 6)}** **** ${last4}`;
  };
  
  //kart markası belirleme
  const getCardBrand = (cardNo) => {
    if (!cardNo) return '';
    const firstDigit = cardNo.charAt(0);
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'Amex';
    return 'Card';
  };
  
  //form input değişikliği
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'card_no') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 16) {
        setFormData(prev => ({ ...prev, [name]: cleaned }));
      }
    } else if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 3) {
        setFormData(prev => ({ ...prev, [name]: cleaned }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { cvv, ...cardDataWithoutCVV } = formData;
    
    const cardData = {
      ...cardDataWithoutCVV,
      expire_month: parseInt(formData.expire_month),
      expire_year: parseInt(formData.expire_year)
    };
    
    try {
      if (editingCard) {
        await dispatch(updateCardAction({
          id: editingCard.id,
          ...cardData
        }));
        toast.success('Card updated!');
      } else {
        await dispatch(addCardAction(cardData));
        toast.success('Card added!');
      }
      resetForm();
    } catch (error) {
      toast.error('An error occurred!');
    }
  };
  
  //formu sıfırla
  const resetForm = () => {
    setFormData({
      card_no: '',
      name_on_card: '',
      expire_month: '',
      expire_year: '',
      cvv: ''
    });
    setShowCardForm(false);
    setEditingCard(null);
  };
  
  //kart düzenle
  const handleEdit = (card) => {
    setFormData({
      card_no: card.card_no,
      name_on_card: card.name_on_card,
      expire_month: card.expire_month.toString().padStart(2, '0'),
      expire_year: card.expire_year.toString(),
      cvv: ''
    });
    setEditingCard(card);
    setShowCardForm(true);
  };
  
  //kart sil
  const handleDelete = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await dispatch(deleteCardAction(cardId));
        toast.success('Card deleted!');
      } catch (error) {
        toast.error('Delete operation failed!');
      }
    }
  };
  
  //kart seç
  const handleSelectCard = (card) => {
    dispatch(setSelectedCard(card));
    setSavedCardCvv(''); // kart değişince CVVyi sıfırla
  };
  
  
  const handleCompletePayment = async () => {
    // validasyonlar
    if (!selectedCard && cards.length > 0) {
      toast.error('Please select a payment card!');
      return;
    }
    
    if (cards.length === 0 && !showCardForm) {
      toast.error('Please add a payment card!');
      return;
    }
    
    //kayıtlı kart kullanıyorsa CVV kontrolü
    if (selectedCard && !savedCardCvv) {
      toast.error('Please enter CVV for security!');
      return;
    }
    
    //yeni kart ekleme durumu
    if (showCardForm) {
      toast.error('Please save your card first or cancel the form!');
      return;
    }
    
    try {
      //payload hazırla
      const orderPayload = {
        address_id: selectedShipping.id,
        order_date: new Date().toISOString(),
        card_no: parseInt(selectedCard.card_no.replace(/\s/g, '')),
        card_name: selectedCard.name_on_card,
        card_expire_month: parseInt(selectedCard.expire_month),
        card_expire_year: parseInt(selectedCard.expire_year),
        card_ccv: parseInt(savedCardCvv),
        price: parseFloat(grandTotal.toFixed(2)),
        products: selectedItems.map(item => ({
          product_id: item.product.id,
          count: item.count,
          detail: item.product.description || ''
        }))
      };
      
      
      const response = await dispatch(createOrderAction(orderPayload));
      
      
      toast.success('Order placed successfully!');
      
      //sepeti temizle
      dispatch({ type: CLEAR_CART });
      localStorage.removeItem('shoppingCart');
      
      //2 saniye sonra ana sayfaya yönlendir
      setTimeout(() => {
        history.push('/');
        window.scrollTo(0, 0); 
      }, 2000);
      
    } catch (error) {
      console.error('Order error:', error);
      toast.error(error.response?.data?.message || 'Order failed. Please try again.');
    }
  };
  
  //loading durumu
  if (fetchState === 'FETCHING') {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#23A6F0]"></div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
      
      {/*sol adres Özeti */}
      <div className="lg:col-span-2 space-y-6">
        
        {/*adres bilgileri  */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#252B42]">Address Information</h3>
            <button
              onClick={onBack}
              className="text-sm text-[#23A6F0] font-semibold hover:underline"
            >
              Change
            </button>
          </div>
          
          {selectedShipping && (
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold text-[#252B42] mb-2">{selectedShipping.title}</p>
              <p className="text-sm text-gray-600">
                {selectedShipping.name} {selectedShipping.surname}
              </p>
              <p className="text-sm text-gray-600">{selectedShipping.phone}</p>
              <p className="text-sm text-gray-600">
                {selectedShipping.neighborhood}, {selectedShipping.district}, {selectedShipping.city}
              </p>
            </div>
          )}
        </div>
        
       
        <div>
          <h2 className="text-xl font-bold text-[#252B42] mb-2">Payment Options</h2>
          <p className="text-sm text-gray-600">
            You can safely make your payment with Bank/Credit Card or Shopping Credit.
          </p>
        </div>
        
        {/*kart ile öde section */}
        <div className="bg-white border-2 border-[#23A6F0] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <input
              type="radio"
              id="payByCard"
              name="paymentMethod"
              checked={true}
              readOnly
              className="w-4 h-4 text-[#23A6F0]"
            />
            <label htmlFor="payByCard" className="font-bold text-[#252B42]">
              Pay by Card
            </label>
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            You have chosen to pay by card. You can safely make your payment using Bank or Credit Card.
          </p>
          
          {/*kayıtlı kartlar veya boş durum */}
          {cards.length === 0 && !showCardForm ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">You don't have any saved cards yet</p>
              <button
                onClick={() => setShowCardForm(true)}
                className="px-6 py-3 bg-[#23A6F0] text-white font-semibold rounded hover:bg-[#1a8ad1] transition-colors"
              >
                Add Your First Card
              </button>
            </div>
          ) : (
            <>
              {/*kayıtlı kartlar */}
              {cards.length > 0 && !showCardForm && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#252B42]">Card Information</h3>
                  
                  <div className="space-y-3">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedCard?.id === card.id
                            ? 'border-[#23A6F0] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleSelectCard(card)}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="selectedCard"
                            checked={selectedCard?.id === card.id}
                            onChange={() => handleSelectCard(card)}
                            className="w-4 h-4 text-[#23A6F0]"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-[#252B42]">
                                  {getCardBrand(card.card_no)}
                                </span>
                                <span className="text-sm text-gray-600">
                                  {maskCardNumber(card.card_no)}
                                </span>
                              </div>
                              
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(card);
                                  }}
                                  className="text-[#23A6F0] text-sm hover:underline"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(card.id);
                                  }}
                                  className="text-red-500 text-sm hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 mt-1">
                              {card.name_on_card} - {card.expire_month}/{card.expire_year}
                            </p>
                            
                           
                            {selectedCard?.id === card.id && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <label className="block text-sm font-semibold text-[#252B42] mb-2">
                                  🔒 Enter CVV for security <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={savedCardCvv}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    const value = e.target.value.replace(/\D/g, '');
                                    if (value.length <= 3) {
                                      setSavedCardCvv(value);
                                    }
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="123"
                                  maxLength="3"
                                  className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setShowCardForm(true)}
                    className="text-sm text-[#23A6F0] font-semibold hover:underline"
                  >
                    Pay with Another Card
                  </button>
                </div>
              )}
              
              {/*yeni kart formu */}
              {showCardForm && (
                <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#252B42]">
                      {editingCard ? 'Edit Card' : 'Add New Card'}
                    </h3>
                    <button
                      onClick={resetForm}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/*kart numarası */}
                    <div>
                      <label className="block text-sm font-semibold text-[#252B42] mb-2">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="card_no"
                        value={formData.card_no}
                        onChange={handleInputChange}
                        placeholder="1234567890123456"
                        required
                        maxLength="16"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                      />
                    </div>
                    
                    {/*kart sahibinin adı */}
                    <div>
                      <label className="block text-sm font-semibold text-[#252B42] mb-2">
                        Cardholder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name_on_card"
                        value={formData.name_on_card}
                        onChange={handleInputChange}
                        placeholder="Cardholder Name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                      />
                    </div>
                    
                    {/*son kullanma tarihi-CVV */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#252B42] mb-2">
                          Month <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="expire_month"
                          value={formData.expire_month}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month.toString().padStart(2, '0')}>
                              {month.toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-[#252B42] mb-2">
                          Year <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="expire_year"
                          value={formData.expire_year}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 20 }, (_, i) => 2026 + i).map(year => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-[#252B42] mb-2">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                          maxLength="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                        />
                      </div>
                    </div>
                    
                    {/*butonlar */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-[#23A6F0] text-white font-semibold rounded hover:bg-[#1a8ad1] transition-colors"
                      >
                        {editingCard ? 'Update' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 py-3 bg-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
          
          {/*taksit seçenekleri */}
          {cards.length > 0 && !showCardForm && (
            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-[#252B42] mb-4">Installment Options</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select the installment option suitable for your card
              </p>
              
              <div className="space-y-3">
                {/*tek çekim */}
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    installment === 1
                      ? 'border-[#23A6F0] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setInstallment(1)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="installment"
                        checked={installment === 1}
                        onChange={() => setInstallment(1)}
                        className="w-4 h-4 text-[#23A6F0]"
                      />
                      <span className="font-semibold text-[#252B42]">Single Payment</span>
                    </div>
                    <span className="text-lg font-bold text-[#23A6F0]">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                {/*taksitli ödeme seçenekleri */}
                {[2, 3, 6, 9, 12].map((months) => {
                  const monthlyPayment = grandTotal / months;
                  return (
                    <div
                      key={months}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        installment === months
                          ? 'border-[#23A6F0] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setInstallment(months)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="installment"
                            checked={installment === months}
                            onChange={() => setInstallment(months)}
                            className="w-4 h-4 text-[#23A6F0]"
                          />
                          <div>
                            <span className="font-semibold text-[#252B42]">
                              {months} Installments
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              Monthly ${monthlyPayment.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-[#252B42]">
                          ${grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/*3D secure */}
          <div className="flex items-center gap-2 mt-6 p-4 bg-gray-50 rounded">
            <input
              type="checkbox"
              id="use3DSecure"
              checked={use3DSecure}
              onChange={(e) => setUse3DSecure(e.target.checked)}
              className="w-4 h-4 text-[#23A6F0]"
            />
            <label htmlFor="use3DSecure" className="text-sm text-gray-700 cursor-pointer">
              🛡️ I want to pay with 3D Secure
            </label>
          </div>
        </div>
      </div>
      
      {/*sağ kısım sipariş özeti */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
          <h2 className="text-xl font-bold text-[#252B42] mb-6 pb-4 border-b border-gray-200">
            Order Summary
          </h2>
          
          <div className="space-y-4">
            {/*ürün toplamı */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Product Total:</span>
              <span className="text-sm font-semibold text-[#252B42]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            
            {/*kargo */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Shipping Total:</span>
              <span className="text-sm font-semibold text-[#252B42]">
                ${SHIPPING_COST.toFixed(2)}
              </span>
            </div>
            
            {/*kargo bedava */}
            {subtotal >= FREE_SHIPPING_THRESHOLD && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Free Shipping over $150:</span>
                <span className="text-sm font-semibold text-red-500 line-through">
                  -${SHIPPING_COST.toFixed(2)}
                </span>
              </div>
            )}
            
            {/*toplam */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#252B42]">Total:</span>
                <span className="text-2xl font-bold text-[#23A6F0]">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
            
            
            <button
              onClick={handleCompletePayment}
              disabled={orderLoading}
              className={
                "w-full py-3 text-white font-bold rounded transition-all flex items-center justify-center gap-2 " +
                (orderLoading 
                  ? 'bg-[#BDBDBD] cursor-not-allowed' 
                  : 'bg-[#23A6F0] hover:bg-[#1a8ad1]')
              }
            >
              {orderLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Make Payment</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PaymentStep;