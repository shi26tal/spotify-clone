import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtist, getArtistTopTracks } from "../api/music";

type Track = {
  id: number;
  title: string;
  duration: number;
  preview: string;
};

type Artist = {
  id: number;
  name: string;
  picture_big: string;
  nb_fan: number;
};

const ArtistPage = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState<Artist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
//   const [scrolled,setScrolled] = useState(false)

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      try {
        const artistData = await getArtist(id);
        const tracksData = await getArtistTopTracks(id);

        setArtist(artistData);
        setTracks(tracksData?.data || []);
      } catch (err) {
        console.log("Failed to load artist page", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

//   // scroll effect for sticky header
//   useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 200);
//     };

//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);
  

  if (loading) {
    return <div className="text-white p-6">Loading artist...</div>;
  }

  if (!artist) {
    return <div className="text-white p-6">Artist not found</div>;
  }

  return (
    <div className="text-white p-6">
      {/* ARTIST HEADER */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={artist.picture_big}
          className="w-40 h-40 rounded-full object-cover"
        />

        <div>
          <h1 className="text-4xl font-bold">{artist.name}</h1>
          <p className="text-gray-400 mt-2">
            {artist.nb_fan?.toLocaleString()} followers
          </p>
        </div>
      </div>

      {/* SONGS */}
      <h2 className="text-xl font-bold mb-4">Top Songs</h2>

      <div className="space-y-2">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="flex justify-between items-center p-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded cursor-pointer"
            onClick={() => {
              if (track.preview) {
                new Audio(track.preview).play();
              }
            }}
          >
            <div className="flex gap-3 items-center">
              <span className="text-gray-400 w-6">{index + 1}</span>
              <span>{track.title}</span>
            </div>

            <span className="text-gray-500 text-sm">
              {Math.floor(track.duration / 60)}:
              {(track.duration % 60).toString().padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistPage;