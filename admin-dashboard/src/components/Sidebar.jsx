import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Package, Camera, LogOut, Compass } from 'lucide-react';

const NAV = [
      { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/packages', icon: Package, label: 'Packages' },
      { path: '/gallery', icon: Camera, label: 'Gallery' },
];

export default function Sidebar({ user, onLogout, toursCount, photosCount }) {
      return (
            <aside className="w-[220px] bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 h-screen py-4 z-40 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out">
                  <Link to="/" className="flex items-center gap-2.5 group ml-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                              <Compass className="w-5 h-5 animate-pulse" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                              Travel<span className="text-orange-500">.</span>
                        </h1>
                  </Link>
                  <nav className="flex flex-col flex-1 px-3 py-4 mt-4 gap-1.5">
                        {NAV.map(({ path, icon: Icon, label }) => (
                              <NavLink
                                    key={path}
                                    to={path}
                                    end={path === '/'}
                                    className={({ isActive }) =>
                                          `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all relative w-full text-left cursor-pointer border-none outline-none ${isActive
                                                ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-semibold shadow-sm'
                                                : 'text-slate-500 hover:bg-amber-50 hover:text-amber-600'
                                          }`
                                    }
                              >
                                    {({ isActive }) => (
                                          <>
                                                <Icon size={17} className="shrink-0" />
                                                <span>{label}</span>
                                                {path === '/packages' && toursCount > 0 && (
                                                      <span className={`ml-auto text-[8px] font-bold rounded-full px-2 py-1 min-w-[20px] text-center ${isActive ? 'bg-white/30 text-white' : 'bg-orange-600 text-white'
                                                            }`}>
                                                            {toursCount}
                                                      </span>
                                                )}
                                                {path === '/gallery' && photosCount > 0 && (
                                                      <span className={`ml-auto text-[8px] font-bold rounded-full px-2 py-1 min-w-[20px] text-center ${isActive ? 'bg-white/30 text-white' : 'bg-orange-600 text-white'
                                                            }`}>
                                                            {photosCount}
                                                      </span>
                                                )}
                                          </>
                                    )}
                              </NavLink>
                        ))}
                  </nav>
                  <div className="p-4 border-t border-slate-200 flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                              {(user?.name || user?.email || 'A')[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm truncate text-slate-800">{user?.name || 'Admin'}</div>
                              <div className="text-[10px] text-orange-500 font-medium">Administrator</div>
                        </div>
                        <button onClick={onLogout} title="Logout" className="text-slate-400 hover:text-orange-500 transition-colors p-1 rounded-lg">
                              <LogOut size={16} />
                        </button>
                  </div>
            </aside>
      );
}

