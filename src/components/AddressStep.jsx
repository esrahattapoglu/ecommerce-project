import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  fetchAddressesAction,
  addAddressAction,
  updateAddressAction,
  deleteAddressAction,
  setShippingAddress,
  setBillingAddress
} from '../store/actions/addressActions';

const AddressStep = ({ onNext }) => {
  const dispatch = useDispatch();
  
  //reduxtan adresleri çek
  const addresses = useSelector(state => state.address.addresses);
  const selectedShipping = useSelector(state => state.address.selectedShippingAddress);
  const selectedBilling = useSelector(state => state.address.selectedBillingAddress);
  const fetchState = useSelector(state => state.address.fetchState);
  const cart = useSelector(state => state.shopping.cart);
  
  //local state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [sameAsShipping, setSameAsShipping] = useState(false);
  
  //form state
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    address: ''
  });
  
  //türkiyenin 81 ili
  const cities = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya',
    'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik',
    'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum',
    'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
    'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul',
    'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kilis',
    'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa',
    'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize',
    'Sakarya', 'Samsun', 'Şanlıurfa', 'Siirt', 'Sinop', 'Şırnak', 'Sivas', 'Tekirdağ',
    'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
  ];
  
  //component mount olunca adresleri çek
  useEffect(() => {
    dispatch(fetchAddressesAction());
  }, [dispatch]);
  
  //sepet hesaplamaları
  const selectedItems = cart.filter(item => item.checked);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  const SHIPPING_COST = 29.99;
  const FREE_SHIPPING_THRESHOLD = 150;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = subtotal + shippingCost;
  
  //form input değişikliği
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  
  //form submit (ekle veya güncelle)
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    if (editingAddress) {
      
      const updatedAddressData = {
        id: editingAddress.id,
        ...formData
      };
      
      await dispatch(updateAddressAction(updatedAddressData));
      toast.success('Address updated!');
      
      //eğer düzenlenen adres şu anda seçili adres ise seçili adresi de güncelle
      if (selectedShipping?.id === editingAddress.id) {
        dispatch(setShippingAddress(updatedAddressData));
      }
      if (selectedBilling?.id === editingAddress.id) {
        dispatch(setBillingAddress(updatedAddressData));
      }
    } else {
      
      await dispatch(addAddressAction(formData));
      toast.success('Address added!');
    }
    
    //formu sıfırla
    resetForm();
    
  } catch (error) {
    toast.error('An error occurred!');
  }
};
  
  //formu sıfırla
  const resetForm = () => {
    setFormData({
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: '',
      district: '',
      neighborhood: '',
      address: ''
    });
    setShowAddressForm(false);
    setEditingAddress(null);
  };
  
  //adres düzenle
  const handleEdit = (address) => {
    setFormData({
      title: address.title,
      name: address.name,
      surname: address.surname,
      phone: address.phone,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood,
      address: address.address || ''
    });
    setEditingAddress(address);
    setShowAddressForm(true);
  };
  
  //adres sil
  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await dispatch(deleteAddressAction(addressId));
        toast.success('Address deleted!');
      } catch (error) {
        toast.error('Delete operation failed!');
      }
    }
  };
  
  //teslimat adresi seç
  const handleSelectShipping = (address) => {
    dispatch(setShippingAddress(address));
    if (sameAsShipping) {
      dispatch(setBillingAddress(address));
    }
  };
  
  //fatura adresi seç
  const handleSelectBilling = (address) => {
    dispatch(setBillingAddress(address));
  };
  
  //"Faturamı aynı adrese gönder" checkboxı
  const handleSameAsShipping = (checked) => {
    setSameAsShipping(checked);
    if (checked && selectedShipping) {
      dispatch(setBillingAddress(selectedShipping));
    } else {
      dispatch(setBillingAddress(null));
    }
  };
  
  //devam et butonu
  const handleContinue = () => {
    if (!selectedShipping) {
      toast.error('Please select a shipping address!');
      return;
    }
    if (!selectedBilling) {
      toast.error('Please select a billing address!');
      return;
    }
    onNext();
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
      
      {/* Sol: adres Seçimi */}
      <div className="lg:col-span-2 space-y-6">
        
        {/*adres listesi veya boş durum */}
        {addresses.length === 0 && !showAddressForm ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">You don't have any saved addresses yet</p>
            <button
              onClick={() => setShowAddressForm(true)}
              className="px-6 py-3 bg-[#23A6F0] text-white font-semibold rounded hover:bg-[#1a8ad1] transition-colors"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          <>
            {/*adres listesi */}
            {addresses.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#252B42]">My Saved Addresses</h2>
                  {!showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#23A6F0] text-white text-sm font-semibold rounded hover:bg-[#1a8ad1] transition-colors"
                    >
                      <Plus size={16} />
                      Add New Address
                    </button>
                  )}
                </div>
                
                {/*teslimat adresi başlığı */}
                <h3 className="text-lg font-semibold text-[#252B42] mt-6">1. Shipping Address</h3>
                
                {/*teslimat adresleri */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedShipping?.id === address.id
                          ? 'border-[#23A6F0] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleSelectShipping(address)}
                    >
                      {/*radiobutton */}
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={selectedShipping?.id === address.id}
                          onChange={() => handleSelectShipping(address)}
                          className="mt-1 w-4 h-4 text-[#23A6F0]"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-[#252B42]">{address.title}</h4>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(address);
                                }}
                                className="text-[#23A6F0] hover:text-[#1a8ad1]"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(address.id);
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-1">
                            {address.name} {address.surname}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            {address.phone}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.neighborhood}, {address.district}, {address.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/*fatura adresi checkbox */}
                <div className="flex items-center gap-2 mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="sameAsShipping"
                    checked={sameAsShipping}
                    onChange={(e) => handleSameAsShipping(e.target.checked)}
                    className="w-4 h-4 text-[#23A6F0]"
                  />
                  <label htmlFor="sameAsShipping" className="text-sm font-medium text-gray-700 cursor-pointer">
                    ✓ Send My Invoice to the Same Address
                  </label>
                </div>
                
                {/* fatura adresi (eğer farklıysa) */}
                {!sameAsShipping && (
                  <>
                    <h3 className="text-lg font-semibold text-[#252B42] mt-6">2. Billing Address</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div
                          key={`billing-${address.id}`}
                          className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedBilling?.id === address.id
                              ? 'border-[#23A6F0] bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleSelectBilling(address)}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="billing"
                              checked={selectedBilling?.id === address.id}
                              onChange={() => handleSelectBilling(address)}
                              className="mt-1 w-4 h-4 text-[#23A6F0]"
                            />
                            
                            <div className="flex-1">
                              <h4 className="font-bold text-[#252B42] mb-2">{address.title}</h4>
                              <p className="text-sm text-gray-600 mb-1">
                                {address.name} {address.surname}
                              </p>
                              <p className="text-sm text-gray-600 mb-1">
                                {address.phone}
                              </p>
                              <p className="text-sm text-gray-600">
                                {address.neighborhood}, {address.district}, {address.city}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
            {/*yeni adres formu */}
            {showAddressForm && (
              <div className="bg-gray-50 border-2 border-[#23A6F0] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#252B42]">
                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/*adres başlığı */}
                  <div>
                    <label className="block text-sm font-semibold text-[#252B42] mb-2">
                      Address Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Home, Work, etc."
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                    />
                  </div>
                  
                  {/*ad ve soyad */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#252B42] mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#252B42] mb-2">
                        Surname <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                      />
                    </div>
                  </div>
                  
                  {/*telefon */}
                  <div>
                    <label className="block text-sm font-semibold text-[#252B42] mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="05XXXXXXXXX"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                    />
                  </div>
                  
                  {/*şehir */}
                  <div>
                    <label className="block text-sm font-semibold text-[#252B42] mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city.toLowerCase()}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/*ilçe */}
                  <div>
                    <label className="block text-sm font-semibold text-[#252B42] mb-2">
                      District <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                    />
                  </div>
                  
                  {/*mahalle */}
                  <div>
                    <label className="block text-sm font-semibold text-[#252B42] mb-2">
                      Neighborhood <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                    />
                  </div>
                  
                  {/*detaylı adres */}
                  <div>
                    <label className="block text-sm font-semibold text-[#252B42] mb-2">
                      Address Details (Street, Building No, etc.)
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Street, avenue, building no, apartment no"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                    ></textarea>
                  </div>
                  
                  {/*butonlar */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-[#23A6F0] text-white font-semibold rounded hover:bg-[#1a8ad1] transition-colors"
                    >
                      {editingAddress ? 'Update' : 'Save'}
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
      </div>
      
      {/*sağ:sipariş özeti */}
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
            
            {/*devam et butonu */}
            <button
              onClick={handleContinue}
              className="w-full py-3 bg-[#23A6F0] text-white font-bold rounded hover:bg-[#1a8ad1] transition-colors mt-6"
            >
              Continue
            </button>
            
            {/*uyarı mesajları */}
            {!selectedShipping && (
              <p className="text-xs text-center text-red-500 mt-2">
                Please select a shipping address
              </p>
            )}
            {!selectedBilling && !sameAsShipping && (
              <p className="text-xs text-center text-red-500 mt-2">
                Please select a billing address
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressStep;