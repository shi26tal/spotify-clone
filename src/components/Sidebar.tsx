import home from '../assets/home-icon.png'
import search from '../assets/search-icon.png'
import menu from '../assets/menu_icon.png'
import type { JSX } from 'react'
import { NavLink } from 'react-router-dom'

type SidebarProps = {
   sidebarOpen:boolean
 setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ sidebarOpen, setSidebarOpen}: SidebarProps):JSX.Element => {

    const toggleSidebar = () =>{
        setSidebarOpen(prev => !prev);
    }

  return (
    <div
      className={`
        bg-black text-[#b3b3b3] h-full p-4 flex flex-col gap-6
        transition-all duration-300
        ${sidebarOpen ? "w-60" : "w-16"}
      `}
    >

      {/* MENU BUTTON */}
      <div
        className="flex items-center gap-3 hover:text-white cursor-pointer"
        onClick={toggleSidebar}
      >
        <img src={menu} className="h-5" />
        {sidebarOpen && <span>Menu</span>}
      </div>

      {/* HOME */}
      <NavLink to='/' className="flex items-center gap-3 hover:text-white cursor-pointer">
        <img src={home} className="h-5" />
        {sidebarOpen && <span>Home</span>}
      </NavLink>

      {/* SEARCH */}
      <NavLink to='search' className="flex items-center gap-3 hover:text-white cursor-pointer">
        <img src={search} className="h-5" />
        {sidebarOpen && <span>Search</span>}
      </NavLink>

      {/* LIBRARY */}
      {sidebarOpen && (
        <div className="mt-6">
          <NavLink to='library' className="text-white font-semibold"><span className='mb-3'>Library</span></NavLink>

          <div className="flex flex-col gap-2 text-sm">
            <p className="hover:text-white cursor-pointer">Liked Songs</p>
            <p className="hover:text-white cursor-pointer">Recently Played</p>
            <p className="hover:text-white cursor-pointer">Your Episodes</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Sidebar