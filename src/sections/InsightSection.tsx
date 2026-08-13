import { Card } from "../assets/components/card";
import { PulsingRing } from "../assets/spinner";
import { useSearchCountry } from "../hooks/useRestClient";
import { usePexelSearch } from "../hooks/usePexelsClient";
import { useSearchStore } from "../store/SearchValueStore";
import {
    FaUsers,
    FaLanguage,
    FaMoneyBillWave,
    FaGlobeAfrica,
    FaMapMarkedAlt,
    FaClock,
} from "react-icons/fa";

export const InsightSection = () => {
    const searchTerm = useSearchStore((state) => state.searchTerm);
    const { data, isLoading, isError } = useSearchCountry(searchTerm);
    const { data: pexelsData } = usePexelSearch(searchTerm, 6);
    const photos = pexelsData?.photos ?? [];
    const country = data?.[0];

    // format helpers
    function formatPopulation(population: number) {
        if (population >= 1_000_000_000) {
            return `${(population / 1_000_000_000).toFixed(2)}B`;
        } else if (population >= 1_000_000) {
            return `${(population / 1_000_000).toFixed(2)}M`;
        } else if (population >= 1_000) {
            return `${(population / 1_000).toFixed(2)}K`;
        }
        return population.toString();
    }

    function formatArea(km: number) {
        if (km >= 1_000_000) {
            return `${(km / 1_000_000).toFixed(2)}M km²`;
        } else if (km >= 1_000) {
            return `${(km / 1_000).toFixed(1)}K km²`;
        }
        return `${km} km²`;
    }

    return (
        <section className="w-full min-h-screen flex flex-col gap-10 md:gap-14 bg-black items-center justify-center px-4 md:px-8 py-24 md:py-20">
            {/* Section Header */}
            <div className="text-center space-y-3 max-w-2xl">
                <p className="text-sm font-rope font-semibold tracking-widest uppercase text-[#CC8B3C]">
                    Discover
                </p>
                <h2 className="text-3xl md:text-5xl text-white font-fair font-semibold">
                    Comprehensive Insights
                </h2>
                <p className="text-sm md:text-base text-[#8C7A65] font-rope">
                    A deep dive into data that defines our world's most
                    fascinating regions
                </p>
            </div>

            {/* Loading / Error */}
            {isLoading && <PulsingRing />}
            {isError && (
                <p className="text-red-500 font-rope bg-red-50 px-6 py-3 rounded-xl">
                    Something went wrong fetching country data.
                </p>
            )}

            {/* Stats bar — landscape card style */}
            {country && (
                <div className="w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl p-1.5 bg-[#1C1816] border border-[#2A2420]">
                    <div className="relative w-full rounded-[26px] overflow-hidden bg-slate-900">
                        {/* Background image */}
                        {photos.length > 0 ? (
                            <img
                                src={photos[0]?.src.landscape}
                                alt={`${country.names.common} landscape`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover absolute inset-0"
                            />
                        ) : (
                            <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                        )}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 pointer-events-none" />

                        {/* Content over the image */}
                        <div className="relative z-10 p-6 md:p-8 flex flex-col gap-6">
                            {/* Country header row */}
                            <div className="flex items-center gap-4">
                                {country.flag.url_svg && (
                                    <div className="w-14 h-10 rounded-lg overflow-hidden shadow-md border border-white/20">
                                        <img
                                            src={country.flag.url_svg}
                                            alt={`${country.names.common} flag`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-fair font-semibold text-white drop-shadow-md">
                                        {country.names.common}
                                    </h3>
                                    <p className="text-sm text-white/70 font-rope">
                                        {country.names.official}
                                    </p>
                                </div>
                            </div>

                            {/* Frosted glass stats panel */}
                            <div className="rounded-[20px] bg-black/50 backdrop-blur-md border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] p-5 md:p-6">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
                                    <StatItem
                                        icon={<FaUsers />}
                                        label="Population"
                                        value={formatPopulation(country.population)}
                                    />
                                    <StatItem
                                        icon={<FaGlobeAfrica />}
                                        label="Region"
                                        value={country.region}
                                    />
                                    <StatItem
                                        icon={<FaMapMarkedAlt />}
                                        label="Area"
                                        value={formatArea(country.area.kilometers)}
                                    />
                                    <StatItem
                                        icon={<FaLanguage />}
                                        label="Languages"
                                        value={`${country.languages?.length ?? 0}`}
                                    />
                                    <StatItem
                                        icon={<FaMoneyBillWave />}
                                        label="Currency"
                                        value={country.currencies?.[0]?.name ?? "N/A"}
                                    />
                                    <StatItem
                                        icon={<FaClock />}
                                        label="Timezones"
                                        value={`${country.timezones.length}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cards Grid */}
            {country && photos.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl w-full place-items-center">
                    {photos.slice(0, 6).map((photo, i) => {
                        // Cycle through different subtitles for variety
                        const subtitles = [
                            `${country.region} · ${country.subregion ?? country.continents[0]}`,
                            `Capital: ${country.capitals?.[0]?.name ?? "N/A"}`,
                            `${country.languages?.[0]?.name ?? "Multilingual"} speaking`,
                            `${country.timezones[0]} timezone`,
                            country.government_type ?? country.names.official,
                            country.landlocked ? "Landlocked nation" : "Coastal destination",
                        ];

                        return (
                            <div key={photo.id}>
                                <Card
                                    image={photo.src.large}
                                    imageAlt={photo.alt || `${country.names.common} - ${i + 1}`}
                                    name={country.names.common}
                                    subtitle={subtitles[i % subtitles.length]}
                                    flagEmoji={country.flag.emoji}
                                    currencySymbol={country.currencies?.[0]?.symbol}
                                    currencyName={country.currencies?.[0]?.name}
                                    countryCode={country.codes?.alpha_3 ?? country.codes?.alpha_2}
                                    mapsLink={country.links.google_maps}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

/* ─── Small stat item for the summary bar ─── */

const StatItem = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}) => (
    <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-white/60">
            <span className="text-base">{icon}</span>
            <span className="text-xs font-rope font-semibold uppercase tracking-wider text-white/50">
                {label}
            </span>
        </div>
        <p className="text-lg md:text-xl font-fair font-semibold text-white leading-tight truncate drop-shadow-sm">
            {value}
        </p>
    </div>
);