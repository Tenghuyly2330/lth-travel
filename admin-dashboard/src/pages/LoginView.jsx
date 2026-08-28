import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Motorbike } from 'lucide-react';
import { loginAdmin } from '../api/api';

export default function LoginView({ onLogin }) {
      const [email, setEmail] = useState('admin@travel.com');
      const [password, setPassword] = useState('admin123');
      const [showPass, setShowPass] = useState(false);
      const [loginError, setLoginError] = useState('');
      const [loggingIn, setLoggingIn] = useState(false);

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoginError('');
            setLoggingIn(true);
            try {
                  const res = await loginAdmin(email, password);
                  localStorage.setItem('admin_token', res.data.token);
                  onLogin(res.data.token, res.data.user);
            } catch (err) {
                  setLoginError(err.response?.data?.message || 'Login failed. Please check credentials.');
            } finally {
                  setLoggingIn(false);
            }
      };

      return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center p-4 relative overflow-hidden">
                  <div className="absolute bg-white/60 rounded-full blur-[2px]" style={{ width: 200, height: 60, bottom: 80, left: -20 }} />
                  <div className="absolute bg-white/60 rounded-full blur-[2px]" style={{ width: 260, height: 70, bottom: 40, right: -40 }} />
                  <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-8 sm:p-10 w-full max-w-md shadow-2xl shadow-orange-500/10 relative z-10">
                        <div className="w-14 h-14 bg-white/90 border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md text-2xl">
                              <Motorbike />
                        </div>
                        <h1 className="text-center text-2xl font-bold text-slate-900 mb-1">Sign in with email</h1>
                        <p className="text-center text-xs text-slate-500 mb-7 leading-relaxed">Admin access only.</p>
                        {loginError && (
                              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-xs flex items-center gap-2 mb-4">
                                    <AlertCircle size={15} /><span>{loginError}</span>
                              </div>
                        )}
                        <form onSubmit={handleSubmit}>
                              <div className="relative mb-3.5">
                                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    <input type="email" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm bg-white/80 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all placeholder:text-slate-400 text-slate-900" placeholder="Email" value={email}
                                          onChange={e => setEmail(e.target.value)} required id="admin-email" />
                              </div>
                              <div className="relative mb-3">
                                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    <input type={showPass ? 'text' : 'password'} className="w-full pl-10 pr-11 py-3 border border-slate-200 rounded-xl text-sm bg-white/80 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all placeholder:text-slate-400 text-slate-900" placeholder="Password"
                                          value={password} onChange={e => setPassword(e.target.value)} required id="admin-password" />
                                    <button type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer border-none bg-transparent" onClick={() => setShowPass(!showPass)}>
                                          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                              </div>
                              <a href="#" className="block text-right text-xs text-slate-500 hover:text-orange-500 transition-colors mb-5">Forgot password?</a>
                              <button type="submit" className="w-full py-3.5 bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-none rounded-xl text-sm font-bold cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md mb-5" disabled={loggingIn} id="login-submit">
                                    {loggingIn ? 'Signing in…' : 'Get Started'}
                              </button>
                        </form>
                        {/* <div className="flex items-center gap-3 text-slate-400 text-xs mb-4 before:flex-1 before:h-px before:bg-slate-200 after:flex-1 after:h-px after:bg-slate-200">Or sign in with</div>
                        <div className="flex justify-center gap-4">
                              <button className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:border-orange-400 hover:shadow-sm transition-all cursor-pointer" title="Google">
                                    <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                              </button>
                              <button className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:border-orange-400 hover:shadow-sm transition-all cursor-pointer" title="Facebook">
                                    <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                              </button>
                              <button className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:border-orange-400 hover:shadow-sm transition-all cursor-pointer" title="Apple">
                                    <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                              </button>
                        </div> */}
                  </div>
            </div>
      );
}

