import { useEffect, useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Phone, MapPin, ChevronLeft, Sparkles } from "lucide-react";
import axios from "axios";
import hero2 from '../../assets/hero2.png'
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../api/axios";

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phonePrimary: "",
    phoneSecondary: "",
    address: "",
    role: role || "user"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, role };
      const response = await API.post("/api/auth/signup", payload);
      const { token, user } = response.data;
      localStorage.setItem("token", token);

      if (user.role === "student") {
        navigate("/user");
      } else {
        navigate("/provider");
      }
      alert("Account created successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-modern min-h-screen bg-[#FDF8F1] flex flex-col items-center justify-center px-4 py-12">
      {/* Back to Home */}
      <div className="w-full max-w-[480px] mb-6">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-[#A63C13] transition-colors font-bold text-xs uppercase tracking-widest group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Return to Entry
        </button>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[480px] bg-white rounded-[48px] shadow-2xl shadow-orange-200/40 border border-orange-50 overflow-hidden">
        
        {/* Header Image Section (Clean, no gradient) */}
        <div className="h-40 overflow-hidden border-b border-orange-50">
          <img
            src={hero2}
            alt="kitchen"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-10">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-orange-500" />
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">
                {role === 'provider' ? 'Chef Registration' : 'Foodie Registration'}
              </span>
            </div>
            <h2 className="text-3xl font-heading font-black text-gray-900 tracking-tight leading-none">
              Create Account
            </h2>
            <p className="text-sm text-gray-400 mt-2 font-medium">
              Start your journey into home-cooked excellence.
            </p>
          </header>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Username/Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#A63C13] transition-colors" size={18} />
                <input
                  name="name"
                  required
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. HearthChef"
                  className="w-full py-4 pl-12 pr-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-orange-100 focus:bg-white outline-none transition-all font-medium text-gray-800"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#A63C13] transition-colors" size={18} />
                <input
                  name="email"
                  required
                  onChange={handleChange}
                  type="email"
                  placeholder="chef@stream.com"
                  className="w-full py-4 pl-12 pr-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-orange-100 focus:bg-white outline-none transition-all font-medium text-gray-800"
                />
              </div>
            </div>

            {/* Conditional Provider Fields */}
            {role === "provider" && (
              <div className="space-y-5 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#A63C13] transition-colors" size={18} />
                    <input
                      name="phonePrimary"
                      required
                      onChange={handleChange}
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full py-4 pl-12 pr-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-orange-100 focus:bg-white outline-none transition-all font-medium text-gray-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kitchen Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#A63C13] transition-colors" size={18} />
                    <textarea
                      name="address"
                      required
                      onChange={handleChange}
                      placeholder="Enter full pickup/kitchen address"
                      className="w-full p-4 pl-12 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-orange-100 focus:bg-white outline-none transition-all font-medium text-gray-800 h-24 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#A63C13] transition-colors" size={18} />
                <input
                  name="password"
                  required
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
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

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#A63C13] text-white py-5 rounded-[24px] font-heading font-black text-lg shadow-xl shadow-orange-200 hover:bg-gray-900 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 mt-4"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Join ChefStream"
              )}
            </button>
          </form>

          <p className="text-sm text-center mt-8 text-gray-500 font-medium">
            Already a member?{" "}
            <button 
              onClick={() => navigate(`/login?role=${user.role === "student" ? "student" : "provider"}`)} 
              className="text-[#A63C13] font-black hover:underline"
            >
              Log In
            </button>
          </p>
        </div>
      </div>

      {/* Footer info */}
      <p className="text-center mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        2026 Crafted for Quality & Trust
      </p>
    </div>
  );
}