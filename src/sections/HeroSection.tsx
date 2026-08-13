import { useState, useEffect } from "react"
import { usePexelSearch } from "../hooks/usePexelsClient"
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from "../assets/components/header";
import { useSearchStore } from "../store/SearchValueStore";


interface heroSlideShowProps {
    interval?: number,
}
export function HeroSection({ interval = 5000 }: heroSlideShowProps) {
    const [index, setIndex] = useState(0)
    const [input, setInput] = useState('nature');
    const [searchValue, setSearchValue] = useState('nature');
    const { data, isLoading, isError } = usePexelSearch(searchValue);
    const photos = data?.photos ?? [];
    const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

    const handleSearch = () => {
        const trimmed = input.trim();
        setSearchValue(trimmed);
        setSearchTerm(trimmed);
        setIndex(0);
    }

    useEffect(() => {
        if (photos.length <= 1) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % photos.length);
        }, interval);

        return () => clearInterval(timer);
    }, [photos.length, interval]);

    // Render the section even when photos array is initially empty


    return (
        <section className="relative">
            <Header />
            <main className="relative w-full h-screen overflow-hidden flex items-center justify-center">

                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0 bg-slate-950">
                    {photos.length > 0 ? (
                        <AnimatePresence mode="popLayout">
                            <motion.img
                                key={photos[index]?.id}
                                src={photos[index]?.src.large2x}
                                alt={photos[index]?.alt || "Travel destination"}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-center"
                            />
                        </AnimatePresence>
                    ) : (
                        <div className="w-full h-full bg-slate-900" />
                    )}
                    {/* Dark overlay for text contrast */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10 pointer-events-none" />
                </div>

                {/* Foreground Content Layer */}
                <div className="relative z-10 w-full max-w-3xl px-4 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
                        Explore The World
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl drop-shadow">
                        Discover stunning landscapes, cities, and travel destinations around the globe.
                    </p>

                    <div className="flex w-full items-center bg-white/20 backdrop-blur-xl p-2 rounded-full border border-white/30 shadow-2xl focus-within:border-white/60 transition-all">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Search for a City..."
                            className="w-full bg-transparent px-6 py-3 text-white  placeholder-slate-200 outline-none text-base md:text-lg"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3 rounded-full transition-colors cursor-pointer shrink-0 shadow-lg"
                        >
                            Search
                        </button>
                    </div>

                    {isLoading && <p className="text-white/80 mt-4 animate-pulse">Loading destinations...</p>}
                    {isError && <p className="text-red-400 mt-4 bg-red-950/60 px-4 py-2 rounded-lg">Something went wrong fetching images.</p>}
                </div>
            </main>
        </section>
    )
}