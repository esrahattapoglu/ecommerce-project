import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signupAction } from '../store/actions/authActions';
import { fetchRolesAction } from '../store/actions/clientActions';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateStoreName,
  validatePhone,
  validateTaxNo,
  validateIBAN
} from '../utils/validation';
import { ROLES } from '../utils/constants';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  
  //role translations - API returns turkish display english
  const roleTranslations = {
    'Yönetici': 'Admin',
    'Müşteri': 'Customer',
    'Mağaza': 'Store'
  };
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      role_id: ROLES.CUSTOMER 
    }
  });
  
  const roles = useSelector(state => state.client.roles);
  const selectedRole = watch('role_id');
  const password = watch('password');
  
  //load roles on page mount
  useEffect(() => {
    dispatch(fetchRolesAction());
  }, [dispatch]);
  
  //form submit
  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      //format data based on role
      let formData;
      
      if (selectedRole === ROLES.STORE) {
        formData = {
          name: data.name,
          email: data.email,
          password: data.password,
          role_id: data.role_id,
          store: {
            name: data.store_name,
            phone: data.store_phone,
            tax_no: data.store_tax_no,
            bank_account: data.store_bank_account
          }
        };
      } else {
        //customer or admin
        formData = {
          name: data.name,
          email: data.email,
          password: data.password,
          role_id: data.role_id
        };
      }
      
      //call API
      const response = await dispatch(signupAction(formData));
      
   
      toast.success('You need to click link in email to activate your account!');
      
      //redirect after 2 seconds
      setTimeout(() => {
        history.goBack();
      }, 2000);
      
    } catch (error) {
     
      toast.error(error.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-white">
      
      {/*container */}
      <div className="container mx-auto px-8 lg:px-12 py-12 lg:py-20">
        
        {/*form wrapper */}
        <div className="max-w-2xl mx-auto">
          
          {/*title */}
          <div className="text-center mb-10">
            <h1 className="text-[#252B42] font-bold text-4xl mb-4">
              Sign Up
            </h1>
            <p className="text-[#737373] text-base">
              Create your account to get started
            </p>
          </div>
          
          {/*form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            {/*name */}
            <div className="flex flex-col gap-2">
              <label className="text-[#252B42] font-bold text-sm">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className={
                  "w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:border-[#23A6F0] " +
                  (errors.name ? 'border-red-500' : 'border-[#E6E6E6]')
                }
                {...register('name', { validate: validateName })}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">{errors.name.message}</span>
              )}
            </div>
            
            {/*email */}
            <div className="flex flex-col gap-2">
              <label className="text-[#252B42] font-bold text-sm">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={
                  "w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:border-[#23A6F0] " +
                  (errors.email ? 'border-red-500' : 'border-[#E6E6E6]')
                }
                {...register('email', { validate: validateEmail })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email.message}</span>
              )}
            </div>
            
            {/*password */}
            <div className="flex flex-col gap-2">
              <label className="text-[#252B42] font-bold text-sm">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className={
                  "w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:border-[#23A6F0] " +
                  (errors.password ? 'border-red-500' : 'border-[#E6E6E6]')
                }
                {...register('password', { validate: validatePassword })}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password.message}</span>
              )}
              <p className="text-[#737373] text-xs">
                Must be at least 8 characters including uppercase, lowercase, number and special character
              </p>
            </div>
            
            {/*confirm password */}
            <div className="flex flex-col gap-2">
              <label className="text-[#252B42] font-bold text-sm">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className={
                  "w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:border-[#23A6F0] " +
                  (errors.confirmPassword ? 'border-red-500' : 'border-[#E6E6E6]')
                }
                {...register('confirmPassword', { 
                  validate: (value) => validatePasswordMatch(password, value)
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>
              )}
            </div>
            
            {/*role */}
            <div className="flex flex-col gap-2">
              <label className="text-[#252B42] font-bold text-sm">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-[#E6E6E6] rounded-md text-sm focus:outline-none focus:border-[#23A6F0]"
                {...register('role_id', { required: 'Role selection is required' })}
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {roleTranslations[role.name] || role.name}
                  </option>
                ))}
              </select>
              {errors.role_id && (
                <span className="text-red-500 text-xs">{errors.role_id.message}</span>
              )}
            </div>
            
            {/*store fields - conditional */}
            {selectedRole === ROLES.STORE && (
              <div className="flex flex-col gap-6 p-6 bg-[#F9F9F9] rounded-md border border-[#E6E6E6]">
                <h3 className="text-[#252B42] font-bold text-lg">
                  Store Information
                </h3>
                
                {/*store name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#252B42] font-bold text-sm">
                    Store Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter store name"
                    className={
                      "w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:border-[#23A6F0] bg-white " +
                      (errors.store_name ? 'border-red-500' : 'border-[#E6E6E6]')
                    }
                    {...register('store_name', { validate: validateStoreName })}
                  />
                  {errors.store_name && (
                    <span className="text-red-500 text-xs">{errors.store_name.message}</span>
                  )}
                </div>
                
                {/*store phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#252B42] font-bold text-sm">
                    Store Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="05551234567"
                    className={
                      "w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:border-[#23A6F0] bg-white " +
                      (errors.store_phone ? 'border-red-500' : 'border-[#E6E6E6]')
                    }
                    {...register('store_phone', { validate: validatePhone })}
                  />
                  {errors.store_phone && (
                    <span className="text-red-500 text-xs">{errors.store_phone.message}</span>
                  )}
                </div>
                
                {/*store tax ID */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#252B42] font-bold text-sm">
                    Store Tax ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="T1234V567890"
                    className={
                      "w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:border-[#23A6F0] bg-white " +
                      (errors.store_tax_no ? 'border-red-500' : 'border-[#E6E6E6]')
                    }
                    {...register('store_tax_no', { validate: validateTaxNo })}
                  />
                  {errors.store_tax_no && (
                    <span className="text-red-500 text-xs">{errors.store_tax_no.message}</span>
                  )}
                  <p className="text-[#737373] text-xs">
                    Format: TXXXXVXXXXXX (X: number)
                  </p>
                </div>
                
                {/*IBAN */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#252B42] font-bold text-sm">
                    Store Bank Account (IBAN) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="TR330006100519786457841326"
                    className={
                      "w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:border-[#23A6F0] bg-white " +
                      (errors.store_bank_account ? 'border-red-500' : 'border-[#E6E6E6]')
                    }
                    {...register('store_bank_account', { validate: validateIBAN })}
                  />
                  {errors.store_bank_account && (
                    <span className="text-red-500 text-xs">{errors.store_bank_account.message}</span>
                  )}
                </div>
              </div>
            )}
            
            {/*submit button */}
            <button
              type="submit"
              disabled={loading}
              className={
                "w-full py-4 text-white font-bold text-sm rounded-md transition-all flex items-center justify-center gap-2 " +
                (loading 
                  ? 'bg-[#BDBDBD] cursor-not-allowed' 
                  : 'bg-[#23A6F0] hover:bg-[#1a8ad1]')
              }
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <span>SIGN UP</span>
              )}
            </button>
            
          </form>
          
        </div>
        
      </div>
      
    </div>
  );
};

export default SignUpPage;