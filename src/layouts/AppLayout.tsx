import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MusicPlayer from "../components/MusicPlayer";


const AppLayout = () => {

      const[sidebarOpen,setSidebarOpen] = useState<boolean>(true)

  return (
    <div className="h-screen flex flex-col">

      {/* header */}
      <Header />

      {/* main content area */}
      <div className="flex flex-1 overflow-hidden">

        {/* sidebar */}
        <Sidebar 
        sidebarOpen = {sidebarOpen}
        setSidebarOpen = {setSidebarOpen}
        />

        {/* page content */}
       <main className="flex-1 overflow-y-auto bg-[#121212] p-2 md:p-4">
          <Outlet />
        </main>

        {/* bottom */}
        <MusicPlayer />


      </div>

    </div>
  )
}

export default AppLayout