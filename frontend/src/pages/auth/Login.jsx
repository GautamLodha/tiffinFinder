import { Eye, EyeOff, Lock, Mail, ChevronLeft } from "lucide-react";
import { useState } from "react";
import heroImg from "../../assets/hero2.png"; 
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      console.log(token);
      

      // Redirect based on role
      if (user.role === "student" || user.role === "customer") {
        navigate("/user");
      } else {
        navigate("/provider");
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-modern min-h-screen bg-[#FDF8F1] flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-[440px]">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-[#A63C13] transition-colors mb-8 font-bold text-sm group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-[48px] shadow-2xl shadow-orange-200/50 border border-orange-50 overflow-hidden">
          
          {/* Hero Image Section */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={heroImg}
              alt="Delicious food"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-8">
               <h2 className="text-2xl font-heading font-black text-gray-900 tracking-tight">Welcome Back</h2>
               <p className="text-xs font-bold text-[#A63C13] uppercase tracking-[0.2em]">ChefStream Login</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-10 space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Email or Username</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#A63C13] transition-colors" size={18} />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="text"
                  placeholder="name@example.com"
                  className="w-full py-4 pl-12 pr-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-orange-100 focus:bg-white outline-none transition-all font-medium text-gray-800"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#A63C13] transition-colors" size={18} />
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full py-4 pl-12 pr-12 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-orange-100 focus:bg-white outline-none transition-all font-medium text-gray-800"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button className="text-xs font-bold text-[#A63C13] hover:underline">Forgot Password?</button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#A63C13] text-white py-5 rounded-[24px] font-heading font-black text-lg shadow-xl shadow-orange-200 hover:bg-gray-900 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>

            {/* Signup Redirect */}
            <p className="text-center text-sm text-gray-500 font-medium pt-2">
              Don't have an account?{" "}
              <button 
                onClick={() => navigate("/signup")}
                className="text-[#A63C13] font-black hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Secure Login Powered by ChefStream
        </p>
      </div>
    </div>
  );
}