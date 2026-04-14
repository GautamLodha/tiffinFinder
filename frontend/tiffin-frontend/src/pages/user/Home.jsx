import Navbar from "../../components/Navbar";
import ServiceCard from "../../components/ServiceCard";

export default function Home() {
    const services = {}
  return (
    <>
      <Navbar />
      <div className="p-6 grid grid-cols-3 gap-6">
        {/* {services.map((s) => (
          <ServiceCard key={s._id} service={s} />
        ))} */}
      </div>
    </>
  );
}