import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Search,
  Phone,
  Navigation,
  Star,
} from "lucide-react";

// Clinic Finder
const ClinicFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const clinics = [
    {
      id: 1,
      name: "Nairobi County Hospital",
      address: "Kapenguria Rd",
      phone: "+254 20 272 6300",
      distance: "2.3 km",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Mji wa Huruma Clinic",
      address: "Huruma Estate",
      phone: "+254 723 456 789",
      distance: "3.1 km",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Westside Medical Centre",
      address: "Westlands",
      phone: "+254 20 445 6789",
      distance: "5.2 km",
      rating: 4.7,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clinic Finder</h1>
          <p className="text-gray-600 mt-1">
            Find nearby clinics and book appointments
          </p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center space-x-2">
          <Navigation size={20} />
          <span>Use My Location</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clinics by name or location..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {clinic.name}
                </h3>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(clinic.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    ({clinic.rating})
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2 flex-shrink-0" />
                  <span>{clinic.address}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="mr-2 flex-shrink-0" />
                  <span>{clinic.phone}</span>
                </div>
                <div className="flex items-center text-sm text-blue-600 font-medium">
                  <Navigation size={16} className="mr-2 flex-shrink-0" />
                  <span>{clinic.distance} away</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2">
                <Calendar size={18} />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicFinder;
