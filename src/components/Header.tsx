import spotify_logo from "../assets/spo_logo.png";
import home_icon from "../assets/home-icon.png";
import search from "../assets/search-icon.png";
import bell from "../assets/bell.png";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="bg-black flex items-center text-white h-16 px-3 md:px-4 justify-between sticky top-0 z-50">
      {/* logo */}
      <div>
        <img src={spotify_logo} alt="logo" className="h-8 md:h-10" />
      </div>

      {/* middle section */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* home */}
        <NavLink
          to="/"
          className="rounded-full bg-[#1f1f1f] p-2 md:p-2.5 hover:bg-[#2a2a2a]"
        >
          <img src={home_icon} alt="home" className="h-5 md:h-6" />
        </NavLink>

        {/* search */}
        <div className="flex items-center gap-2 bg-[#1f1f1f] px-3 md:px-4 py-2 rounded-3xl">
          <img src={search} alt="" className="h-4 md:h-5 opacity-70" />

          <input
            type="text"
            placeholder="What do you want to play?"
            className="
              bg-transparent outline-none text-white
              placeholder:text-[#b3b3b3]
              w-24 sm:w-40 md:w-80
            "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />

          {/* hide browse on small screens */}
          <span className="hidden md:block text-gray-400">|</span>

          <button className="hidden md:block text-gray-400 hover:text-white">
            Browse
          </button>
        </div>
      </div>

      {/* right side */}
      <div className="flex items-center gap-2 md:gap-6">
        {/* hide on mobile */}
        <button className="hidden sm:block text-black bg-white rounded-2xl font-semibold text-[12px] md:text-[13px] px-3 md:px-4 py-1.5">
          Explore Premium
        </button>

        <button className="hidden md:block text-[#b3b3b3] text-[13px] font-semibold hover:text-white">
          Install App
        </button>

        <button className="hidden sm:block">
          <img
            src={bell}
            alt=""
            className="h-5 md:h-6 opacity-80 hover:opacity-100"
          />
        </button>

        {/* profile always visible */}
        <button className="w-7 h-7 md:w-8 md:h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">
          S
        </button>
      </div>
    </div>
  );
};

export default Header;
