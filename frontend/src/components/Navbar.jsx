import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar = () => {
      const [isOpen, setIsOpen] = useState(false);
      const location = useLocation();

      const navLinks = [
            { name: 'Home', path: '/' },
            { name: 'Our Trips', path: '/trips' },
            { name: 'Gallery', path: '/photos' },
      ];

      const isActive = (path) => {
            if (path === '/' && location.pathname === '/') return true;
            if (path !== '/' && location.pathname.startsWith(path)) return true;
            return false;
      };

      return (
            <header className="sticky top-0 z-40 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/60 transition-all duration-300">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                        <Link to="/" className="flex items-center gap-2.5 group">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                                    <Compass className="w-5 h-5 animate-pulse" />
                              </div>
                              <span className="font-serif-heading text-2xl font-bold tracking-tight text-slate-900">
                                    Travel<span className="text-orange-500">.</span>
                              </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-1 bg-white/80 p-1.5 rounded-full border border-stone-200/80 shadow-xs">
                              {navLinks.map((link) => (
                                    <Link
                                          key={link.path}
                                          to={link.path}
                                          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive(link.path)
                                                ? 'bg-orange-500 text-white shadow-sm font-semibold'
                                                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
                                                }`}
                                    >
                                          {link.name}
                                    </Link>
                              ))}
                        </nav>

                        <div className="hidden md:flex items-center">
                              <Link
                                    to="/trips"
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-orange-600 text-white text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:gap-3"
                              >
                                    Let's Travel
                                    <ArrowUpRight className="w-4 h-4 text-orange-400" />
                              </Link>
                        </div>

                        <button
                              onClick={() => setIsOpen(!isOpen)}
                              className="md:hidden p-2 rounded-full text-slate-700 hover:bg-stone-100 focus:outline-none"
                              aria-label="Toggle menu"
                        >
                              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                  </div>

                  {isOpen && (
                        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
                              {navLinks.map((link) => (
                                    <Link
                                          key={link.path}
                                          to={link.path}
                                          onClick={() => setIsOpen(false)}
                                          className={`block px-4 py-3 rounded-2xl text-base font-medium transition-colors ${isActive(link.path)
                                                ? 'bg-orange-50 text-orange-600 font-semibold'
                                                : 'text-slate-700 hover:bg-stone-50'
                                                }`}
                                    >
                                          {link.name}
                                    </Link>
                              ))}
                              <Link
                                    to="/trips"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-center w-full py-3 rounded-2xl bg-orange-500 text-white font-medium shadow-sm hover:bg-orange-600"
                              >
                                    Let's Travel
                              </Link>
                        </div>
                  )}
            </header>
      );
};

export default Navbar;
