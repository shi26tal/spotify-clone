import { useEffect, useState } from "react";
import { getChart, getPlaylistTracksFromChart } from "../api/music";
import { useNavigate } from "react-router-dom";

type Track = {
  id: number;
  title: string;
  album: {
    cover: string;
    cover_medium: string;
  };
  artist: {
    name: string;
  };
};

type Playlist = {
  id: number;
  title: string;
  picture_medium: string;
};

type Artist = {
  id: number;
  name: string;
  picture_medium: string;
};

const Home_Page = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getChart();
        const tracksData = await getPlaylistTracksFromChart();

        setTracks(tracksData || []);

        setPlaylists(data?.playlists?.data || []);
        setArtists(data?.artists?.data || []);
      } catch (err) {
        console.log("Failed to load Deezer data", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="text-white p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Hello</h1>
        <p className="text-sm text-gray-400 mt-1">Trending music for you</p>
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-400">Loading music...</p>}

      {/* GRID */}
      {!loading && (
        <>
          <div>
            <h2 className="text-xl font-bold mb-4">Playlists</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {playlists.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/playlist/${p.id}`)}
                  className="bg-[#181818] hover:bg-[#282828] transition p-4 rounded-lg cursor-pointer"
                >
                  <img
                    src={p.picture_medium}
                    className="rounded-md w-full object-cover"
                  />

                  <p className="mt-3 font-semibold truncate">{p.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MAIN GRID */}
          {/* <div>
            <h2 className="text-xl font-bold mb-4">Popular Tracks</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tracks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => navigate(`/track/${t.id}`)}
                  className="bg-[#1f1f1f] hover:bg-[#2a2a2a] transition p-4 rounded-lg cursor-pointer"
                >
                  <img
                    src={t.album.cover_medium}
                    className="rounded-md w-full h-40 object-cover"
                  />
                  <p className="mt-3 font-semibold truncate">{t.title}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {t.artist.name}
                  </p>
                </div>
              ))}
            </div>
          </div> */}

          {/* HORIZONTAL SCROLL SECTION */}
          <div>
            <h2 className="text-xl font-bold mb-3 mt-8">Popular Tracks</h2>

            <div className="flex gap-4 overflow-x-auto">
              {tracks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => navigate(`/track/${t.id}`)}
                  className="min-w-40 bg-[#1f1f1f] hover:bg-[#2a2a2a] p-3 rounded-lg cursor-pointer"
                >
                  <img
                    src={t.album.cover_medium}
                    className="rounded-md w-full h-32 object-cover"
                  />
                  <p className="mt-2 text-sm font-semibold truncate">
                    {t.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 mt-10">Popular Artists</h2>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {artists.map((a) => (
                <div
                  key={a.id}
                  onClick={() => navigate(`/artist/${a.id}`)}
                  className="min-w-32 text-center cursor-pointer"
                >
                  <img
                    src={a.picture_medium}
                    className="w-24 h-24 rounded-full mx-auto object-cover hover:scale-105 transition"
                  />
                  <p className="mt-2 text-sm text-gray-300 truncate">
                    {a.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home_Page;
