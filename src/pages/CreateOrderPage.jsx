import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import AddressStep from '../components/AddressStep';
import PaymentStep from '../components/PaymentStep';

const CreateOrderPage = () => {
  const [currentStep, setCurrentStep] = useState(1); 
  
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
            <Link to="/cart" className="text-[#23A6F0] hover:text-[#1a8ad1]">
              Cart
            </Link>
            <ChevronRight size={16} className="text-[#BDBDBD]" />
            <span className="text-[#BDBDBD]">Create Order</span>
          </div>
        </div>
      </section>

      {/*main content */}
      <section className="w-full py-6 md:py-8 lg:py-12 bg-white">
        <div className="container mx-auto px-2 sm:px-3 md:px-8">
          
          {/*title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#252B42] mb-6 md:mb-8">
            Create Order
          </h1>

          {/*steps indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-[#23A6F0]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep === 1 ? 'bg-[#23A6F0] text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="font-semibold">Address Information</span>
            </div>
            
            <div className="w-16 h-0.5 bg-gray-300"></div>
            
            <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-[#23A6F0]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep === 2 ? 'bg-[#23A6F0] text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-semibold">Payment Options</span>
            </div>
          </div>

          {/*step content */}
          {currentStep === 1 && <AddressStep onNext={() => setCurrentStep(2)} />}
          {currentStep === 2 && (
            <PaymentStep 
              onBack={() => setCurrentStep(1)}
              onComplete={() => alert('Order completed! (API integration will be done in step 22)')}
            />
          )}

        </div>
      </section>
    </div>
  );
};

export default CreateOrderPage;