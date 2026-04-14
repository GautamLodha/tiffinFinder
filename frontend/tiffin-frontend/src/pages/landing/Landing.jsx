import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/hero2.png" // adjust path

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6efe6] px-4 py-6 flex flex-col items-center">

      {/* 🔝 Hero Section */}
      <div className="w-full max-w-md">
        <div className="rounded-3xl overflow-hidden shadow-md relative">
          <img
            src={heroImg}
            alt="food"
            className="w-full h-60 object-cover object-[center_95%]"
          />
          <div className="absolute bottom-4 left-4 text-white">
            {/* <h1 className="text-2xl font-semibold leading-tight">
              Find Homemade <br /> Meals Near You 🍱
            </h1>
            <p className="text-sm opacity-90">
              Fresh. Affordable. Delivered Daily.
            </p> */}
          </div>
        </div>
      </div>

      {/* 🔥 Role Selection */}
      <div className="w-full max-w-md mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          How do you want to continue?
        </h2>

        <div className="flex flex-col gap-3">

          {/* Customer */}
          <button
            onClick={() => navigate("/signup?role=customer")}
            className="flex items-center gap-3 bg-white shadow-md rounded-2xl p-4 hover:scale-[1.02] transition"
          >
            <span className="text-2xl">👤</span>
            <div className="text-left">
              <p className="font-medium text-gray-800">
                I'm a Customer
              </p>
              <p className="text-xs text-gray-500">
                Find and order home-cooked meals
              </p>
            </div>
          </button>

          {/* Provider */}
          <button
            onClick={() => navigate("/signup?role=provider")}
            className="flex items-center gap-3 bg-white shadow-md rounded-2xl p-4 hover:scale-[1.02] transition"
          >
            <span className="text-2xl">🍳</span>
            <div className="text-left">
              <p className="font-medium text-gray-800">
                I'm a Provider
              </p>
              <p className="text-xs text-gray-500">
                Sell your homemade meals
              </p>
            </div>
          </button>

        </div>
      </div>

      {/* ⚡ Features */}
      <div className="w-full max-w-md mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          What You Get ⭐
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {[
           "🍱 Discover Homemade Meals",
            "📍 Find Local Tiffin Providers",
            "🤝 Connect Directly with Chefs",
            "💬 No Middleman, Full Transparency",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-3 text-sm text-gray-700 text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 🧭 How It Works */}
      <div className="w-full max-w-md mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          How It Works
        </h2>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
            <p>1️⃣ Explore nearby home chefs</p>
            <p>2️⃣ Connect and discuss your needs</p>
            <p>3️⃣ Enjoy home-cooked meals your way</p>
        </div>
      </div>

      {/* 🔻 Bottom CTA */}
      <div className="w-full max-w-md mt-auto pt-6">
        <button
          onClick={() => navigate("/signup")}
          className="w-full bg-gradient-to-r from-[#a63300] to-[#ff7a45] text-white py-4 rounded-2xl font-semibold shadow-md"
        >
          Get Started
        </button>

        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>

    </div>
  );
}