import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, SlidersHorizontal, Star, Home, Compass, ClipboardList, User, ShoppingBag, LogOut, ChefHat, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const UserHome = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all"); // New State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Categories match your Mongoose Enum
  const categories = [
    { id: 'all', label: 'All Kitchens' },
    { id: 'veg', label: 'Pure Veg' },
    { id: 'non-veg', label: 'Non-Veg' },
    { id: 'both', label: 'Mixed' }
  ];

  useEffect(() => {
    fetchServices();
  }, [selectedCategory]); 

  const fetchServices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = (selectedCategory === "all" && !searchQuery) 
        ? '/api/user' 
        : `/api/user/search?query=${searchQuery}&category=${selectedCategory}`;

      const response = await API.get(url, {
        headers: { token: token }
      });
      setServices(response.data.services);
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Debounce or immediate search logic
    try {
      const token = localStorage.getItem('token');
      const response = await API.get(`/api/user/search?query=${value}&category=${selectedCategory}`, {
        headers: { token: token }
      });
      setServices(response.data.services);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FDF8F1] font-modern pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- PREMIUM HEADER --- */}
        <header className="p-4 md:p-8 flex justify-between items-center sticky top-0 bg-[#FDF8F1]/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-[#A63C13] rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
                <ChefHat className="text-white" size={24} />
             </div>
             <h1 className="text-2xl font-heading font-black text-gray-900 tracking-tighter transition-colors">
               ChefStream
             </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform active:scale-95"
              >
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl shadow-orange-200/50 border border-orange-50 z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-4 bg-orange-50/50">
                      <p className="text-sm font-bold text-gray-800">Foodie Account</p>
                    </div>
                    <div className="p-1">
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
        </header>

        {/* --- HERO SECTION --- */}
        <section className="px-4 md:px-8 py-6 md:py-10">
          <h2 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-900 leading-[1.1] tracking-tighter">
            Find your <br />
            <span className="italic text-orange-800 font-brand font-light">daily hearth</span>
          </h2>
        </section>

        {/* --- SEARCH & FILTERS --- */}
        <div className="px-4 md:px-8 py-4 sticky top-16 md:top-24 z-30 space-y-4">
          <div className="relative flex-grow group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors w-5 h-5" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search tiffin providers, home chefs..." 
              className="w-full bg-white py-5 pl-14 pr-14 rounded-[24px] shadow-sm border border-orange-50 focus:ring-4 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all text-lg font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(""); fetchServices(); }}
                className="absolute right-16 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-orange-600"
              >
                <X size={18} />
              </button>
            )}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-orange-50 rounded-xl text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
               <SlidersHorizontal size={18} />
            </div>
          </div>

          {/* Category Pill Filter - Styled to match UI */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id 
                  ? 'bg-orange-700 text-white border-orange-700 shadow-lg shadow-orange-200' 
                  : 'bg-white text-gray-500 border-orange-50 hover:border-orange-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- LISTINGS GRID --- */}
        <main className="px-4 md:px-8 py-10">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-heading font-bold text-gray-800">
              {searchQuery ? `Results for "${searchQuery}"` : `${selectedCategory !== 'all' ? categories.find(c=>c.id === selectedCategory).label : 'Nearby'} Kitchens`}
            </h3>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-4 py-1.5 rounded-full uppercase tracking-widest">
              {services.length} kitchens found
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
               <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
               <p className="mt-4 text-gray-400 font-medium">Loading delicious meals...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {services.map((item) => (
                <TiffinCard 
                  key={item._id}
                  id={item._id}
                  onClick={() => navigate(`/service/${item._id}`)}
                  image={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                  title={item.title}
                  rating={item.rating || "New"}
                  desc={item.description}
                  tag={item.mealType || "HOMEMADE"}
                />
              ))}
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-[40px] p-8 text-white flex flex-col justify-center relative overflow-hidden min-h-[300px] shadow-xl shadow-orange-200 group cursor-pointer">
                 <h4 className="text-3xl font-heading font-bold mb-3 relative z-10 leading-tight">Chef's Choice Selection</h4>
                 <p className="text-orange-100 text-sm mb-6 relative z-10">Hand-picked home kitchens with top safety ratings.</p>
                 <button className="bg-white text-orange-700 w-fit px-8 py-3 rounded-2xl text-sm font-black uppercase z-10 transform transition-transform group-hover:scale-110 active:scale-95 shadow-lg">
                    Explore
                 </button>
                 <div className="absolute right-[-40px] bottom-[-40px] opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                    <ShoppingBag size={240} />
                 </div>
              </div>
            </div>
          )}

          {!loading && services.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-orange-200">
                <p className="text-gray-400 font-medium text-lg">No providers found matching these filters.</p>
                <button onClick={() => {setSearchQuery(""); setSelectedCategory("all");}} className="mt-4 text-orange-600 font-bold underline">Clear all filters</button>
            </div>
          )}
        </main>
      </div>

      {/* --- MOBILE NAVIGATION --- */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/90 backdrop-blur-xl border border-orange-50 flex justify-around items-center py-4 px-6 rounded-[32px] shadow-2xl z-50 lg:hidden">
        <NavIcon icon={<Home size={22}/>} label="Home" active />
        <NavIcon icon={<Compass size={22}/>} label="Explore" />
        <NavIcon icon={<ClipboardList size={22}/>} label="Orders" />
        <NavIcon icon={<User size={22}/>} label="Profile" />
      </nav>
    </div>
  );
};

// ... TiffinCard and NavIcon remain the same

const TiffinCard = ({ id, image, title, rating, desc, tag, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-200/40 transition-all duration-500 group cursor-pointer border border-transparent hover:border-orange-50 flex flex-col h-full"
  >
    <div className="aspect-[4/3] relative overflow-hidden">
      <img 
        src={image} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        alt={title} 
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-white">
        <Star size={14} className="fill-orange-500 text-orange-500" />
        <span className="text-xs font-black text-gray-800">{rating}</span>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-heading font-bold text-xl text-gray-900 line-clamp-1 group-hover:text-orange-700 transition-colors">{title}</h4>
      </div>
      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-6">{desc}</p>
      
      <div className="mt-auto flex justify-between items-center">
        <span className="text-[10px] font-black text-orange-700 tracking-[0.2em] uppercase bg-orange-50 px-3 py-1.5 rounded-xl">
           {tag}
        </span>
        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-700 opacity-0 group-hover:opacity-100 transition-opacity">
           <Compass size={16} />
        </div>
      </div>
    </div>
  </div>
);

const NavIcon = ({ icon, label, active }) => (
  <div className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${active ? 'text-orange-700 scale-110' : 'text-gray-400 hover:text-gray-600'}`}>
    <div className={`${active ? 'bg-orange-50 p-2 rounded-xl transition-all' : ''}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-black tracking-tighter ${active ? 'opacity-100' : 'opacity-0'}`}>
      {label}
    </span>
  </div>
);

export default UserHome;