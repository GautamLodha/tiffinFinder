import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, User } from 'lucide-react';

const ProviderProfile = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ provider: null, services: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/provider/${providerId}`);
        setData({
          provider: res.data.services[0].provider, // Get provider details from the first item
          services: res.data.services
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProviderData();
  }, [providerId]);

  if (loading) return <div className="min-h-screen bg-[#FDF8F1] flex items-center justify-center">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-[#FDF8F1] p-6">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-6 bg-white p-3 rounded-2xl shadow-sm"><ArrowLeft size={20}/></button>
        
        {/* Profile Header */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm mb-10 flex flex-col md:flex-row items-center gap-6 border border-orange-50">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 text-3xl font-bold">
            {data.provider?.name[0]}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{data.provider?.name}</h1>
            <p className="text-gray-500 mt-1">Providing home-cooked excellence</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">All Listings by this Provider</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services.map(service => (
            <div 
              key={service._id} 
              onClick={() => navigate(`/service/${service._id}`)}
              className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-orange-50 cursor-pointer hover:shadow-md transition-all"
            >
              <img src={service.image} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h4 className="font-bold text-gray-800">{service.title}</h4>
                <p className="text-orange-700 font-bold text-xs mt-2">₹{service.pricePerMonth}/mo</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;