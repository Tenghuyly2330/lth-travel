import { Link } from 'react-router-dom';
import { Compass, Link2, Globe, Rss, Heart, MapPin } from 'lucide-react';

const Footer = () => {
      return (
            <footer className="bg-slate-900 text-stone-300 pt-16 pb-12 border-t border-slate-800">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">

                              <div className="space-y-4 md:col-span-1">
                                    <Link to="/" className="flex items-center gap-2.5">
                                          <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white">
                                                <Compass className="w-5 h-5" />
                                          </div>
                                          <span className="font-serif-heading text-2xl font-bold tracking-tight text-white">
                                                Travel<span className="text-orange-500">.</span>
                                          </span>
                                    </Link>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, alias.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-orange-400">
                                          <MapPin className="w-4 h-4" />
                                          <span>Koh Kong & Phnom Penh, Cambodia</span>
                                    </div>
                              </div>

                              {/* Quick Links */}
                              {/* <div className="space-y-3">
                                    <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-serif-heading">Quick Links</h4>
                                    <ul className="space-y-2.5 text-sm">
                                          <li>
                                                <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
                                          </li>
                                          <li>
                                                <Link to="/tours" className="hover:text-orange-400 transition-colors">Our Tours</Link>
                                          </li>
                                          <li>
                                                <Link to="/photos" className="hover:text-orange-400 transition-colors">Photo Gallery</Link>
                                          </li>
                                    </ul>
                              </div> */}

                              <div className="space-y-3">
                                    <h4 className="text-white font-semibold text-sm tracking-widest font-serif-heading">Top Destinations</h4>
                                    <ul className="space-y-2.5 text-sm text-slate-400">
                                          <li>Koh Kong, Cambodia</li>
                                          {/* <li>Phnom Penh Heritage</li>
                                          <li>Koh Rong Tropical Islands</li>
                                          <li>Himalayan Alpine Treks</li> */}
                                    </ul>
                              </div>

                              <div className="space-y-3">
                                    <h4 className="text-white font-semibold text-sm tracking-widest font-serif-heading">Follow My Journey</h4>
                                    <p className="text-xs text-slate-400">Catch daily travel updates & photo stories on social media.</p>
                                    <div className="flex items-center gap-3 pt-2">
                                          <a href="https://github.com/Tenghuyly2330" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-orange-500 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                                                <Link2 className="w-5 h-5" />
                                          </a>
                                          <a href="https://tenghuy.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-orange-500 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                                                <Globe className="w-5 h-5" />
                                          </a>
                                          <a href="https://github.com/Tenghuyly2330" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-orange-500 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                                                <Rss className="w-5 h-5" />
                                          </a>
                                    </div>
                              </div>
                        </div>

                        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                              <p>© {new Date().getFullYear()} Travel Portfolio. All Rights Reserved.</p>
                              <p className="flex items-center gap-1">
                                    Crafted with <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> for passion travelers
                              </p>
                        </div>
                  </div>
            </footer>
      );
};

export default Footer;
