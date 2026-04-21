import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import heroImg from "../../assets/hero2.png"; // adjust path
import Navbar from "../../components/Navbar";
import { useSearchParams } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams()
  console.log(searchParams.get('role'));
  
  return (
    <div className="bg-[#f6efe6]" >
        <div className="min-h-screen w-fit bg-[#f6efe6] px-4 py-4 flex justify-center mx-auto flex-col">


      {/* Image Card */}
      <div className="rounded-3xl overflow-hidden shadow-md">
        <div className="relative">
          <img
            src={heroImg}
            alt="food"
            className="w-full h-56 object-cover object-[center_65%]"
          />
        </div>
      </div>

      {/* Form */}
      <div className="mt-6">

        {/* Email */}
        <label className="text-sm text-gray-600">
          Email or Username
        </label>
        <input
          type="text"
          placeholder="Enter your email"
          className="w-full mt-2 p-4 rounded-xl bg-[#e9e1d7] outline-none"
        />

        {/* Password */}
        <label className="text-sm text-gray-600 mt-4 block">
          Password
        </label>

        <div className="flex items-center bg-[#e9e1d7] rounded-xl mt-2 px-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-4 bg-transparent outline-none"
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff className="text-gray-500 w-5 h-5" />
            ) : (
              <Eye className="text-gray-500 w-5 h-5" />
            )}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-right mt-2">
          {/* <span className="text-orange-700 text-sm cursor-pointer">
            Forgot Password?
          </span> */}
        </div>

        {/* Login Button */}
        <button className="w-full mt-5 bg-gradient-to-r from-[#a63300] to-[#ff7a45] text-white py-4 rounded-2xl font-semibold shadow-md">
          Log In
        </button>

        

      </div>

      {/* Bottom Nav (Optional UI like design) */}
      {/* <div className="mt-auto flex justify-around bg-white rounded-full py-4 shadow-lg">
        <span className="text-gray-500 text-sm">Home</span>
        <span className="text-gray-500 text-sm">LogOut</span>
        <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
          changeMode
        </span>
      </div> */}

      <Navbar></Navbar>
    </div>
    </div>
    
  );
}