import { useState } from "react";
import FormFieldset from "../components/FormFieldSet.jsx";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom"; 

export default function RegisterPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        kelompok: "",
        nim: "",
        role: "admin",
        pin: ""
    });

    async function handleRegister(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await api.postRegister(form);
            navigate("/");
        } catch (err) {
            console.error(err.message);
            alert("Registration failed: " + err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse" 
                     style={{ animationDuration: '5s' }}></div>
                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse" 
                     style={{ animationDuration: '7s', animationDelay: '1.5s' }}></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full max-w-md">
                <div className="backdrop-blur-sm bg-white/90 rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
                    {/* Header with gradient accent */}
                    <div className="relative h-2 bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600"></div>
                    
                    <div className="p-8 sm:p-10">
                        {/* Logo/Brand area */}
                        <div className="text-center mb-8 animate-fade-in">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 mb-4 shadow-lg shadow-purple-500/30">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2" 
                                style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Create Account
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Join us and start your journey today
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleRegister} className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            {/* Name Field */}
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 
                                             focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 
                                             transition-all duration-300 hover:border-purple-300 shadow-sm"
                                    required
                                />
                            </div>

                            {/* Kelompok Field */}
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
                                    Kelompok
                                </label>
                                <input
                                    type="text"
                                    name="kelompok"
                                    value={form.kelompok}
                                    onChange={(e) => setForm({ ...form, kelompok: e.target.value })}
                                    placeholder="P1"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 
                                             focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 
                                             transition-all duration-300 hover:border-purple-300 shadow-sm"
                                    required
                                />
                            </div>

                            {/* NIM Field */}
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
                                    NIM
                                </label>
                                <input
                                    type="text"
                                    name="nim"
                                    value={form.nim}
                                    onChange={(e) => setForm({ ...form, nim: e.target.value })}
                                    placeholder="202311420001"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 
                                             focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 
                                             transition-all duration-300 hover:border-purple-300 shadow-sm"
                                    required
                                />
                            </div>

                            {/* PIN Field */}
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
                                    PIN
                                </label>
                                <input
                                    type="password"
                                    name="pin"
                                    value={form.pin}
                                    onChange={(e) => setForm({ ...form, pin: e.target.value })}
                                    placeholder="••••"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 
                                             focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 
                                             transition-all duration-300 hover:border-purple-300 shadow-sm"
                                    required
                                />
                                <p className="mt-1.5 text-xs text-gray-500">
                                    Choose a secure 4-digit PIN
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-6 py-3.5 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl
                                         hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-white
                                         transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]
                                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : "Create Account"}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <a 
                                    href="/" 
                                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 hover:underline underline-offset-2"
                                >
                                    Sign in instead
                                </a>
                            </p>
                        </div>

                        {/* Terms */}
                        <div className="mt-6 text-center text-xs text-gray-500 animate-fade-in" style={{ animationDelay: '0.25s' }}>
                            <p>
                                By creating an account, you agree to our{" "}
                                <a href="#" className="text-gray-600 hover:text-gray-700 transition-colors">
                                    Terms of Service
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional info */}
                <div className="mt-6 text-center text-gray-500 text-xs animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <p>Your data is protected with enterprise-grade security</p>
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