import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtist, getArtistTopTracks } from "../api/music";
import { usePlayer } from "../context/PlayerContext";
// import { useMusic } from "../context/MusicContext";
// import { Heart } from "lucide-react";
// import { FaPlay, FaPause } from "react-icons/fa";

type Track = {
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: {
    name: string;
  };
  album: {
    cover: string;
  };
};

type Artist = {
  id: number;
  name: string;
  picture_big: string;
  nb_fan: number;
};

const ArtistPage = () => {
  const { id } = useParams();

  const { playTrack, currentTrack } = usePlayer();
  

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

  //IMPORTANT: convert API format → Player format
  const mapTrack = tracks.map((t: Track) => ({
    id: t.id,
    title: t.title,
    artist: t.artist?.name || "Unknown",
    cover: t.album?.cover || "",
    preview: t.preview,
  }));

  // const mappedTracks = tracks.map(mapTrack);

  // const isSameQueue =
  //   currentTrack &&
  //   mappedTracks.some((t) => t.id === currentTrack.id);

  return (
    // <div className="text-white p-6">
    //   {/* ARTIST HEADER */}
    //   <div className="flex items-center gap-6 mb-8">
    //     <img
    //       src={artist.picture_big}
    //       className="w-40 h-40 rounded-full object-cover"
    //     />

    //     <div>
    //       <h1 className="text-4xl font-bold">{artist.name}</h1>
    //       <p className="text-gray-400 mt-2">
    //         {artist.nb_fan?.toLocaleString()} followers
    //       </p>
    //     </div>
    //   </div>

    //   {/* SONGS */}
    //   <h2 className="text-xl font-bold mb-4">Top Songs</h2>

    //   <div className="space-y-2">
    //     {tracks.map((track, index) => (
    //       <div
    //         key={track.id}
    //         className="flex justify-between items-center p-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded cursor-pointer"
    //         onClick={() => {
    //           if (track.preview) {
    //             new Audio(track.preview).play();
    //           }
    //         }}
    //       >
    //         <div className="flex gap-3 items-center">
    //           <span className="text-gray-400 w-6">{index + 1}</span>
    //           <span>{track.title}</span>
    //         </div>

    //         <span className="text-gray-500 text-sm">
    //           {Math.floor(track.duration / 60)}:
    //           {(track.duration % 60).toString().padStart(2, "0")}
    //         </span>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="text-white bg-[#121212] min-h-screen">
      {/* HERO SECTION */}
      <div
        className="relative h-105 flex items-end px-8 pb-8"
        style={{
          backgroundImage: `url(${artist.picture_big})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="relative z-10">
          <p className="text-sm text-gray-300">Artist</p>

          <h1 className="text-6xl md:text-7xl font-bold mt-2">{artist.name}</h1>

          <p className="text-gray-300 mt-2">
            {artist.nb_fan.toLocaleString()} followers
          </p>

          {/* ACTIONS */}
          <div className="flex items-center gap-4 mt-6">
            {/* <button
              // onClick={() => {
              //   if (tracks.length > 0) {
              //     playTrack(tracks[0], tracks);
              //   }
              // }}

              onClick={() => {
                if (!mappedTracks.length) return;

                if (isSameQueue) {
                  togglePlay();
                } else {
                  playTrack(mappedTracks[0], mappedTracks);
                }
              }}

              className="w-14 h-14 rounded-full bg-[#1ed760] cursor-pointer hover:brightness-110 hover:scale-105 active:scale-95 transition flex items-center justify-center text-black text-2xl font-bold"
            >
              <FaPlay size={18} />
              
            </button> */}

            <button className="border border-gray-500 px-5 py-2 rounded-full hover:border-white">
              Follow
            </button>
          </div>
        </div>
      </div>

      {/* SONG LIST */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Popular</h2>

        <div className="space-y-2">
          {tracks.map((track, index) => {
            const isActive = currentTrack?.id === track.id;

            return (
              <div
                key={track.id}
                className={`flex items-center gap-4 p-3 rounded-md cursor-pointer transition
          ${
            isActive
              ? "bg-[#5a5a5a]/80 border-l-4 border-[#1ed760]/70"
              : "hover:bg-[#1f1f1f]"
          }
        `}
                onClick={() =>
                  playTrack(
                    {
                      id: track.id,
                      title: track.title,
                      artist: track.artist.name,
                      cover: track.album.cover,
                      preview: track.preview,
                    },
                    mapTrack,
                  )
                }
              >
                {/* LEFT */}
                {/* <div className="flex items-center gap-4"> */}
                  <span
                    className={` w-6 ${
                      isActive ? "text-[#1ed760]/80" : "text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </span>

                  {/* <button className="hidden group-hover:block text-white">
                    <FaPlay size={16} />
                  </button> */}

                  <img src={track.album.cover} className="w-10 h-10 rounded" />

                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        isActive ? "text-[#1ed760]/80" : "text-gray-400"
                      }`}
                    >
                      {track.title}
                    </p>
                    <p
                      className={`text-sm ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {track.artist?.name}
                    </p>
                  </div>
                {/* </div> */}

                {/* RIGHT */}

                {/* LIKE */}
                {/* <button
                    onClick={(e) => {
                      e.stopPropagation();

                      toggleLike({
                        id: track.id,
                        title: track.title,
                        artist: track.artist?.name || "",
                        albumCover: track.album?.cover || "",
                        duration: track.duration,
                        preview: track.preview,
                      });
                    }}
                    className="opacity-0 group-hover:opacity-100 transition"
                  >
                    <Heart
                      size={18}
                      fill={isLiked(track.id) ? "red" : "none"}
                      color={isLiked(track.id) ? "red" : "white"}
                    />
                  </button> */}

                <p className="text-gray-400 text-sm w-12 text-right">
                  {Math.floor(track.duration / 60)}:
                  {(track.duration % 60).toString().padStart(2, "0")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
