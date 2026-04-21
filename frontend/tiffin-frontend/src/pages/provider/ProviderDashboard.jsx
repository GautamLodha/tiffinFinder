import React, { useState } from 'react';
import { Search, Bell, Plus, Star, Edit2, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProviderDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const services = [
    { id: 1, title: "Royal Maharashtrian Lunch", price: "12.50", rating: "4.9", reviews: "124", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe", tags: ["VEG", "HOT"] },
    { id: 2, title: "North Indian Comfort Box", price: "14.00", rating: "4.7", reviews: "89", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", tags: ["BEST SELLER"] },
    { id: 5, title: "Hyderabadi Spice Pot", price: "16.50", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8", isDraft: true }
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F1] font-sans pb-12">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#FDF8F1]/80 backdrop-blur-md border-b border-orange-100 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 lg:gap-8">
            <span className="text-[#A63C13] font-bold text-lg md:text-xl">Tiffin Finder</span>
            <div className="hidden md:relative md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input className="bg-[#EFE9E1] rounded-full py-2 pl-10 pr-4 text-sm w-48 lg:w-64 focus:outline-none" placeholder="Search..." />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6 text-sm font-medium text-gray-500">
              <button className="text-[#A63C13] border-b-2 border-[#A63C13] pb-1">Dashboard</button>
              <button className="hover:text-[#A63C13]">Earnings</button>
              <button className="hover:text-[#A63C13]">Menu</button>
            </div>
            <div className="flex items-center gap-4 border-l pl-8 border-orange-200">
              <Bell className="w-5 h-5 text-gray-600" />
              <button className="bg-[#D35400] text-white px-5 py-2 rounded-full text-sm font-bold shadow-md hover:bg-[#A63C13] transition">Create New</button>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sheldon" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-orange-100 p-4 space-y-4 shadow-xl">
            <button className="block w-full text-left font-bold text-[#A63C13]">Dashboard</button>
            <button className="block w-full text-left text-gray-600">Earnings</button>
            <button className="block w-full text-left text-gray-600">Menu</button>
            <button className="w-full bg-[#D35400] text-white py-3 rounded-xl font-bold">Create New Service</button>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Service Management</h1>
            <p className="text-gray-500 text-sm md:text-base max-w-lg">Optimize listings and track your culinary success.</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-gray-200 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-widest">Active: 12</span>
            <span className="bg-gray-200 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-widest">Drafts: 3</span>
          </div>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((item) => (
            <ServiceCard key={item.id} {...item} />
          ))}
          
          {/* Responsive Add Card */}
          <div className="border-2 border-dashed border-gray-300 rounded-[32px] md:rounded-[40px] flex flex-col items-center justify-center p-8 md:p-12 text-center hover:border-[#A63C13] group transition-all cursor-pointer min-h-[300px]">
            <div onClick={()=>navigate('createService')} className="bg-gray-200 p-5 rounded-full mb-4 group-hover:bg-[#A63C13] group-hover:text-white transition-colors">
              <Plus size={28} />
            </div>
            <h4 className="font-bold text-lg mb-1">Launch a New Service</h4>
            <p className="text-xs text-gray-400">Share a new recipe with the community</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const ServiceCard = ({ title, price, rating, reviews, image, tags, isDraft }) => (
  <div className={`bg-white rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm border border-orange-50 flex flex-col ${isDraft ? 'opacity-75' : ''}`}>
    <div className="relative aspect-[16/10] sm:aspect-square lg:aspect-[16/10]">
      <img src={image} className="w-full h-full object-cover" alt={title} />
      {isDraft && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[2px]">
          <span className="bg-white px-4 py-1 rounded-full text-[10px] font-black uppercase">Draft</span>
        </div>
      )}
      {!isDraft && rating && (
        <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
          <Star size={10} className="fill-orange-400 text-orange-400" />
          <span className="text-[10px] font-bold">{rating} ({reviews})</span>
        </div>
      )}
    </div>
    
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{title}</h3>
        <Edit2 size={14} className="text-gray-400 shrink-0 mt-1" />
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <span className="text-xl font-black text-[#A63C13]">${price}</span>
          <Edit2 size={10} className="text-gray-300" />
        </div>
        <div className="flex gap-1">
          {isDraft ? (
            <button className="text-[10px] font-black uppercase text-[#A63C13]">Finish</button>
          ) : (
            tags?.map(t => <span key={t} className="text-[9px] font-black bg-orange-50 text-[#A63C13] px-2 py-0.5 rounded-md">{t}</span>)
          )}
        </div>
      </div>
    </div>
  </div>
);

export default ProviderDashboard;