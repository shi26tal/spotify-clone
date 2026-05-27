import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrack } from "../api/music";
import { usePlayer } from "../context/PlayerContext";

type Track = {
  id: number;
  title: string;
  preview: string;
  duration: number;

  artist: {
    name: string;
  };

  album: {
    title: string;
    cover_big: string;
  };
};

const TrackDetails = () => {
  const { id } = useParams();

  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const { playTrack, togglePlay, currentTrack , isPlaying } = usePlayer();

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const data = await getTrack(id!);
        setTrack(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
  }, [id]);

  if (loading) {
    return <p className="text-white p-6">Loading...</p>;
  }

  if (!track) {
    return <p className="text-white p-6">Track not found</p>;
  }

  const isCurrentTrack = currentTrack?.preview === track.preview;

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#5038a0] via-[#181818] to-black">
      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-end px-6 md:px-10 pt-10 pb-8">
        {/* COVER */}
        <img
          src={track.album.cover_big}
          alt=""
          className="w-60 md:w-72 rounded-lg shadow-2xl"
        />

        {/* INFO */}
        <div className="space-y-3 text-center md:text-left">
          <p className="text-sm font-medium">Song</p>

          <h1 className="text-4xl md:text-7xl font-extrabold">{track.title}</h1>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-gray-300">
            <span className="font-semibold text-white">
              {track.artist.name}
            </span>

            <span>•</span>

            <span>{track.album.title}</span>

            <span>•</span>

            <span>
              {Math.floor(track.duration / 60)}:
              {(track.duration % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* PLAY SECTION */}
      <div className="px-6 md:px-10 py-6">
        <div className="flex items-center gap-5">
          {/* PLAY BUTTON */}
          <button
            onClick={() => {
              if(isCurrentTrack){
                togglePlay();
              }else{
              playTrack({
                id: track.id,
                title: track.title,
                artist: track.artist.name,
                cover: track.album.cover_big,
                preview: track.preview,
              });
            }
            }}
            className="w-14 h-14 rounded-full bg-[#1ed760] hover:brightness-110 hover:scale-105 active:scale-95 transition flex items-center justify-center text-black text-2xl font-bold"
          >
            {isCurrentTrack && isPlaying ? "❚❚" : "▶"}
          </button>

          {/* LIKE */}
          <button className="text-3xl text-gray-400 hover:text-white">♡</button>
        </div>

        {/* AUDIO */}
        {/* <div className="mt-8 max-w-2xl">
          <audio controls src={track.preview} className="w-full" />
        </div> */}
      </div>

      {/* ABOUT */}
      <div className="px-6 md:px-10 pb-20 mt-8">
        <h2 className="text-2xl font-bold mb-4">About the artist</h2>

        <div className="bg-[#181818] hover:bg-[#222] transition rounded-xl p-6 flex items-center gap-5">
          <img
            src={track.album.cover_big}
            alt=""
            className="w-20 h-20 rounded-full object-cover"
          />

          <div>
            <h3 className="font-bold text-lg">{track.artist.name}</h3>

            <p className="text-gray-400 text-sm mt-1">
              Popular artist on Spotify Clone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetails;
