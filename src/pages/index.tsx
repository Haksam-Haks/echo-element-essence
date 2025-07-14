import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Search, ChevronRight, Shield, Globe, CreditCard, Headphones } from 'lucide-react';
import apiService from '../services/apiService';

const Index: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHotels, setFilteredHotels] = useState<any[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHotelsAndRestaurants = async () => {
      try {
        setIsLoading(true);
        const response = await apiService().sendPostToServerWithOutToken('businesses/getproperties', {});
        if (response.status === 200 && Array.isArray(response.data)) {
          // Show all properties as hotels and restaurants
          setHotels(response.data.slice(0, 4));
          setFilteredHotels(response.data.slice(0, 4));
          setRestaurants(response.data.slice(0, 4));
          setFilteredRestaurants(response.data.slice(0, 4));
        }
      } catch (err) {
        setHotels([]);
        setFilteredHotels([]);
        setRestaurants([]);
        setFilteredRestaurants([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotelsAndRestaurants();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredHotels(hotels);
      setFilteredRestaurants(restaurants);
    } else {
      setFilteredHotels(
        hotels.filter(h =>
          h.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.location?.country?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredRestaurants(
        restaurants.filter(r =>
          r.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.location?.country?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, hotels, restaurants]);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-48 w-full"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen max-h-[100vh] min-h-[600px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('src/backgroundsimages/waterfall.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80"></div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-600 to-black animate-gradient">
                Discover
              </span>{" "}
              Luxury & Adventure in Uganda
            </h1>

            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
              Find hotels, restaurants, and experiences across Uganda. Book, explore, and enjoy!
            </p>

            {/* Search Bar */}
            <div className="flex justify-center mt-6 animate-slide-up">
              <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full shadow-xl px-6 py-3 w-full max-w-xl transition-all duration-300 hover:shadow-2xl focus-within:shadow-2xl focus-within:ring-2 focus-within:ring-teal-400">
                <Search className="text-gray-500 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Search hotels, restaurants or locations..."
                  className="flex-1 outline-none text-lg text-gray-700 bg-transparent placeholder-gray-400"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="ml-2 bg-teal-500 text-white rounded-full p-2 hover:bg-teal-600 transition-colors">
                  <Search size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 animate-slide-up">
              <Link
                to="/business/register"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full shadow-lg text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Add your business
                <ChevronRight className="ml-2 -mr-1 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ugandan Hotels Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Hotels in Uganda</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Discover the finest accommodations Uganda has to offer
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => <SkeletonCard key={`hotel-skeleton-${i}`} />)
            ) : filteredHotels.length === 0 ? (
              <div className="col-span-4 text-center py-12">
                <div className="text-gray-400 mb-4">No hotels found matching your search</div>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredHotels
                .filter(hotel => hotel.location?.country?.toLowerCase() === 'uganda' || hotel.location?.country === undefined)
                .map(hotel => (
                  <div key={hotel.id} className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative overflow-hidden h-56">
                      <img 
                        src={hotel.photos?.[0]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
                        alt={hotel.propertyName} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-white/90 text-yellow-500 px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        {hotel.rating || '4.5'}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.propertyName}</h3>
                      <div className="flex items-center text-gray-500 mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{hotel.location?.city || 'Uganda'}</span>
                      </div>
                      <Link 
                        to={`/hotels/${hotel.id}`}
                        className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium group-hover:underline"
                      >
                        View details
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Ugandan Restaurants Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Restaurants in Uganda</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Taste the best of Ugandan cuisine and international flavors
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => <SkeletonCard key={`restaurant-skeleton-${i}`} />)
            ) : filteredRestaurants.length === 0 ? (
              <div className="col-span-4 text-center py-12">
                <div className="text-gray-400 mb-4">No restaurants found matching your search</div>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredRestaurants.map(restaurant => (
                <div key={restaurant.id} className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative overflow-hidden h-56">
                    <img 
                      src={restaurant.photos?.[0]?.url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
                      alt={restaurant.propertyName} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/90 text-yellow-500 px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      {restaurant.rating || '4.2'}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.propertyName}</h3>
                    <div className="flex items-center text-gray-500 mb-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{restaurant.location?.city || 'Uganda'}</span>
                    </div>
                    <div className="mb-3">
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {restaurant.cuisine || restaurant.businessType || 'International'}
                      </span>
                    </div>
                    <Link 
                      to={`/restaurants/${restaurant.id}`}
                      className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium group-hover:underline"
                    >
                      View details
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Popular Ugandan Destinations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Destinations in Uganda</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Explore Uganda's most breathtaking locations
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Kampala */}
            <Link 
              to="/destinations/kampala" 
              className="relative rounded-xl overflow-hidden shadow-lg h-80 flex items-end group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Kampala" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
              <div className="relative w-full p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-1">Kampala</h3>
                <p className="text-gray-200 mb-3">The vibrant capital city</p>
                <span className="inline-flex items-center text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm border border-white/20">
                  Explore <ChevronRight className="ml-1 w-4 h-4" />
                </span>
              </div>
            </Link>
            
            {/* Jinja */}
            <Link 
              to="/destinations/jinja" 
              className="relative rounded-xl overflow-hidden shadow-lg h-80 flex items-end group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Jinja" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
              <div className="relative w-full p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-1">Jinja</h3>
                <p className="text-gray-200 mb-3">Source of the Nile</p>
                <span className="inline-flex items-center text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm border border-white/20">
                  Explore <ChevronRight className="ml-1 w-4 h-4" />
                </span>
              </div>
            </Link>
            
            {/* Entebbe */}
            <Link 
              to="/destinations/entebbe" 
              className="relative rounded-xl overflow-hidden shadow-lg h-80 flex items-end group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Entebbe" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
              <div className="relative w-full p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-1">Entebbe</h3>
                <p className="text-gray-200 mb-3">Lakeside retreat</p>
                <span className="inline-flex items-center text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm border border-white/20">
                  Explore <ChevronRight className="ml-1 w-4 h-4" />
                </span>
              </div>
            </Link>
            
            {/* Bwindi */}
            <Link 
              to="/destinations/bwindi" 
              className="relative rounded-xl overflow-hidden shadow-lg h-80 flex items-end group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Bwindi" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
              <div className="relative w-full p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-1">Bwindi</h3>
                <p className="text-gray-200 mb-3">Gorilla trekking</p>
                <span className="inline-flex items-center text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm border border-white/20">
                  Explore <ChevronRight className="ml-1 w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Browse Ugandan Property Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse Ugandan Property Types</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Find the perfect accommodation for your Ugandan adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Hotels */}
            <Link 
              to="/hotels" 
              className="group relative rounded-xl overflow-hidden shadow-lg h-64 flex items-end transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Hotels" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="relative w-full p-6 z-10">
                <h3 className="text-2xl font-bold text-white">Hotels</h3>
                <p className="text-gray-200 text-sm">Luxury and comfort</p>
              </div>
            </Link>
            
            {/* Apartments */}
            <Link 
              to="/apartments" 
              className="group relative rounded-xl overflow-hidden shadow-lg h-64 flex items-end transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Apartments" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="relative w-full p-6 z-10">
                <h3 className="text-2xl font-bold text-white">Apartments</h3>
                <p className="text-gray-200 text-sm">Home away from home</p>
              </div>
            </Link>
            
            {/* Resorts */}
            <Link 
              to="/resorts" 
              className="group relative rounded-xl overflow-hidden shadow-lg h-64 flex items-end transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Resorts" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="relative w-full p-6 z-10">
                <h3 className="text-2xl font-bold text-white">Resorts</h3>
                <p className="text-gray-200 text-sm">Relaxation and leisure</p>
              </div>
            </Link>
            
            {/* Villas */}
            <Link 
              to="/villas" 
              className="group relative rounded-xl overflow-hidden shadow-lg h-64 flex items-end transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Villas" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="relative w-full p-6 z-10">
                <h3 className="text-2xl font-bold text-white">Villas</h3>
                <p className="text-gray-200 text-sm">Private and exclusive</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Book With Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Book With Us?</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              We're committed to providing the best experience for your Ugandan adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Local Expertise */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
              <div className="bg-teal-100/30 text-teal-600 p-4 rounded-full mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Local Expertise</h3>
              <p className="text-gray-600">
                Curated listings and experiences from Uganda's best hospitality providers.
              </p>
            </div>
            
            {/* Secure Payments */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
              <div className="bg-teal-100/30 text-teal-600 p-4 rounded-full mb-4">
                <CreditCard className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Mobile Money and card payments, safe and easy for all users.
              </p>
            </div>
            
            {/* Verified Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
              <div className="bg-teal-100/30 text-teal-600 p-4 rounded-full mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Verified Reviews</h3>
              <p className="text-gray-600">
                Real feedback from guests to help you choose the best options.
              </p>
            </div>
            
            {/* 24/7 Support */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
              <div className="bg-teal-100/30 text-teal-600 p-4 rounded-full mb-4">
                <Headphones className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Our team is here to help you anytime, anywhere in Uganda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to explore Uganda?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
            Start planning your perfect trip with our curated selection of hotels, restaurants, and experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/hotels"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-semibold rounded-full shadow-md text-teal-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 transform hover:scale-105"
            >
              Browse Hotels
            </Link>
            <Link
              to="/restaurants"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-lg font-semibold rounded-full shadow-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300 transform hover:scale-105"
            >
              Discover Restaurants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;