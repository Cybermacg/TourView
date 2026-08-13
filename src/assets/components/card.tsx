import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";

interface CountryCardProps {
    image: string;
    imageAlt?: string;
    name: string;
    subtitle: string;
    flagEmoji?: string;
    currencySymbol?: string;
    currencyName?: string;
    countryCode?: string;
    mapsLink?: string;
}

export const Card = ({
    image,
    imageAlt,
    name,
    subtitle,
    currencySymbol,
    currencyName,
    countryCode,
    mapsLink,
}: CountryCardProps) => {
    const [liked, setLiked] = useState(false);

    return (
        <motion.div
            whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group bg-white/80 backdrop-blur-sm rounded-[42px] p-1.5 shadow-lg flex flex-col max-w-[300px] h-120 w-full"
        >
            {/* Image container — tall, with overlaid content */}
            <div className="relative w-full rounded-[38px] overflow-hidden aspect-[3/5]">
                <img
                    src={image}
                    alt={imageAlt || name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                />

                {/* Heart button — top right */}
                <button
                    onClick={() => setLiked(!liked)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white/40 z-10"
                    aria-label={liked ? "Remove from favorites" : "Add to favorites"}
                >
                    {liked ? (
                        <FaHeart className="text-red-400 text-sm drop-shadow-sm" />
                    ) : (
                        <FaRegHeart className="text-white text-sm drop-shadow-sm" />
                    )}
                </button>

                {/* Soft gradient above glass panel for smooth transition */}
                <div className="absolute inset-x-0  bottom-0 h-[60%] bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />

                {/* Frosted glass panel */}
                <div className="absolute inset-x-0 bottom-0 z-10">
                    <div className=" rounded-b-[24px] bg-white/5 backdrop-blur-[2px]  p-5 flex flex-col gap-3">
                        {/* Name & subtitle */}
                        <div>
                            <h3 className="text-[22px] font-semibold text-white font-fair leading-tight drop-shadow-md">
                                {name}
                            </h3>
                            <p className="text-[13px] text-white font-rope mt-0.5">
                                {subtitle}
                            </p>
                        </div>

                        {/* Info chips row */}
                        <div className="flex items-center gap-4 text-sm text-white font-rope">
                            {currencySymbol && (
                                <span className="flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span className="font-medium">{currencyName ?? currencySymbol}</span>
                                </span>
                            )}
                            {countryCode && (
                                <span className="flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-semibold tracking-wide">{countryCode}</span>
                                </span>
                            )}
                        </div>

                        {/* Thin glass divider */}
                        <div className="w-full h-px bg-white/15" />

                        {/* CTA button */}
                        <a
                            href={mapsLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full bg-white/90 hover:bg-white text-[#1D1C18] text-sm font-semibold font-rope py-3 rounded-full transition-all duration-200 shadow-sm backdrop-blur-sm"
                        >
                            Explore on map
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};