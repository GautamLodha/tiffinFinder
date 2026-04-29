import React, { useState } from 'react';
import { ArrowLeft, Camera, Rocket, CheckCircle2, Leaf, Beef, UtensilsCrossed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeoapifyContext, GeoapifyGeocoderAutocomplete } from '@geoapify/react-geocoder-autocomplete';
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

const CreateService = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: 'Home cooked healthy meals',
    pricePerMonth: '',
    mealType: 'veg', // Default matches your schema
    address: '',
    lng: null,
    lat: null
  });

  const myApiKey = "2d1ae75c44144e1a98b7250958e20d72";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onPlaceSelect = (value) => {
    if (value) {
      const { properties, geometry } = value;
      setFormData({
        ...formData,
        address: properties.formatted,
        lng: geometry.coordinates[0],
        lat: geometry.coordinates[1]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.lng || !formData.lat) return alert("Please select a valid address.");
    if (!image) return alert("Please upload a showcase image.");

    setLoading(true);
    const data = new FormData();
    
    // Append fields to match your schema expectation
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('pricePerMonth', formData.pricePerMonth);
    data.append('mealType', formData.mealType);
    data.append('address', formData.address);
    // Passing coordinates for the 'location' object in schema
    data.append('lng', formData.lng);
    data.append('lat', formData.lat);
    data.append('image', image);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/provider/service', data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          token: `${token}`
        }
      });
      alert('Kitchen Live! Service Published.');
      navigate('/provider');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F1] font-modern pb-16">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FDF8F1]/80 backdrop-blur-md border-b border-orange-100 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-orange-50 rounded-2xl transition-all">
            <ArrowLeft size={24} className="text-[#A63C13]" />
          </button>
          <h1 className="font-heading font-bold text-lg text-gray-800">Launch Your Service</h1>
          <div className="w-10 h-10 bg-[#A63C13] rounded-xl flex items-center justify-center">
            <span className="text-white font-black">C</span>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 mt-10">
        <section className="mb-10">
          <span className="text-[#A63C13] text-[10px] font-black uppercase tracking-[0.3em]">Kitchen Onboarding</span>
          <h2 className="text-4xl font-heading font-extrabold text-gray-900 mt-2 leading-tight">
            Share your <span className="text-[#A63C13]">culinary</span> magic.
          </h2>
        </section>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Image Upload */}
          <div className="space-y-3">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Service Showcase</label>
            <label className="relative aspect-video w-full rounded-[40px] bg-white border-2 border-dashed border-orange-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-[#A63C13] hover:bg-orange-50/30 transition-all group shadow-sm">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center group-hover:scale-110 transition-transform">
                  <div className="bg-white p-4 rounded-3xl text-[#A63C13] inline-block mb-3 shadow-sm group-hover:bg-[#A63C13] group-hover:text-white transition-all">
                    <Camera size={28} />
                  </div>
                  <p className="text-sm font-bold text-gray-700">Upload Cover Photo</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase">JPG, PNG up to 5MB</p>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Kitchen Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g., Mom's Healthy Tiffin"
              className="w-full p-5 rounded-3xl bg-white border border-orange-100 outline-none focus:ring-4 focus:ring-orange-100 transition-all font-bold text-gray-800 shadow-sm"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* Meal Type Category Selection */}
          <div className="space-y-3">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Dietary Category</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'veg', label: 'Pure Veg', icon: <Leaf size={18} />, color: 'green' },
                { id: 'non-veg', label: 'Non-Veg', icon: <Beef size={18} />, color: 'red' },
                { id: 'both', label: 'Both', icon: <UtensilsCrossed size={18} />, color: 'orange' }
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({...formData, mealType: type.id})}
                  className={`flex flex-col items-center gap-2 p-4 rounded-3xl border-2 transition-all ${
                    formData.mealType === type.id 
                    ? 'border-[#A63C13] bg-orange-50 text-[#A63C13]' 
                    : 'border-orange-50 bg-white text-gray-400 hover:border-orange-200'
                  }`}
                >
                  {type.icon}
                  <span className="text-[10px] font-black uppercase tracking-tighter">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Geoapify Address */}
          <div className="space-y-3">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Exact Location</label>
            <div className="geo-custom-style">
              <GeoapifyContext apiKey={myApiKey}>
                <GeoapifyGeocoderAutocomplete
                  placeholder="Find your kitchen on the map..."
                  placeSelect={onPlaceSelect}
                />
              </GeoapifyContext>
            </div>
            {formData.lat && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-2xl text-[10px] font-black uppercase w-fit">
                <CheckCircle2 size={12} /> Verified Location
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="space-y-3">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Subscription Price</label>
            <div className="flex items-center bg-white border border-orange-100 rounded-3xl p-5 focus-within:ring-4 focus-within:ring-orange-100 transition-all shadow-sm">
              <span className="text-[#A63C13] font-black mr-3 text-2xl">₹</span>
              <input 
                type="number" 
                required
                placeholder="0.00"
                className="bg-transparent border-none outline-none w-full font-heading font-black text-2xl text-gray-800"
                value={formData.pricePerMonth}
                onChange={(e) => setFormData({...formData, pricePerMonth: e.target.value})}
              />
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">/Month</span>
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-6 bg-[#A63C13] text-white font-heading font-black rounded-3xl flex items-center justify-center gap-3 shadow-xl shadow-orange-200 active:scale-[0.98] transition-all disabled:opacity-50 uppercase tracking-widest text-sm"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Preparing Kitchen...</span>
              </div>
            ) : (
              <>
                <Rocket size={20} />
                Publish Service
              </>
            )}
          </button>
        </form>
      </main>

      {/* Custom Styles for Geoapify to match your theme */}
      <style>{`
        .geo-custom-style .geoapify-autocomplete-input {
          width: 100%;
          padding: 1.25rem 1.25rem 1.25rem 3rem !important;
          border-radius: 1.5rem !important;
          background-color: white !important;
          border: 1px solid #ffedd5 !important;
          font-weight: 700 !important;
          font-family: inherit !important;
        }
        .geoapify-autocomplete-input:focus {
          outline: none !important;
          box-shadow: 0 0 0 4px #ffedd5 !important;
        }
      `}</style>
    </div>
  );
};

export default CreateService;