import React, { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from "jwt-decode";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Star, MapPin, Clock, Trash2, Send, MessageSquare, Phone } from 'lucide-react'; // Added Phone icon

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.id || decoded.userId || decoded.sub);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  const fetchDetails = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      // Ensure your backend controller uses .populate('provider')
      const res = await axios.get(`http://localhost:5000/api/user/service/${id}`, {
        headers: { token: token }
      });
      setService(res.data);
    } catch (err) {
      console.error("Error fetching service details:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login to add a review");
    if (!reviewText.trim()) return alert("Please write a comment");

    try {
      await axios.post(`http://localhost:5000/api/user/service/${id}/review`, 
        { rating, comment: reviewText },
        { headers: { token: token } }
      );
      setReviewText("");
      setRating(5);
      fetchDetails(); 
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/review/${reviewId}`, {
        headers: { token: token }
      });
      fetchDetails();
    } catch (err) {
      alert("Failed to delete review");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FDF8F1] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
      <p className="mt-4 font-heading font-bold text-orange-900 animate-pulse">Prepping details...</p>
    </div>
  );

  if (!service) return <div className="min-h-screen bg-[#FDF8F1] flex items-center justify-center font-heading text-xl">Service not found</div>;

  return (
    <div className="font-modern min-h-screen bg-[#FDF8F1] pb-20">
      <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDF8F1] via-transparent to-transparent opacity-60"></div>
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl hover:bg-white hover:scale-110 transition-all active:scale-95 group"
        >
          <ArrowLeft size={22} className="text-orange-900 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-white rounded-[48px] shadow-2xl shadow-orange-200/40 p-6 md:p-12 border border-orange-50 mb-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="bg-orange-100 text-orange-700 text-[11px] font-black px-4 py-1.5 rounded-xl uppercase tracking-[0.2em]">
                  {service.mealType}
                </span>
                <span className="flex items-center gap-1 bg-green-50 text-green-700 text-[11px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest">
                  Active
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 leading-tight">
                {service.title}
              </h1>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-6 py-3 rounded-3xl flex items-center gap-2 shadow-lg shadow-orange-200">
              <Star size={24} className="fill-white text-white" />
              <span className="font-heading font-black text-2xl text-white">
                {service.rating?.toFixed(1) || "New"}
              </span>
            </div>
          </div>

          <p className="text-gray-500 leading-relaxed mb-10 text-lg md:text-xl font-medium">
            {service.description}
          </p>

          {/* Info Grid - Updated to include Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-center gap-5 p-6 bg-orange-50/30 rounded-[32px] border border-orange-50">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100">
                <MapPin className="text-orange-700" size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Kitchen Location</p>
                <p className="text-base font-bold text-gray-800 leading-snug">{service.address}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 p-6 bg-orange-50/30 rounded-[32px] border border-orange-50">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100">
                <Clock className="text-orange-700" size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Pricing Model</p>
                <p className="text-base font-bold text-gray-800 leading-snug">₹{service.pricePerMonth} <span className="text-gray-400 font-normal">/ Meal</span></p>
              </div>
            </div>

            {/* Added Contact Card */}
            <div className="flex items-center gap-5 p-6 bg-orange-50/30 rounded-[32px] border border-orange-50 md:col-span-2">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100">
                <Phone className="text-orange-700" size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Contact Provider</p>
                <p className="text-base font-bold text-gray-800 leading-snug">
                  {service.provider?.phonePrimary || "Contact details not available"}
                  {service.provider?.phoneSecondary && <span className="text-gray-400 font-normal ml-2"> / {service.provider.phoneSecondary}</span>}
                </p>
                <p className="text-[10px] text-orange-600 font-bold uppercase mt-1">Provider: {service.provider?.name}</p>
              </div>
            </div>
          </div>

          {/* Review Input Section */}
          <section className="border-t border-orange-50 pt-10">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="text-orange-600" />
              <h3 className="text-2xl font-heading font-bold text-gray-900">Share your thoughts</h3>
            </div>
            
            <form onSubmit={handleAddReview} className="space-y-6">
              <div className="flex items-center gap-3 bg-orange-50/50 w-fit p-3 rounded-2xl border border-orange-50">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    size={28}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer transition-all hover:scale-125 ${rating >= star ? "fill-orange-500 text-orange-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              
              <div className="relative group">
                <textarea 
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="How was the hygiene and taste?"
                  className="w-full p-6 bg-gray-50 rounded-[32px] border-2 border-transparent focus:border-orange-200 focus:bg-white outline-none resize-none transition-all text-gray-700 font-medium"
                  rows="3"
                />
                <button 
                  type="submit"
                  className="absolute bottom-4 right-4 bg-orange-600 text-white p-4 rounded-2xl shadow-xl hover:bg-orange-700 hover:shadow-orange-200 transition-all active:scale-90"
                >
                  <Send size={22} />
                </button>
              </div>
            </form>
          </section>

          {/* Reviews List Section */}
          <div className="mt-16 space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-heading font-bold text-gray-900">
                Community Feedback
              </h3>
              <span className="bg-gray-100 text-gray-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {service.reviews?.length || 0} Reviews
              </span>
            </div>

            {service.reviews?.length > 0 ? (
              <div className="space-y-6">
                {service.reviews.map((rev) => {
                  const isAuthor = (rev.user?._id || rev.user) === currentUserId;
                  return (
                    <div key={rev._id} className="p-8 bg-white border border-orange-50 rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-orange-100 transition-all duration-300 group">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-tr from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center font-black text-orange-700 border border-white">
                            {rev.user?.name?.[0] || "U"}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{rev.user?.name || "Verified User"}</h4>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={12} 
                                  className={`${i < rev.rating ? "fill-orange-400 text-orange-400" : "text-gray-200"}`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {isAuthor && (
                          <button 
                            onClick={() => handleDeleteReview(rev._id)}
                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                            title="Delete Review"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed mt-6 italic">"{rev.comment}"</p>
                      <div className="mt-6 pt-4 border-t border-orange-50 flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-widest">
                        <span>{new Date(rev.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        {isAuthor && <span className="text-orange-600">Your Review</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-orange-50/20 rounded-[40px] border-2 border-dashed border-orange-100">
                <MessageSquare className="mx-auto text-orange-200 mb-4" size={48} />
                <p className="text-gray-400 font-medium italic text-lg">No one has tucked in yet. Be the first!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;