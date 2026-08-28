import React, { useEffect, useState } from 'react';
import { getTours } from '../services/api';
import TourCard from '../components/TourCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { Compass, Search, Filter } from 'lucide-react';

const Tours = () => {
      const [tours, setTours] = useState([]);
      const [filteredTours, setFilteredTours] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedCountry, setSelectedCountry] = useState('All');

      useEffect(() => {
            document.title = 'Our Tours | My Travel';
            fetchToursData();
      }, []);

      const fetchToursData = async () => {
            try {
                  setLoading(true);
                  setError(null);
                  const data = await getTours();
                  setTours(data);
                  setFilteredTours(data);
            } catch (err) {
                  console.error('Failed to load tours:', err);
                  setError('Unable to load tours list. Please try again.');
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            let result = tours;
            if (searchTerm) {
                  result = result.filter(
                        (t) =>
                              t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              t.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              t.country.toLowerCase().includes(searchTerm.toLowerCase())
                  );
            }
            if (selectedCountry !== 'All') {
                  result = result.filter((t) => t.country.toLowerCase() === selectedCountry.toLowerCase());
            }
            setFilteredTours(result);
      }, [searchTerm, selectedCountry, tours]);

      const countries = ['All', ...new Set(tours.map((t) => t.country))];

      return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

                  <div className="text-center max-w-2xl mx-auto space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold uppercase tracking-wider border border-orange-200">
                              <Compass className="w-4 h-4" />
                              <span>Curated Travel Journeys</span>
                        </div>
                        <h1 className="font-serif-heading text-4xl sm:text-5xl font-extrabold text-slate-900">
                              Explore Our Tours
                        </h1>
                        <p className="text-slate-600 text-base leading-relaxed">
                              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum, nam!
                        </p>
                  </div>

                  <div className="bg-white p-4 rounded-3xl border border-stone-200 soft-shadow flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
                        <div className="relative w-full md:w-1/2">
                              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                              <input
                                    type="text"
                                    placeholder="Search by tour title, city, or country..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-full bg-stone-50 border border-stone-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
                              />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                              <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
                              {countries.map((country) => (
                                    <button
                                          key={country}
                                          onClick={() => setSelectedCountry(country)}
                                          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${selectedCountry === country
                                                      ? 'bg-orange-500 text-white shadow-xs'
                                                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                                                }`}
                                    >
                                          {country}
                                    </button>
                              ))}
                        </div>
                  </div>

                  {loading ? (
                        <Loading message="Fetching tour packages..." />
                  ) : error ? (
                        <ErrorMessage message={error} onRetry={fetchToursData} />
                  ) : filteredTours.length === 0 ? (
                        <div className="py-16 text-center space-y-3">
                              <p className="text-slate-500 font-medium">No tours match your current search.</p>
                              <button
                                    onClick={() => {
                                          setSearchTerm('');
                                          setSelectedCountry('All');
                                    }}
                                    className="text-xs font-semibold text-orange-500 hover:underline"
                              >
                                    Clear Filters
                              </button>
                        </div>
                  ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {filteredTours.map((tour) => (
                                    <TourCard key={tour.id} tour={tour} />
                              ))}
                        </div>
                  )}

            </div>
      );
};

export default Tours;
