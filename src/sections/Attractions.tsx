import { useSearchPlace } from "@/hooks/usePoi";
import { useSearchStore } from "@/store/SearchValueStore";
import { useSearchCountry } from "@/hooks/useRestClient";
import { FaExternalLinkAlt } from "react-icons/fa";
import { PulsingRing } from "@/assets/spinner";

export const Attractions = () => {
    const searchTerm = useSearchStore((state) => state.searchTerm);
    const { data: countryData } = useSearchCountry(searchTerm);
    const coordinates = countryData?.[0]?.coordinates;
    const { data: attractionData, isLoading, isError } = useSearchPlace(
        coordinates?.lat,
        coordinates?.lng
    );
    const placesInfo = attractionData?.features;

    return (
        <section className="w-full flex items-center justify-center bg-[#121010] px-4 md:px-8 py-24 md:py-20">
            <div className="w-full max-w-5xl flex flex-col gap-10">
                {/* Section Header */}
                <div className="space-y-3">
                    <p className="text-sm font-rope font-semibold tracking-widest uppercase text-[#CC8B3C]">
                        Explore
                    </p>
                    <h2 className="text-3xl md:text-5xl text-white font-fair font-semibold">
                        Top Attractions
                    </h2>
                    <p className="text-sm md:text-base text-[#8C7A65] font-rope">
                        Must-visit sights and landmarks near{" "}
                        {countryData?.[0]?.names?.common ?? "your destination"},
                        curated for the discerning traveler.
                    </p>
                </div>

                {/* Loading / Error */}
                {isLoading && <PulsingRing />}
                {isError && (
                    <p className="text-red-500 font-rope bg-red-500/10 px-6 py-3 rounded-xl">
                        Something went wrong fetching attractions.
                    </p>
                )}

                {/* Places Content */}
                {placesInfo && placesInfo.length > 0 && (
                    <>
                        {/* Mobile Card Layout (< md) */}
                        <div className="flex flex-col gap-4 md:hidden">
                            {placesInfo.map((place, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-3 p-5 rounded-2xl border border-[#2A2420] bg-[#1A1614] hover:border-[#CC8B3C]/40 transition-colors duration-300 shadow-md"
                                >
                                    {/* Top Row: Number, Name & Map Action */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            <span className="text-[#CC8B3C] font-rope font-bold text-base shrink-0 pt-0.5">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <h3 className="text-white font-fair font-semibold text-base leading-snug">
                                                {place.properties.name}
                                            </h3>
                                        </div>
                                        <a
                                            href={`https://www.google.com/maps?q=${place.properties.lat},${place.properties.lon}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 rounded-full border border-[#3A3430] flex items-center justify-center text-white/70 hover:text-[#CC8B3C] hover:border-[#CC8B3C]/60 transition-all shrink-0"
                                            title="View on Google Maps"
                                        >
                                            <FaExternalLinkAlt className="text-xs" />
                                        </a>
                                    </div>

                                    {/* Categories */}
                                    {place.properties.categories && place.properties.categories.length > 0 && (
                                        <div className="flex gap-2 flex-wrap">
                                            {place.properties.categories.map((cat, catIndex) => {
                                                const label = cat.split(".").pop()?.toUpperCase();
                                                return (
                                                    <span
                                                        className="px-2.5 py-0.5 text-[10px] font-rope font-bold uppercase tracking-wide rounded-md text-[#FFB84D] bg-[#FFB84D]/15"
                                                        key={catIndex}
                                                    >
                                                        {label}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Footer Info: City & Coordinates */}
                                    <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5 text-white/60 font-rope">
                                        <span className="truncate">
                                            {place.properties.city ?? "Location unknown"}
                                        </span>
                                        <span className="font-mono text-[11px] text-white/40 shrink-0 ml-2">
                                            {place.properties.lat?.toFixed(4)}, {place.properties.lon?.toFixed(4)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table Layout (>= md) */}
                        <div className="hidden md:block w-full overflow-x-auto pb-2">
                            <div className="flex flex-col gap-4 min-w-[720px]">
                                {/* Column Headers */}
                                <div className="grid grid-cols-[60px_1fr_1fr_120px_140px_70px] items-center px-6 py-3 text-xs font-rope font-semibold uppercase tracking-wider text-[#8C7A65]">
                                    <span>#</span>
                                    <span>Name</span>
                                    <span>Category</span>
                                    <span>City</span>
                                    <span>Coordinates</span>
                                    <span className="text-right">Action</span>
                                </div>

                                {/* Rows */}
                                {placesInfo.map((place, index) => (
                                    <div
                                        className="group grid grid-cols-[60px_1fr_1fr_120px_140px_70px] items-center px-6 py-5 rounded-xl border border-[#2A2420] bg-[#1A1614] hover:border-[#CC8B3C]/40 transition-colors duration-300"
                                        key={index}
                                    >
                                        {/* Number */}
                                        <span className="text-[#CC8B3C] font-rope font-bold text-base">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        {/* Name */}
                                        <h3 className="text-white font-fair font-semibold text-base truncate pr-4">
                                            {place.properties.name}
                                        </h3>

                                        {/* Categories */}
                                        <div className="flex gap-2 flex-wrap">
                                            {place.properties.categories?.map((cat, catIndex) => {
                                                const label = cat.split(".").pop()?.toUpperCase();
                                                return (
                                                    <span
                                                        className="px-3 py-1 text-[11px] font-rope font-bold uppercase tracking-wide rounded-md text-[#FFB84D] bg-[#FFB84D]/15"
                                                        key={catIndex}
                                                    >
                                                        {label}
                                                    </span>
                                                );
                                            })}
                                        </div>

                                        {/* City */}
                                        <span className="text-white/70 font-rope text-sm truncate">
                                            {place.properties.city ?? "—"}
                                        </span>

                                        {/* Coordinates */}
                                        <span className="text-white/50 font-mono text-xs leading-relaxed">
                                            {place.properties.lat?.toFixed(4)},
                                            <br />
                                            {place.properties.lon?.toFixed(4)}
                                        </span>

                                        {/* Action */}
                                        <div className="flex justify-end">
                                            <a
                                                href={`https://www.google.com/maps?q=${place.properties.lat},${place.properties.lon}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-9 h-9 rounded-full border border-[#3A3430] flex items-center justify-center text-white/60 hover:text-[#CC8B3C] hover:border-[#CC8B3C]/60 transition-all duration-300"
                                                title="View on Google Maps"
                                            >
                                                <FaExternalLinkAlt className="text-xs" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};