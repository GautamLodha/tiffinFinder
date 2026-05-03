import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Plus,
  Star,
  Edit2,
  Menu,
  X,
  Trash2,
  LogOut,
  User,
  Settings,
  ChefHat,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProviderDashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchMyServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/provider/services",
          {
            headers: {
              token: `${token}`,
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setServices(response.data.services);
        setLoading(false);
      } catch (err) {
        console.error("Unauthorized or server error");
        setLoading(false);
      }
    };
    fetchMyServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/provider/service/${id}`, {
        headers: { token: `${token}` },
      });
      setServices(services.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F1] font-modern pb-12">
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-[#FDF8F1]/80 backdrop-blur-md border-b border-orange-100 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex justify-center items-center gap-0.5 " >
            <div className="w-10 h-10 bg-[#A63C13] rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
            <ChefHat className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-heading font-black text-gray-900 tracking-tighter transition-colors">
            ChefStream
          </h1>
          </div>
          {/* Right Side Actions */}
          <div className="flex  items-center gap-3 md:gap-5">
            <button className="p-2 text-gray-500 hover:bg-orange-100 rounded-full transition-colors relative"></button>

            {/* Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 hover:bg-white hover:shadow-sm rounded-full transition-all border border-transparent hover:border-orange-100"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-200 border-2 border-white overflow-hidden shadow-sm">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=ChefMario&backgroundColor=ffdfbf"
                    alt="Chef Avatar"
                  />
                </div>
                <div className="hidden md:block text-left mr-2">
                  <p className="text-xs font-bold text-gray-800 leading-none">
                    Chef Admin
                  </p>
                  <p className="text-[10px] text-orange-600 font-medium">
                    Provider
                  </p>
                </div>
              </button>

              {/* Dropdown Card */}
              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl shadow-orange-200/50 border border-orange-50 z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
                    {/* <div className="px-4 py-4 bg-orange-50/50">
                      <p className="text-sm font-bold text-gray-800">Chef Dashboard</p>
  
                    </div> */}
                    <div className="p-1">
                      {/* <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 rounded-xl transition-colors">
                        <User size={16} /> Profile Settings
                      </button> */}
                      {/* <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 rounded-xl transition-colors">
                        <Settings size={16} /> Kitchen Config
                      </button> */}
                      <div className="h-px bg-orange-50 my-1 mx-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-bold"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 tracking-tight">
              Service <span className="text-[#A63C13]">Management</span>
            </h1>
            <p className="text-gray-500 mt-2 text-base md:text-lg max-w-lg">
              Manage your culinary listings and track your kitchen's growth.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white px-5 py-2.5 rounded-2xl border border-orange-100 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest font-black text-gray-400 block mb-0.5">
                Total Services
              </span>
              <span className="text-xl font-heading font-bold text-[#A63C13]">
                {services.length}
              </span>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-orange-100 border-t-[#A63C13] rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400 font-medium animate-pulse">
              Entering the kitchen...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item) => (
              <ServiceCard
                key={item._id}
                {...item}
                onDelete={() => handleDelete(item._id)}
                onEdit={() => navigate(`/provider/edit-service/${item._id}`)}
              />
            ))}

            {/* Create Service Trigger */}
            <div
              onClick={() => navigate("/provider/createService")}
              className="group border-2 border-dashed border-orange-200 bg-white/50 rounded-[40px] flex flex-col items-center justify-center p-10 text-center hover:border-[#A63C13] hover:bg-orange-50/50 transition-all cursor-pointer min-h-[360px]"
            >
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-50 group-hover:bg-[#A63C13] group-hover:text-white transition-all transform group-hover:scale-110 group-hover:rotate-90">
                <Plus size={32} />
              </div>
              <h4 className="font-heading font-bold text-xl mt-6 mb-2">
                New Listing
              </h4>
              <p className="text-sm text-gray-400 max-w-[180px]">
                Add a new meal plan or catering service
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const ServiceCard = ({
  _id,
  title,
  pricePerMonth,
  rating,
  image,
  mealType,
  onDelete,
  onEdit,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/service/${_id}`)}
      className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-200/40 border border-orange-50 flex flex-col transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={image}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={title}
        />

        {/* Floating Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-gray-600 hover:bg-blue-600 hover:text-white shadow-lg transition-all"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-gray-600 hover:bg-red-600 hover:text-white shadow-lg transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star size={12} className="fill-orange-400 text-orange-400" />
          <span className="text-xs font-bold text-gray-800">
            {rating || "New"}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-heading font-bold text-xl text-gray-900 line-clamp-1 leading-tight">
            {title}
          </h3>
        </div>

        <div className="mt-auto pt-6 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
              Monthly
            </span>
            <span className="text-2xl font-heading font-black text-[#A63C13]">
              ₹{pricePerMonth}
            </span>
          </div>
          <span className="text-[10px] font-black bg-orange-100 text-[#A63C13] px-3 py-1.5 rounded-xl uppercase tracking-tighter">
            {mealType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
