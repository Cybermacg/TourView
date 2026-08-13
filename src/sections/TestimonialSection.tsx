import { useState } from "react";

export const TestimonialSection = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 4000);
        }
    };

    return (
        <section className="w-full bg-[#121010] text-white flex flex-col items-center pt-20 md:pt-28 pb-16 px-4 md:px-8">
            <div className="w-[80%] max-w-7xl flex flex-col gap-20">
                {/* Top Grid: Voices of Discovery & Curated Recommendations */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Voices of Discovery */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        <h2 className="text-3xl md:text-5xl font-fair font-semibold text-white tracking-tight">
                            Voices of Discovery
                        </h2>

                        <div className="flex flex-col gap-8 mt-2">
                            {/* Testimonial 1 */}
                            <div className="border-l-2 border-[#CC8B3C] pl-6 flex flex-col gap-4">
                                <p className="italic text-white/80 font-rope text-base md:text-lg leading-relaxed">
                                    "The depth of data provided by Tourview transformed our expedition from a simple trip into a profound ecological study. Absolutely indispensable."
                                </p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                                        alt="Dr. Elena Rostova"
                                        className="w-11 h-11 rounded-full object-cover border border-white/20"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div>
                                        <h4 className="font-fair font-semibold text-white text-base">
                                            Dr. Elena Rostova
                                        </h4>
                                        <p className="font-rope text-[11px] text-[#8C7A65] tracking-widest uppercase font-semibold">
                                            CLIMATE RESEARCHER
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="border-l-2 border-[#CC8B3C] pl-6 flex flex-col gap-4">
                                <p className="italic text-white/80 font-rope text-base md:text-lg leading-relaxed">
                                    "Unparalleled insights into cultural nuances. The platform's architectural elegance is matched only by the richness of its information."
                                </p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                                        alt="James Chen"
                                        className="w-11 h-11 rounded-full object-cover border border-white/20"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div>
                                        <h4 className="font-fair font-semibold text-white text-base">
                                            James Chen
                                        </h4>
                                        <p className="font-rope text-[11px] text-[#8C7A65] tracking-widest uppercase font-semibold">
                                            DOCUMENTARY FILMMAKER
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Curated Recommendations */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <h3 className="text-2xl md:text-3xl font-fair font-semibold text-white tracking-tight">
                            Curated Recommendations
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                            {/* Card 1 */}
                            <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-[#2A2420] bg-[#1A1614] hover:border-[#CC8B3C]/50 transition-all duration-300 cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop"
                                    alt="Highlands Heritage Tour"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                                <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col gap-1">
                                    <span className="text-[11px] font-rope font-bold text-[#FFB84D] uppercase tracking-wider">
                                        CULTURE
                                    </span>
                                    <h4 className="text-base font-fair font-semibold text-white leading-tight">
                                        Highlands Heritage Tour
                                    </h4>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-[#2A2420] bg-[#1A1614] hover:border-[#CC8B3C]/50 transition-all duration-300 cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop"
                                    alt="Sustainable Bamboo Retreats"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                                <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col gap-1">
                                    <span className="text-[11px] font-rope font-bold text-[#FFB84D] uppercase tracking-wider">
                                        ECOLOGY
                                    </span>
                                    <h4 className="text-base font-fair font-semibold text-white leading-tight">
                                        Sustainable Bamboo Retreats
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Component */}
                <footer className="w-full rounded-3xl bg-[#1A1614] border border-[#2A2420] p-8 md:p-12 flex flex-col gap-10 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                        {/* Brand & Newsletter */}
                        <div className="md:col-span-6 flex flex-col gap-4">
                            <h3 className="text-2xl font-fair font-bold text-white tracking-wide">
                                Tourview
                            </h3>
                            <p className="text-sm font-rope text-white/70 max-w-sm leading-relaxed">
                                Empowering your journeys with unparalleled data, cultural insights, and ecological awareness.
                            </p>

                            <div className="flex flex-col gap-2 mt-2">
                                <p className="text-[11px] font-rope font-bold text-[#8C7A65] tracking-widest uppercase">
                                    SUBSCRIBE TO DATA DIGEST
                                </p>
                                <form onSubmit={handleSubscribe} className="flex items-center bg-[#241F1C] rounded-full p-1.5 border border-white/10 focus-within:border-[#CC8B3C]/60 transition-colors max-w-md">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email address"
                                        className="bg-transparent px-4 py-2 text-sm text-white placeholder-white/40 outline-none w-full font-rope"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-[#825505] hover:bg-[#996406] text-white font-rope text-xs font-semibold px-6 py-2.5 rounded-full transition-colors shrink-0 cursor-pointer shadow-md"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                                {subscribed && (
                                    <p className="text-xs font-rope text-[#FFB84D] mt-1 animate-pulse">
                                        Thanks for subscribing to Tourview!
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div className="md:col-span-6 grid grid-cols-2 gap-8">
                            {/* Column 1: EXPLORE */}
                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-rope font-bold text-[#8C7A65] tracking-widest uppercase mb-1">
                                    EXPLORE
                                </p>
                                <ul className="flex flex-col gap-2.5 text-sm font-rope text-white/70">
                                    <li className="hover:text-white transition-colors cursor-pointer">Destinations</li>
                                    <li className="hover:text-white transition-colors cursor-pointer">Ecological Data</li>
                                    <li className="hover:text-white transition-colors cursor-pointer">Cultural Archives</li>
                                    <li className="hover:text-white transition-colors cursor-pointer">Interactive Maps</li>
                                </ul>
                            </div>

                            {/* Column 2: COMPANY */}
                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-rope font-bold text-[#8C7A65] tracking-widest uppercase mb-1">
                                    COMPANY
                                </p>
                                <ul className="flex flex-col gap-2.5 text-sm font-rope text-white/70">
                                    <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                                    <li className="hover:text-white transition-colors cursor-pointer">Methodology</li>
                                    <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                                    <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col gap-6 pt-4">
                        <div className="w-full h-px bg-white/10" />
                        <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-rope text-white/50 gap-4">
                            <p>© 2024 Tourview Discovery. All rights reserved.</p>
                            <div className="flex items-center gap-6">
                                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
};
