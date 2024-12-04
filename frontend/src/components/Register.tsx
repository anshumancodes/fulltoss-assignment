import React, { useState } from 'react';
import { 
  LockKeyhole, 
  Mail, 
  User, 
  MapPin 
} from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  
  const [registrationStatus, setRegistrationStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({
    success: null,
    message: ''
  });
  
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: '',
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
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setRegistrationStatus({
        success: false,
        message: 'Passwords do not match'
      });
      return;
    }

    try {
      const response = await axios.post('https://fulltoss-assignment.onrender.com/api/user/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);

      // Success scenario
      setRegistrationStatus({
        success: true,
        message: 'Registered successfully!'
      });

      // Optional: Redirect after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      // Error scenario
      let errorMessage = 'Failed to register';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || 'Failed to register';
      }

      setRegistrationStatus({
        success: false,
        message: errorMessage
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden w-full bg-black text-white flex items-center justify-center">
      {/* Status Popup */}
      {registrationStatus.success !== null && (
        <div 
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg transition-all duration-300 ${
            registrationStatus.success 
              ? 'bg-green-600' 
              : 'bg-red-600'
          }`}
        >
          {registrationStatus.message}
        </div>
      )}

      {/* Rest of the existing component remains the same */}
      <div className="absolute inset-0 -z-0 opacity-90 w-full min-h-screen">
        <img
          src="/SPACE.png"
          className="object-cover w-full h-full"
          alt="Space background"
        />
      </div>
      
      <div className=" w-[90%] md:w-[60%] lg:w-1/2 bg-[#1a1a1a] p-8 z-10 relative">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 tracking-wide text-white/90">
            Fulltoss
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center mb-4 text-white/80">
              Create Account
            </h2>

            {/* Full Name Field */}
            <div className="relative">
              <label htmlFor="fullName" className="block text-sm font-medium text-white/70 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>

            {/* Similar changes for other input fields: add value and onChange */}
            {/* Username Field */}
            <div className="relative">
              <label htmlFor="username" className="block text-sm font-medium text-white/70 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>

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

            {/* City Field */}
            <div className="relative">
              <label htmlFor="city" className="block text-sm font-medium text-white/70 mb-2">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
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
                  placeholder="Create a strong password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/70 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Register
            </button>

            {/* Login Link */}
            <div className="text-center mt-4">
              <span className="text-white/60 text-sm">
                Already have an account? {' '}
                <Link to="/login" className="text-white/80 hover:text-white underline">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Existing gradient background elements remain the same */}
      {/* ... */}
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

export default Register;