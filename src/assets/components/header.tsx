import { FaArrowRight, FaBars } from "react-icons/fa6";
import { useState } from "react";

export const Header = () => {

     interface navLinks{
        id: number,
        text: string,
    } 

    const links: navLinks[] =[
        {
            id: 0,
            text: "Insights",
        },

        {
            id: 1,
            text: "Discover",
        },

        {
            id: 2,
            text: "Attractions",
        },

        {
            id: 3,
            text: "Map",
        },
    ]

    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
            <nav className="w-full bg-transparent backdrop-blur-xl border border-white/20 rounded-full px-6 md:px-8 py-3 flex flex-row justify-between items-center shadow-2xl">
                
                {/* company logo */}
                <div>
                    <h1 className="font-play font-extrabold text-[20px] md:text-[24px] text-white tracking-wide">Tourview</h1>
                </div>

                {/* navlinks - hidden on mobile */}
                <div className="hidden md:block">
                    <ul className="flex text-white/90 font-rope font-medium flex-row gap-6">
                        {links.map((link) => {
                            return(
                                <li key={link.id} className="hover:text-white cursor-pointer transition-colors">{link.text}</li>
                            )
                        })}
                    </ul>
                </div>

                {/* cta button - hidden on mobile */}
                <div className="hidden md:block">
                    <button className="flex bg-[#825505] hover:bg-[#996406] px-6 py-2 rounded-full text-white font-rope font-medium flex-row gap-2 items-center cursor-pointer transition-colors shadow-md">Book now <FaArrowRight /></button>
                </div>

                {/* mobile menu button */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-[20px] cursor-pointer">
                    <FaBars />
                </button>
            </nav>

            {/* mobile dropdown menu */}
            {menuOpen && (
                <div className="md:hidden mt-3 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
                    <ul className="flex flex-col text-white/90 font-rope font-medium gap-4">
                        {links.map((link) => {
                            return(
                                <li key={link.id} className="hover:text-white cursor-pointer transition-colors">{link.text}</li>
                            )
                        })}
                    </ul>
                    <button className="mt-4 w-full flex justify-center bg-[#825505] hover:bg-[#996406] px-6 py-2 rounded-full text-white font-rope font-medium flex-row gap-2 items-center cursor-pointer transition-colors shadow-md">Book now <FaArrowRight /></button>
                </div>
            )}
        </header>
    )
}