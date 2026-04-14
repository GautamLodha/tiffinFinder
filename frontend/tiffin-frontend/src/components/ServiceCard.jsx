import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <Link to={`/service/${service._id}`}>
      <div className="border rounded-xl p-4 shadow hover:shadow-lg">
        <img src={service.image} className="h-40 w-full object-cover rounded" />
        <h2 className="text-lg font-bold mt-2">{service.title}</h2>
        <p>₹{service.pricePerMonth}/month</p>
        <p className="text-sm text-gray-500">{service.address}</p>
        <p>⭐ {service.rating}</p>
      </div>
    </Link>
  );
}