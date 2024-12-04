import React, { useState } from 'react';
import { LockKeyhole, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  
  const [loginStatus, setLoginStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({
    success: null,
    message: ''
  });

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://fulltoss-assignment.onrender.com/api/user/login', formData);

      // Destructure the response based on the provided structure
      const { message, data } = response.data;

      // Successful login
      setLoginStatus({
        success: true,
        message: message
      });

      // Update user context with user information
      setUser({
        name: data.user.fullname,
        team: data.user.team
      });

      // Redirect after successful login
      setTimeout(() => {
        navigate('/dashboard'); // Adjust the redirect path as needed
      }, 1500);

    } catch (error) {
      // Error scenario
      let errorMessage = 'Login failed';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || 'Login failed';
      }

      setLoginStatus({
        success: false,
        message: errorMessage
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden w-full bg-black text-white flex items-center justify-center">
      {/* Login Status Popup */}
      {loginStatus.success !== null && (
        <div 
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg transition-all duration-300 ${
            loginStatus.success 
              ? 'bg-green-600' 
              : 'bg-red-600'
          }`}
        >
          {loginStatus.message}
        </div>
      )}

      {/* Background Image */}
      <div className="absolute inset-0 -z-0 opacity-90 w-full min-h-screen">
        <img
          src="/SPACE.png"
          className="object-cover w-full h-full"
          alt="Space background"
        />
      </div>
      
      <div className="md:w-[60%] lg:w-1/3 bg-[#1a1a1a] p-8 z-10 relative w-[90%]">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 tracking-wide text-white/90">
            Fulltoss
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <h2 className="text-2xl font-semibold text-center mb-4 text-white/80">
              Login
            </h2>

            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Login
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <a href="#" className="text-white/60 hover:text-white/80 text-sm transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Register Link */}
            <div className="text-center mt-4">
              <span className="text-white/60 text-sm">
                Don't have an account? {' '}
                <Link to="/register" className="text-white/80 hover:text-white underline">
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Gradient Overlay Elements */}
      <div className="absolute -top-[700px] -left-[100px]">
        <img src="/Gradient3.svg" className="relative" alt="Gradient overlay" />
      </div>
      <div className="absolute opacity-80 md:opacity-100 -top-[700px] -right-[1000px] sm:-top-[500px] sm:-right-[800px]">
        <img src="/gradient1.svg" className="relative" alt="Gradient overlay" />
      </div>
      <div className="absolute -bottom-[800px] -left-[600px] sm:-bottom-[700px] sm:-left-[500px]">
        <img src="/gradient.svg" className="relative" alt="Bottom gradient overlay" />
      </div>
      <div className="absolute -bottom-[350px] left-[450px]">
        <img src="/Gradient2.svg" className="relative" alt="Bottom gradient overlay" />
      </div>
    </div>
  );
};

export default Login;