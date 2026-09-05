import { Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, Users, ArrowRight } from 'lucide-react';

const TripCard = ({ trip }) => {
      if (!trip) return null;

      const { id, slug, title, location, country, duration, members, date, coverImage, description } = trip;

      return (
            <div className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 soft-shadow hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1" data-aos="fade-up">
                  <div className="relative h-64 overflow-hidden bg-stone-100">
                        <img
                              src={coverImage}
                              alt={title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                              <div className="flex items-center gap-1.5 text-xs font-medium text-orange-300 mb-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>{location}, {country}</span>
                              </div>
                              <h3 className="font-serif-heading text-lg font-bold leading-tight line-clamp-1 group-hover:text-orange-200 transition-colors">
                                    {title}
                              </h3>
                        </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                              <div className="flex items-center flex-wrap gap-1.5 text-xs font-semibold text-stone-500">
                                    <div className="flex items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-full shrink-0">
                                          <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                          <span className="whitespace-nowrap">{duration}</span>
                                    </div>
                                    {members && (
                                          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-1 rounded-full shrink-0 max-w-[140px]">
                                                <Users className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                                <span className="truncate whitespace-nowrap">{members}</span>
                                          </div>
                                    )}
                                    {date && (
                                          <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full shrink-0">
                                                <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                                <span className="whitespace-nowrap">{date}</span>
                                          </div>
                                    )}
                              </div>
                              <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                                    {description}
                              </p>
                        </div>

                        <div className="pt-2 border-t border-stone-100">
                              <Link
                                    to={`/trips/${id}`}
                                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-stone-50 group-hover:bg-orange-500 text-slate-800 group-hover:text-white font-medium text-sm transition-all duration-300"
                              >
                                    <span>View Details</span>
                                    <ArrowRight className="w-4 h-4 text-orange-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
                              </Link>
                        </div>
                  </div>
            </div>
      );
};

export default TripCard;
