import { useMusic } from "../context/MusicContext";
import { usePlayer } from "../context/PlayerContext";
import { Heart } from "lucide-react";

const formatDuration = (sec: number) => {
  const min = Math.floor(sec / 60);
  const remaining = sec % 60;
  return `${min}:${remaining.toString().padStart(2, "0")}`;
};

const LikedSongs = () => {
  const { likedSongs, toggleLike, isLiked } = useMusic();
  const { playTrack, currentTrack } = usePlayer();

  const safeQueue = likedSongs
    .filter((s) => s.preview)
    .map((s) => ({
      id: s.id,
      title: s.title,
      artist: s.artist,
      cover: s.albumCover,
      preview: s.preview,
      duration : s.duration
    }));

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-[#121212] to-black">
      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-8">Liked Songs</h1>

      {likedSongs.length === 0 ? (
        <p className="text-gray-400">No liked songs yet.</p>
      ) : (
        <div className="space-y-2">
          {likedSongs.map((song, index) => {
            const isActive = currentTrack?.id === song.id;
            return (
              <div
                key={song.id}
                onClick={() =>
                {
                  if(!song.preview) return;

                  playTrack(
                    {
                      id: song.id,
                      title: song.title,
                      artist: song.artist,
                      cover: song.albumCover,
                      preview: song.preview,
                      
                    },
                    safeQueue
                  )
                }}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                  isActive
                    ? "bg-[#5a5a5a]/80 border-l-4 border-[#1ed760]/70"
                    : "hover:bg-[#1f1f1f]"
                }`}
              >
                {/* LEFT SIDE */}
                <div className={`flex items-center gap-4`}>
                  <span
                    className={` w-6 ${
                      isActive ? "text-[#1ed760]/80" : "text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <img
                    src={song.albumCover}
                    className="w-12 h-12 rounded object-cover"
                  />

                  <div>
                    <p
                      className={`font-medium ${
                        isActive ? "text-[#1ed760]/80" : "text-gray-400"
                      }`}
                    >
                      {song.title}
                    </p>
                    <p
                      className={`text-sm ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {song.artist}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE (duration) */}
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-400">
                    {formatDuration(song.duration)}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // IMPORTANT (prevents song play)
                      toggleLike(song);
                    }}
                    className="hover:scale-110 transition cursor-pointer"
                  >
                    <Heart
                      size={18}
                      fill={isLiked(song.id) ? "green" : "none"}
                      stroke={isLiked(song.id) ? "green" : "white"}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LikedSongs;
