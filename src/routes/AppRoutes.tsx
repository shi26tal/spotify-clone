import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home_Page from "../pages/Home_Page";
import Search from "../pages/Search";
import Library from "../pages/Library";
import type { JSX } from "react";
import Playlist from "../pages/Playlist";
import TrackDetails from "../pages/TrackDetails";
import LikedSongs from "../pages/LikedSongs";
import ArtistPage from "../pages/ArtistPage";

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home_Page />}></Route>
        <Route path="search" element={<Search />}></Route>
        <Route path="library" element={<Library />}></Route>
        <Route path="playlist/:id" element={<Playlist />}></Route>
        <Route path="track/:id" element={<TrackDetails />}></Route>
        <Route path="playlist/:id" element={<Playlist />}></Route>
        <Route path="liked-songs" element={<LikedSongs />}></Route>
        <Route path="artist/:id" element={<ArtistPage />}></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
