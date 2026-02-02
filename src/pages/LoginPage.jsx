import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginAction } from '../store/actions/authActions';
import { validateEmail } from '../utils/validation';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // Form submit
  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      // login actionı çağır
      const response = await dispatch(loginAction({
        email: data.email,
        password: data.password
      }));
      
      // Remember me kontrolü
      if (data.rememberMe) {
        localStorage.setItem('token', response.token);
      } else {
        localStorage.removeItem('token');
      }
      
      // Başarı mesajı
      toast.success('Login successful!');
      
      // 1 saniye sonra redirect
      setTimeout(() => {
        history.goBack();
      }, 1000);
      
    } catch (error) {
      // Hata mesajı
      toast.error(error.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-white">
      
      {/* Container */}
      <div className="container mx-auto px-8 lg:px-12 py-12 lg:py-20">
        
        {/* Form wrapper */}
        <div className="max-w-md mx-auto">
          
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-[#252B42] font-bold text-4xl mb-4">
              Login
            </h1>
            <p className="text-[#737373] text-base">
              Welcome back! Please login to your account
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            {/* Email */}
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
            
            {/* Password */}
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
                {...register('password', { 
                  required: 'Password is required'
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password.message}</span>
              )}
            </div>
            
            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                {...register('rememberMe')}
                className="w-4 h-4 text-[#23A6F0] border-[#E6E6E6] rounded focus:ring-[#23A6F0]"
              />
              <label htmlFor="rememberMe" className="text-[#737373] text-sm cursor-pointer">
                Remember me
              </label>
            </div>
            
            {/* Submit button */}
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
                  <span>Logging in...</span>
                </>
              ) : (
                <span>LOGIN</span>
              )}
            </button>
            
            {/* Sign up link */}
            <div className="text-center mt-4">
              <p className="text-[#737373] text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => history.push('/signup')}
                  className="text-[#23A6F0] font-bold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
            
          </form>
          
        </div>
        
      </div>
      
    </div>
  );
};

export default LoginPage;