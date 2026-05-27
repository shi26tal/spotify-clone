import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylist } from "../api/music";
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
    cover_medium: string;
  };
};

type PlaylistType = {
  title: string;
  picture_big: string;
  description: string;
  tracks: {
    data: Track[];
  };
};

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] =
    useState<PlaylistType | null>(null);

  const { playTrack ,currentTrack} = usePlayer();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlaylist(id!);
      setPlaylist(data);
    };

    fetchData();
  }, [id]);

  if (!playlist) {
    return (
      <p className="text-white p-6">Loading...</p>
    );
  }

  const tracks = playlist.tracks.data.map((t) => ({
    id: t.id,
    title: t.title,
    artist: t.artist.name,
    cover: t.album.cover_medium,
    preview: t.preview,
  }));

  return (
    <div className="text-white pb-32">
      {/* HERO */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-end p-6 bg-gradient-to-b from-[#3b2a8f] to-[#121212]">
        <img
          src={playlist.picture_big}
          className="w-60 rounded-lg shadow-xl"
        />

        <div>
          <p className="text-sm text-gray-300">
            Playlist
          </p>

          <h1 className="text-4xl font-bold">
            {playlist.title}
          </h1>

          <p className="text-gray-400 mt-2">
            {playlist.description}
          </p>
        </div>
      </div>

      {/* TRACK LIST */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Songs
        </h2>

        <div className="space-y-2">
          {playlist.tracks.data.map((t, index) => {

            const isActive = currentTrack?.id === t.id;

            return(
            <div
              key={t.id}
              onClick={() =>
                playTrack(
                  {
                    id: t.id,
                    title: t.title,
                    artist: t.artist.name,
                    cover: t.album.cover_medium,
                    preview: t.preview,
                  },
                  tracks
                )
              }
             className={`flex items-center gap-4 p-3 rounded-md cursor-pointer transition
          ${
            isActive
              ? "bg-[#5a5a5a]/80 border-l-4 border-[#1ed760]/70"
              : "hover:bg-[#1f1f1f]"
          }
        `}
            >
              <span className={` w-6 ${
              isActive
                ? "text-[#1ed760]/80"
                : "text-gray-400"
            }`}>
                {index + 1}
              </span>

              <img
                src={t.album.cover_medium}
                className="w-10 h-10 rounded"
              />

              <div className="flex-1">
                <p className={`font-medium ${
              isActive
                ? "text-[#1ed760]/80"
                : "text-gray-400"
            }`}>
                  {t.title}
                </p>

                <p className={`text-sm ${
              isActive
                ? "text-white"
                : "text-gray-400"
            }`}>
                  {t.artist.name}
                </p>
              </div>

              <p className="text-gray-400 text-sm">
                {Math.floor(t.duration / 60)}:
                {(t.duration % 60)
                  .toString()
                  .padStart(2, "0")}
              </p>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  );
};

export default Playlist;