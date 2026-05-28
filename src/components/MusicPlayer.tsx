import { usePlayer } from "../context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import { Volume2, Volume1, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seek,
    volume,
    setVolume,
    nextTrack,
    prevTrack,
  } = usePlayer();

  if (!currentTrack) return null;

  const formatTime = (t: number) => {
    if (!t || isNaN(t)) return "0:00";
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-[#282828] h-24 px-4 flex items-center justify-between text-white z-50">
      {/* LEFT */}
      <div className="flex items-center gap-4 w-1/3">
        <img src={currentTrack.cover} alt="" className="w-14 h-14 rounded" />

        <div>
          <p className="font-medium">{currentTrack.title}</p>

          <p className="text-sm text-gray-400">{currentTrack.artist}</p>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center w-1/3 gap-2">
        <div className="flex items-center gap-5">
          {/* PREVIOUS */}
          <button
            onClick={prevTrack}
            disabled={!currentTrack}
            className="text-gray-400 hover:text-white text-xl disabled:opacity-30 cursor-pointer"
          >
            {/* <img src={Prev} alt="" className="w-6"/> */}
            <FaBackwardStep size={20} />
          </button>

          {/* PLAY / PAUSE */}
          <button
            onClick={togglePlay}
            className="w-11 h-11 rounded-full bg-white cursor-pointer text-black flex items-center justify-center hover:scale-105 active:scale-95 transition"
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>

          {/* NEXT */}
          <button
            onClick={nextTrack}
            disabled={!currentTrack}
            className="text-gray-400 hover:text-white text-xl disabled:opacity-30 cursor-pointer"
          >
            {/* <img src={Next} alt="" className="w-6" /> */}
            <FaForwardStep size={22} />
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div
          className="w-full h-1 bg-gray-700 rounded cursor-pointer relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;

            const newTime = (clickX / width) * duration;

            seek(newTime);
          }}
        >
          <div
            className="h-1 bg-white rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* TIME */}
        <div className="flex items-center justify-between w-full text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT (VOLUME) */}
      <div className="w-1/3 flex justify-end items-center gap-3">
        {volume === 0 ? (
          <VolumeX size={22} />
        ) : volume < 0.5 ? (
          <Volume1 size={22} />
        ) : (
          <Volume2 size={22} />
        )}

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 accent-white cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
