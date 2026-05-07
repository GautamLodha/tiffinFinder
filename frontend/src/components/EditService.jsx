import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save, Loader2, Sparkles, Utensils } from 'lucide-react';

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pricePerMonth: '',
    mealType: '',
    address: ''
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:5000/api/user/service/${id}`,{
          headers : {token : token}
        });
        const { title, description, pricePerMonth, mealType, address } = response.data;
        setFormData({ title, description, pricePerMonth, mealType, address });
      } catch (err) {
        alert("Could not fetch service details");
        navigate('/provider');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/provider/service/${id}`, formData, {
        headers: { token: `${token}` }
      });
      alert("Service updated successfully!");
      navigate('/provider');
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FDF8F1] flex flex-col items-center justify-center">
      <Loader2 className="w-10 h-10 text-[#A63C13] animate-spin mb-4" />
      <p className="font-modern font-bold text-gray-500 animate-pulse">Fetching your kitchen details...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDF8F1] font-modern pb-12">
      {/* Header / Nav Area */}
      <div className="max-w-3xl mx-auto px-4 pt-8 md:pt-12">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 text-gray-500 mb-8 hover:text-[#A63C13] transition-all font-bold text-sm"
        >
          <div className="bg-white p-2 rounded-xl border border-orange-100 group-hover:border-orange-200 shadow-sm transition-all">
            <ArrowLeft size={18} />
          </div>
          Back to Dashboard
        </button>

        <div className="bg-white rounded-[48px] p-8 md:p-14 shadow-2xl shadow-orange-100/50 border border-orange-50 relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <Utensils size={120} />
          </div>

          <header className="relative z-10 mb-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-orange-500" />
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.3em]">Editor Mode</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 tracking-tight leading-none">
              Refine Your <span className="text-[#A63C13]">Service</span>
            </h1>
            <p className="text-gray-400 mt-4 font-medium">Keep your tiffin details fresh and accurate for your subscribers.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {/* Title Field */}
            <div className="group">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Service Title</label>
              <input
                name="title"
                required
                placeholder="Give your service a catchy name"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-5 rounded-3xl bg-gray-50 border-2 border-transparent focus:border-orange-100 focus:bg-white outline-none transition-all font-bold text-gray-800 shadow-inner"
              />
            </div>

            {/* Row: Price & Meal Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Monthly Price (₹)</label>
                <div className="relative">
                   <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-orange-700">₹</span>
                   <input
                    name="pricePerMonth"
                    type="number"
                    required
                    value={formData.pricePerMonth}
                    onChange={handleChange}
                    className="w-full pl-10 pr-5 py-5 rounded-3xl bg-gray-50 border-2 border-transparent focus:border-orange-100 focus:bg-white outline-none transition-all font-bold text-gray-800 shadow-inner"
                  />
                </div>
              </div>
              <div className="group">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Meal Category</label>
                <select
                  name="mealType"
                  value={formData.mealType}
                  onChange={handleChange}
                  className="w-full p-5 rounded-3xl bg-gray-50 border-2 border-transparent focus:border-orange-100 focus:bg-white outline-none transition-all font-bold text-gray-800 shadow-inner cursor-pointer appearance-none"
                >
                  <option value="veg">Pure Veg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="both">Both (Veg & Non-Veg)</option>
                </select>
              </div>
            </div>

            {/* Description Field */}
            <div className="group">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Description</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Describe the menu, hygiene, and specialties..."
                value={formData.description}
                onChange={handleChange}
                className="w-full p-6 rounded-3xl bg-gray-50 border-2 border-transparent focus:border-orange-100 focus:bg-white outline-none transition-all font-medium text-gray-700 shadow-inner resize-none"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-[#A63C13] text-white py-6 rounded-3xl font-heading font-black text-lg shadow-xl shadow-orange-200 hover:bg-[#8e3310] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <Save size={24} />
              )}
              {isSaving ? "Updating Kitchen..." : "Apply Changes"}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-gray-400 text-xs font-bold uppercase tracking-widest">
          Changes will be reflected immediately to potential subscribers
        </p>
      </div>
    </div>
  );
}