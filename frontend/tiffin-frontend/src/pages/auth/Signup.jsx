import { useEffect, useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

import hero2 from '../../assets/hero2.png'
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const role = searchParams.get("role")
    console.log(role);
    useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);
    
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6efe6]  flex flex-col items-center justify-center px-4">

      {/* Image Card */}
      <div className="bg-white rounded-3xl shadow-md p-3 w-full max-w-sm">
        <div className="relative h-50 rounded-2xl overflow-hidden">
          <img
            src={hero2}
            alt="kitchen"
            className=" w-full h-full object-cover object-bottom   "
          />
        </div>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm mt-6">

        <h2 className="text-xl font-semibold text-gray-800">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Start your journey into home-cooked excellence
        </p>

        {/* Username */}
        <div className="mb-3">
          <label className="text-xs text-gray-600">Username</label>
          <div className="flex items-center bg-[#efe7dd] rounded-lg mt-1 px-3">
            <User className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="e.g. HearthChef"
              className="w-full p-3 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="text-xs text-gray-600">Email address</label>
          <div className="flex items-center bg-[#efe7dd] rounded-lg mt-1 px-3">
            <Mail className="w-4 h-4 text-gray-500" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {role === "provider" && (
  <>
    {/* Primary Phone */}
    <div className="mb-3">
      <label className="text-xs text-gray-600">
        Primary Contact Number *
      </label>
      <input
        type="tel"
        placeholder="Enter primary number"
        className="w-full mt-1 p-3 rounded-lg bg-[#efe7dd] outline-none text-sm"
      />
    </div>

    {/* Secondary Phone */}
    <div className="mb-3">
      <label className="text-xs text-gray-600">
        Secondary Contact Number (Optional)
      </label>
      <input
        type="tel"
        placeholder="Enter secondary number"
        className="w-full mt-1 p-3 rounded-lg bg-[#efe7dd] outline-none text-sm"
      />
    </div>

    {/* Address */}
    <div className="mb-3">
      <label className="text-xs text-gray-600">
        Address *
      </label>
      <textarea
        placeholder="Enter your full address"
        className="w-full mt-1 p-3 rounded-lg bg-[#efe7dd] outline-none text-sm"
      />
    </div>
  </>
)}

        {/* Password */}
        <div className="mb-3">
          <label className="text-xs text-gray-600">Password</label>
          <div className="flex items-center bg-[#efe7dd] rounded-lg mt-1 px-3">
            <Lock className="w-4 h-4 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              className="w-full p-3 bg-transparent outline-none text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-gray-500" />
              ) : (
                <Eye className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Terms */}
        {/* <p className="text-[10px] text-gray-500 mb-4">
          By signing up, you agree to our{" "}
          <span className="text-orange-600">Terms of Service</span> and{" "}
          <span className="text-orange-600">Privacy Policy</span>
        </p> */}

        {/* Button */}
        <button className="w-full bg-gradient-to-r from-[#a63300] to-[#ff7a45] text-white py-3 rounded-xl font-medium shadow-md">
          Sign Up
        </button>

        {/* Login */}
        <p className="text-xs text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span className="text-orange-600 cursor-pointer">Login</span>
        </p>

      </div>
    </div>
  );
}