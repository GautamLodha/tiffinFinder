import React, { useState } from 'react';
import { ArrowLeft, Camera, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateService = () => {
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FFF9F2] font-sans text-[#332D2B] pb-12">
      {/* Header */}
      <header className="flex items-center justify-between p-4 max-w-2xl mx-auto">
        <button className="p-2 hover:bg-orange-100 rounded-full transition-colors">
          <ArrowLeft onClick={()=>navigate(-1)} size={24} className="text-orange-600" />
        </button>
        <h1 className="text-lg font-semibold">Create Service</h1>
        <span className="text-[#B33A1B] font-bold text-xl tracking-tight">Tiffin</span>
      </header>

      <main className="max-w-xl mx-auto px-6 mt-8">
        {/* Title Section */}
        <section className="text-center mb-10">
          <span className="text-[#B33A1B] text-xs font-bold tracking-widest uppercase">New Offering</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 leading-tight">
            Share your kitchen’s magic with the world.
          </h2>
        </section>

        {/* Form Fields */}
        <div className="space-y-8">
          
          {/* Image Upload Placeholder */}
          <div>
            <label className="text-sm font-bold text-gray-600 mb-3 block uppercase tracking-wide">Service Showcase</label>
            <div className="relative aspect-[4/3] w-full rounded-3xl bg-[#F5EBE0] border-2 border-dashed border-orange-200 flex flex-col items-center justify-center p-8 text-center overflow-hidden transition-all hover:bg-[#F0E4D8] cursor-pointer">
              <div className="bg-[#FF6B35] p-4 rounded-full shadow-lg mb-4 text-white">
                <Camera size={32} />
              </div>
              <h3 className="font-bold text-lg">Upload Cover Photo</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-[200px]">
                Showcase your delicious home-cooked meal
              </p>
              {/* Soft decorative circles inside the upload box to match the image */}
              <div className="absolute inset-0 border-[30px] border-white/10 rounded-full scale-150 pointer-events-none"></div>
            </div>
          </div>

          {/* Service Name */}
          <div>
            <label className="text-sm font-bold text-gray-600 mb-2 block uppercase tracking-wide">Service Name</label>
            <input 
              type="text" 
              placeholder="Ex: Grandmama's Spice Box"
              className="w-full p-4 rounded-xl bg-[#EFE9E1] border-none focus:ring-2 focus:ring-orange-400 outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-bold text-gray-600 mb-2 block uppercase tracking-wide">The Story (Description)</label>
            <textarea 
              rows="5"
              placeholder="Tell us about your home-cooked meals, ingredients, and the love you pour into every dish..."
              className="w-full p-4 rounded-xl bg-[#EFE9E1] border-none focus:ring-2 focus:ring-orange-400 outline-none resize-none placeholder:text-gray-400"
            />
          </div>

          {/* Pricing Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-50">
            <h3 className="text-xl font-bold mb-1">Set your Pricing</h3>
            <p className="text-sm text-gray-500 mb-6">Fair pricing for quality home-made food.</p>
            
            <div className="relative flex items-center bg-[#EFE9E1] rounded-xl p-4">
              <span className="text-orange-700 font-bold mr-2">$</span>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="bg-transparent border-none outline-none w-full text-lg font-medium placeholder:text-gray-400"
              />
              <span className="text-sm text-gray-500 font-medium">per tiffin</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 text-center">
            <button className="w-full py-4 px-6 bg-gradient-to-r from-[#B33A1B] to-[#FF6B35] text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-orange-200 active:scale-95 transition-transform">
              <Rocket size={20} />
              Publish Service
            </button>
            <p className="mt-4 text-[11px] text-gray-500 px-8">
              By publishing, you agree to our quality standards and kitchen safety guidelines.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CreateService;