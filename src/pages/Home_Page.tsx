import { useEffect, useState } from "react";
import { getChart } from '../api/music';
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

const Home_Page = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getChart();

        setTracks(data?.tracks?.data || []);
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
        <p className="text-sm text-gray-400 mt-1">
          Trending music for you
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-400">Loading music...</p>
      )}

      {/* GRID */}
      {!loading && (
        <>
          {/* MAIN GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tracks.map((t) => (
              <div
                key={t.id}
                onClick={()=> navigate(`/track/${t.id}`)}
                className="bg-[#1f1f1f] hover:bg-[#2a2a2a] transition p-4 rounded-lg cursor-pointer"
              >
                <img
                  src={t.album.cover_medium}
                  className="rounded-md w-full h-40 object-cover"
                />
                <p className="mt-3 font-semibold truncate">
                  {t.title}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {t.artist.name}
                </p>
              </div>
            ))}
          </div>

          {/* HORIZONTAL SCROLL SECTION */}
          <div>
            <h2 className="text-xl font-bold mb-3 mt-8">
              Popular Tracks
            </h2>

            <div className="flex gap-4 overflow-x-auto">
              {tracks.map((t) => (
                <div
                  key={t.id}
                  className="min-w-40 bg-[#1f1f1f] hover:bg-[#2a2a2a] p-3 rounded-lg cursor-pointer"
                >
                  <img
                    src={t.album.cover}
                    className="rounded-md w-full h-32 object-cover"
                  />
                  <p className="mt-2 text-sm font-semibold truncate">
                    {t.title}
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