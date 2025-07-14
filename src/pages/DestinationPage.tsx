import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import apiService from '../services/apiService';

const DestinationPage: React.FC = () => {
  const { destination } = useParams<{ destination: string }>();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await apiService().sendPostToServerWithOutToken('businesses/getproperties', {});
        if (response.status === 200 && Array.isArray(response.data)) {
          // Filter properties by city (destination)
          setProperties(
            response.data.filter(
              (p: any) => p.location?.city?.toLowerCase() === destination?.toLowerCase()
            )
          );
        } else {
          setProperties([]);
        }
      } catch {
        setProperties([]);
      }
      setLoading(false);
    };
    fetchProperties();
  }, [destination]);

  // Destination header images
  const destinationImages: Record<string, string> = {
    kampala: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    jinja: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80',
    entebbe: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80',
    bwindi: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
  };
  const headerImage = destinationImages[destination?.toLowerCase() || ''] || 'https://via.placeholder.com/1200x400?text=Uganda';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Destination header image */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <img src={headerImage} alt={destination} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white capitalize drop-shadow-lg">{destination}</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <p className="text-lg text-gray-600 mb-8">Properties found in {destination}:</p>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : properties.length === 0 ? (
          <div className="text-center text-gray-500">No properties found in this area.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {properties.map(property => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={property.photos?.[0]?.url || headerImage} alt={property.propertyName} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{property.propertyName}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location?.city || property.location}
                  </div>
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{property.rating || 'N/A'}</span>
                  </div>
                  <Link to={`/hotels/${property.id}`} className="text-teal-600 hover:underline font-medium">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;
