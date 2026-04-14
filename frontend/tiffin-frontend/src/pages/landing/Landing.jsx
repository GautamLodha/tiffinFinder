import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/hero2.png";
import chef from "../../assets/chef.png";
import food from "../../assets/food.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6efe6] flex justify-center">
      {/* Wrapper */}
      <div className="w-full max-w-md lg:max-w-6xl px-4 py-6">
        {/* 🔝 Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-orange-900">Tiffin Finder</h1>
          <button
            onClick={() => navigate("/login")}
            className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm"
          >
            Login
          </button>
        </div>

        {/* 🟠 HERO SECTION */}
        <div className="grid lg:grid-cols-2 gap-6 items-center mb-10">
          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 leading-tight">
              Home-Cooked <br />
              <span className="text-orange-600">Goodness,</span> Delivered
            </h2>

            <p className="text-sm text-gray-600 mt-3">
              Connect with local home chefs and enjoy authentic meals made with
              love.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-5 bg-gradient-to-r from-[#a63300] to-[#ff7a45] text-white px-6 py-3 rounded-xl shadow"
            >
              Search Tiffins
            </button>
          </div>

          {/* Image */}
          <div className="rounded-3xl overflow-hidden shadow-md">
            <img src={heroImg} className="w-full h-64 object-cover" />
          </div>
        </div>

        {/* 🍽️ USER CHOICE */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {/* Customer */}
          <div className="bg-white p-5 rounded-2xl shadow-md">
            <h3 className="font-semibold text-gray-800">I want to eat</h3>
            <p className="text-sm text-gray-600 mt-2">
              Browse local home chefs and enjoy fresh meals daily.
            </p>
            <button
              onClick={() => navigate("/signup?role=customer")}
              className="mt-4 text-orange-600 text-sm"
            >
              Explore Menus →
            </button>
          </div>

          {/* Provider */}
          <div className="bg-white p-5 rounded-2xl shadow-md">
            <h3 className="font-semibold text-gray-800">I want to cook</h3>
            <p className="text-sm text-gray-600 mt-2">
              Turn your cooking into income and reach more people.
            </p>
            <button
              onClick={() => navigate("/signup?role=provider")}
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Start Cooking
            </button>
          </div>
        </div>

        {/* ⭐ FEATURES */}
        <div className="text-center mb-10">
          <h2 className="text-xl font-semibold text-gray-800">
            Why Tiffin Finder?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We connect food lovers with home chefs.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {["🍲 Healthy", "✨ Authentic", "💰 Affordable"].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 🚀 PROVIDER CTA */}
        <div className="bg-white  mx-auto w-lg p-6 rounded-2xl shadow-md mb-10">
          <h2 className="text-xl font-semibold text-gray-800">
            Turn Your Kitchen into a Business
          </h2>

          <div className="mt-4  flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {/* Left Side: Image Container */}
            <div className="flex gap-3 shrink-0">
              <img
                src={chef}
                alt="Chef"
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-2xl shadow-sm"
              />
              <img
                src={food}
                alt="Food"
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-2xl shadow-sm"
              />
            </div>

            {/* Right Side: Text Content */}
            <div className="text-sm text-gray-600 space-y-3 flex-grow">
              <p className="font-medium flex items-center gap-2">
                <span className="text-lg">1️⃣</span> List your meals
              </p>
              <p className="font-medium flex items-center gap-2">
                <span className="text-lg">2️⃣</span> Set pricing
              </p>
              <p className="font-medium flex items-center gap-2">
                <span className="text-lg">3️⃣</span> Start earning
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/signup?role=provider")}
            className="mt-5 bg-gradient-to-r from-[#a63300] to-[#ff7a45] text-white px-6 py-3 rounded-xl"
          >
            Become a Tiffin Chef
          </button>
        </div>

        {/* 🔻 FOOTER */}
        <div className="text-center text-sm text-gray-500 mt-10">
          <p>© 2026 Tiffin Finder</p>
        </div>
      </div>
    </div>
  );
}
