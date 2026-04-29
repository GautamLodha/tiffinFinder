import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, Heart, ShieldCheck, Zap, ChefHat, ShoppingBasket } from "lucide-react";
import heroImg from "../../assets/hero2.png";
import chef from "../../assets/chef.png";
import food from "../../assets/food.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="font-modern min-h-screen bg-[#FDF8F1] selection:bg-orange-200">
      {/* 🔝 Premium Navbar */}
      <nav className="sticky top-0 z-50 bg-[#FDF8F1]/80 backdrop-blur-xl border-b border-orange-100/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate("/")}>
             <div className="w-10 h-10 bg-[#A63C13] rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
                <ChefHat className="text-white" size={24} />
             </div>
             <h1 className="text-2xl font-heading font-black text-gray-900 tracking-tighter group-hover:text-[#A63C13] transition-colors">
               ChefStream
             </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login?role=customer")}
              className="hidden md:block px-5 py-2 text-sm font-bold text-gray-600 hover:text-[#A63C13] transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/login?role=provider")}
              className="bg-white border-2 border-orange-100 px-5 py-2 rounded-2xl text-sm font-black text-[#A63C13] hover:bg-orange-50 transition-all shadow-sm active:scale-95"
            >
              Join as Chef
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        
        {/* 🟠 IMPACT HERO SECTION */}
        <section className="grid lg:grid-cols-2 gap-16 items-center py-12 md:py-24">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-100/50 px-4 py-2 rounded-full border border-orange-200">
               <Star className="text-orange-600 fill-orange-600" size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest text-orange-800">Trusted by 5000+ Families</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-heading font-black text-gray-900 leading-[0.9] tracking-tighter">
              Purely <span className="text-[#A63C13] italic font-brand font-light">Homemade</span> <br />
              Zero Hassle.
            </h2>

            <p className="text-lg md:text-xl text-gray-500 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              Skip the industrial kitchens. Connect with local home chefs for authentic, 
              nutrient-rich meals made in real homes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/signup?role=customer")}
                className="group bg-[#A63C13] text-white px-10 py-5 rounded-[24px] font-heading font-black text-lg shadow-2xl shadow-orange-200 hover:bg-gray-900 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                Find My Tiffin
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-orange-200 rounded-[60px] blur-3xl opacity-30 -z-10 animate-pulse"></div>
            <div className="rounded-[48px] overflow-hidden shadow-2xl border-[12px] border-white transform rotate-2 hover:rotate-0 transition-transform duration-700">
              <img src={heroImg} className="w-full h-[500px] object-cover" alt="Hero Food" />
            </div>
          </div>
        </section>

        {/* 🍽️ THE DUAL-PATH SECTION */}
        <section className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="group bg-white p-10 rounded-[48px] shadow-sm border border-orange-50 hover:border-orange-200 transition-all hover:shadow-2xl hover:shadow-orange-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <ShoppingBasket size={120} />
            </div>
            <Heart className="text-orange-500 mb-6" size={32} />
            <h3 className="text-3xl font-heading font-black text-gray-900">I want to eat healthy</h3>
            <p className="text-gray-500 mt-4 text-lg leading-relaxed">
              Explore menus from passionate home cooks in your neighborhood. Fresh ingredients, no preservatives.
            </p>
            <button
              onClick={() => navigate("/signup?role=customer")}
              className="mt-8 flex items-center gap-2 font-black text-[#A63C13] uppercase tracking-widest text-xs hover:gap-4 transition-all"
            >
              Browse Menus <ArrowRight size={16} />
            </button>
          </div>

          <div className="group bg-gray-900 p-10 rounded-[48px] shadow-sm border border-gray-800 hover:shadow-2xl hover:shadow-gray-200 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <ChefHat size={120} className="text-white" />
            </div>
            <Zap className="text-yellow-400 mb-6" size={32} />
            <h3 className="text-3xl font-heading font-black text-white">I want to sell my food</h3>
            <p className="text-gray-400 mt-4 text-lg leading-relaxed">
              Turn your signature dishes into a sustainable home business. We handle the discovery, you handle the flavor.
            </p>
            <button
              onClick={() => navigate("/signup?role=provider")}
              className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-2xl font-black uppercase text-xs shadow-lg active:scale-95 transition-all"
            >
              Start My Kitchen
            </button>
          </div>
        </section>

        {/* ⭐ TRUST FEATURES */}
        <section className="py-20 bg-orange-50/50 rounded-[60px] border border-orange-100 mb-24 text-center px-6">
          <h2 className="text-4xl font-heading font-black text-gray-900 mb-16">The ChefStream Standard</h2>
          <div className="grid sm:grid-cols-3 gap-12">
            {[
              { icon: <ShieldCheck className="text-green-600" />, title: "Safety Verified", desc: "Every kitchen undergoes a quality & hygiene check." },
              { icon: <Heart className="text-red-500" />, title: "Truly Homemade", desc: "No commercial oils. No industrial additives." },
              { icon: <Zap className="text-blue-500" />, title: "Daily Delivery", desc: "Freshly cooked and delivered at your preferred time." },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-heading font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-500 max-w-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🚀 PROVIDER CTA REIMAGINED */}
        <section className="bg-white p-8 md:p-16 rounded-[60px] shadow-2xl shadow-orange-100 border border-orange-50 mb-24 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#a63300] to-orange-400"></div>
          
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl font-heading font-black text-gray-900 leading-tight">
              Monetize Your <span className="text-[#A63C13]">Kitchen.</span>
            </h2>
            
            <div className="space-y-6">
              {[
                { n: "01", t: "List Your Specialized Menu" },
                { n: "02", t: "Set Your Delivery Schedule" },
                { n: "03", t: "Accept Weekly/Monthly Subs" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-6 group">
                   <span className="text-4xl font-heading font-black text-orange-100 group-hover:text-orange-200 transition-colors">
                     {step.n}
                   </span>
                   <p className="text-xl font-bold text-gray-700">{step.t}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/signup?role=provider")}
              className="w-full sm:w-auto bg-gray-900 text-white px-10 py-5 rounded-[24px] font-heading font-black text-lg hover:bg-[#A63C13] transition-all shadow-xl active:scale-95"
            >
              Become a Tiffin Chef
            </button>
          </div>

          <div className="flex-1 flex gap-4 rotate-3">
             <div className="space-y-4">
                <img src={chef} className="w-48 h-64 object-cover rounded-[40px] shadow-lg border-4 border-white" alt="Chef" />
                <div className="bg-orange-500 h-24 rounded-[40px] shadow-lg"></div>
             </div>
             <div className="space-y-4 pt-12">
                <div className="bg-gray-100 h-24 rounded-[40px] shadow-lg"></div>
                <img src={food} className="w-48 h-64 object-cover rounded-[40px] shadow-lg border-4 border-white" alt="Food" />
             </div>
          </div>
        </section>

        {/* 🔻 CLEAN FOOTER */}
        <footer className="py-12 border-t border-orange-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#A63C13] rounded-lg flex items-center justify-center">
                <ChefHat className="text-white" size={16} />
            </div>
            <span className="font-heading font-black text-gray-900 tracking-tighter">ChefStream</span>
          </div>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">© 2026 Crafted for Home Chefs</p>
          <div className="flex gap-6 text-sm font-bold text-gray-400 uppercase tracking-tighter">
             <a href="#" className="hover:text-orange-600">Safety</a>
             <a href="#" className="hover:text-orange-600">Privacy</a>
             <a href="#" className="hover:text-orange-600">Terms</a>
          </div>
        </footer>
      </main>
    </div>
  );
}