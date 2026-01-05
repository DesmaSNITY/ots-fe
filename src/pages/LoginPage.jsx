import { useState } from "react";
import FormFieldset from "../components/FormFieldSet.jsx";
import { useNavigate } from "react-router-dom"; 
import { api } from "../services/api";

export default function LoginPage() {
    const [form, setForm] = useState({ nim: "", pin: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const res = await api.postLogin(form);
            localStorage.setItem("adminToken", res.token);
            navigate("/dashboard");
        } catch (err) {
            console.error(err.message);
            alert("Login failed: " + err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse" 
                     style={{ animationDuration: '4s' }}></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse" 
                     style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full max-w-md">
                <div className="backdrop-blur-sm bg-white/90 rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
                    {/* Header with gradient accent */}
                    <div className="relative h-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600"></div>
                    
                    <div className="p-8 sm:p-10">
                        {/* Logo/Brand area */}
                        <div className="text-center mb-8 animate-fade-in">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg shadow-blue-500/30">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2" 
                                style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Welcome Back
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Sign in to continue to your dashboard
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            {/* NIM Field */}
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                                    NIM
                                </label>
                                <input
                                    type="text"
                                    name="nim"
                                    value={form.nim}
                                    onChange={(e) => setForm({ ...form, nim: e.target.value })}
                                    placeholder="202311420009"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                                             transition-all duration-300 hover:border-blue-300 shadow-sm"
                                    required
                                />
                            </div>

                            {/* PIN Field */}
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                                    PIN
                                </label>
                                <input
                                    type="password"
                                    name="pin"
                                    value={form.pin}
                                    onChange={(e) => setForm({ ...form, pin: e.target.value })}
                                    placeholder="••••"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                                             transition-all duration-300 hover:border-blue-300 shadow-sm"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-6 py-3.5 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl
                                         hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white
                                         transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]
                                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : "Sign In"}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <a 
                                    href="/register" 
                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline underline-offset-2"
                                >
                                    Create one now
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional info */}
                <div className="mt-6 text-center text-gray-500 text-xs animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <p>Secure login powered by advanced encryption</p>
                </div>
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
                
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }

                .animate-slide-up {
                    animation: slide-up 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}