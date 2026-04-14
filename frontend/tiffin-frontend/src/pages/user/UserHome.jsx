import React from 'react';
import { Search, SlidersHorizontal, MapPin, Clock, Star, Home, Compass, ClipboardList, User, ShoppingBag } from 'lucide-react';

const UserHome = () => {
  return (
    <div className="min-h-screen bg-[#FDF8F1] pb-24">
      {/* Container wraps the content to prevent it from hitting screen edges on desktop */}
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="p-4 md:p-8 flex justify-between items-center">
          <Search className="text-orange-900 w-6 h-6 md:hidden" />
          <h1 className="text-xl md:text-2xl font-bold text-orange-900">Tiffin Finder</h1>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-white px-4 py-2 rounded-full shadow-sm items-center gap-2">
              <Search size={18} className="text-gray-400" />
              <input placeholder="Quick search..." className="outline-none text-sm" />
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="px-4 md:px-8 py-4">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Find your <br />
            <span className="italic text-orange-800 font-serif">daily hearth</span>
          </h2>
        </section>

        {/* Search & Filters Grouped for Desktop */}
        <div className="md:flex md:items-center md:gap-4 px-4 md:px-8 py-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search tiffin providers..." 
              className="w-full bg-white py-4 pl-12 pr-12 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all"
            />
            <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer" />
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {['Nearby', 'Popular', 'North Indian', 'Vegan'].map((filter, i) => (
              <button key={i} className={`${i === 0 ? 'bg-[#A63C13] text-white' : 'bg-white text-gray-600'} px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap shadow-sm`}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid */}
        <main className="px-4 md:px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Nearby Tiffin Providers</h3>
            <button className="text-orange-800 text-sm font-semibold hover:underline">View all</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <TiffinCard 
              image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              title="Aroma Home Tiffins"
              rating="4.8"
              desc="Authentic North Indian thali with handcrafted phulkas."
              tag="FAST"
            />
            {/* Repeat cards or map through data */}
            <div className="bg-[#FF844B] rounded-[32px] p-8 text-white flex flex-col justify-center relative overflow-hidden min-h-[250px] sm:col-span-2 lg:col-span-1">
               <h4 className="text-2xl font-bold mb-2 relative z-10">Chef's Choice</h4>
               <p className="text-sm opacity-90 mb-6 relative z-10">Hand-picked providers.</p>
               <button className="bg-white text-[#FF844B] w-fit px-6 py-2 rounded-full text-xs font-bold uppercase z-10">Explore</button>
               <div className="absolute right-[-20px] bottom-[-20px] opacity-20 transform rotate-12">
                  <ShoppingBag size={180} />
               </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Action Button (Only Mobile/Tablet) */}
      <button className="lg:hidden fixed bottom-24 right-6 bg-[#A63C13] p-4 rounded-2xl shadow-2xl text-white z-50">
        <ShoppingBag size={24} />
      </button>

      {/* Bottom Nav (Hidden on Large Desktop) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-orange-100 flex justify-around items-center py-4 z-50 lg:hidden">
        <NavIcon icon={<Home size={22}/>} label="Home" active />
        <NavIcon icon={<Compass size={22}/>} label="Explore" />
        <NavIcon icon={<ClipboardList size={22}/>} label="Orders" />
        <NavIcon icon={<User size={22}/>} label="Profile" />
      </nav>
    </div>
  );
};

const TiffinCard = ({ image, title, rating, desc, tag }) => (
  <div className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
    <div className="aspect-[4/3] relative overflow-hidden">
      <img src={image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={title} />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
        <Star size={14} className="fill-orange-400 text-orange-400" />
        <span className="text-xs font-bold">{rating}</span>
      </div>
    </div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-gray-800">{title}</h4>
        <span className="text-[10px] font-black text-orange-700 tracking-widest">⚡ {tag}</span>
      </div>
      <p className="text-gray-500 text-xs line-clamp-2">{desc}</p>
    </div>
  </div>
);

const NavIcon = ({ icon, label, active }) => (
  <div className={`flex flex-col items-center gap-1 ${active ? 'text-[#A63C13]' : 'text-gray-400'}`}>
    {icon}
    <span className="text-[10px] font-bold">{label}</span>
  </div>
);

export default UserHome;