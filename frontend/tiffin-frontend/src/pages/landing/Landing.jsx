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
          <div className="flex justify-center gap-2">
            <button
              onClick={() => navigate("/login?role=customer")}
              className="bg-orange-500 font-medium text-white px-4 py-1 rounded-full text-sm"
            >
              Login as a customer
            </button>
            <button
              onClick={() => navigate("/login?role=provider")}
              className="bg-orange-500 font-medium text-white px-4 py-1 rounded-full text-sm"
            >
              Login as a provider
            </button>
          </div>
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
        <div className="bg-white mx-auto w-full max-w-lg p-5 sm:p-8 rounded-3xl shadow-lg mb-10 transition-all">
          {/* Header: Centered on mobile, left-aligned on small screens+ */}
          <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left leading-tight">
            Turn Your Kitchen into a Business
          </h2>

          <div className="mt-6 flex flex-col sm:flex-row gap-6 items-center">
            {/* Images Container: Side by side, centered on mobile */}
            <div className="flex gap-3 shrink-0">
              <img
                src={chef}
                alt="Chef"
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl shadow-md border-2 border-white"
              />
              <img
                src={food}
                alt="Food"
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl shadow-md border-2 border-white"
              />
            </div>

            {/* Text Content: Centered icons/text on mobile for better balance */}
            <div className="text-gray-600 space-y-4 flex-grow w-full">
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg sm:bg-transparent sm:p-0">
                <span className="text-xl">1️⃣</span>
                <p className="font-semibold text-gray-700">List your meals</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg sm:bg-transparent sm:p-0">
                <span className="text-xl">2️⃣</span>
                <p className="font-semibold text-gray-700">Set pricing</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg sm:bg-transparent sm:p-0">
                <span className="text-xl">3️⃣</span>
                <p className="font-semibold text-gray-700">Start earning</p>
              </div>
            </div>
          </div>

          {/* Button: Full width on mobile, auto width on small screens+ */}
          <button
            onClick={() => navigate("/signup?role=provider")}
            className="mt-8 w-full sm:w-auto bg-gradient-to-r from-[#a63300] to-[#ff7a45] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
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
