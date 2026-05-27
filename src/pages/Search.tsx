import { useEffect, useState } from "react";
import { searchTracks } from "../api/music";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Track = {
  id: number;
  title: string;
  artist: {
    name: string;
  };
  album: {
    cover_medium: string;
  };
};

const Search = () => {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState<string>(searchParams.get('q') || "");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()
  

  // const handleSearch = async (q: string) => {
  //   setLoading(true);

  //   try {
  //     const data = await searchTracks(q);
  //     setTracks(data?.data || []);
  //   } catch (err) {
  //     console.log("Search failed", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (!query.trim()) {
  //     setTracks([]);
  //     setLoading(false);
  //     return;
  //   }

  //   const delay = setTimeout(() => {
  //     handleSearch(query);
  //   }, 500); // debounce

  //   return () => clearTimeout(delay);
  // }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      const trimmed = query.trim();

      // if empty → just reset and STOP (no loading state change here)
      if (!trimmed) {
        setTracks([]);
        
        return;
      }

      setLoading(true);

      try {
        const data = await searchTracks(trimmed);
        setTracks(data?.data || []);
      } catch (err) {
        console.log("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchData, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="text-white p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Search</h1>

        <input
          type="text"
          placeholder="Search songs, artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-4 w-full p-3 rounded-lg bg-[#1f1f1f] outline-none text-white"
        />
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-400">Searching...</p>}

      {/* RESULTS */}
      {!loading && tracks.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tracks.map((t) => (
            <div
              key={t.id}
              onClick={()=> navigate(`/track/${t.id}`)}
              className="bg-[#1f1f1f] hover:bg-[#2a2a2a] p-4 rounded-lg cursor-pointer"
            >
              <img
                src={t.album.cover_medium}
                className="rounded-md w-full h-40 object-cover"
              />
              <p className="mt-2 font-semibold truncate">{t.title}</p>
              <p className="text-sm text-gray-400 truncate">{t.artist.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && query && tracks.length === 0 && (
        <p className="text-gray-500">No results found</p>
      )}
    </div>
  );
};

export default Search;
