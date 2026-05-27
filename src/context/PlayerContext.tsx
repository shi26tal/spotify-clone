import { createContext, useContext, useEffect, useRef, useState } from "react";

type Track = {
  title: string;
  artist: string;
  cover: string;
  preview: string;
};

type PlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  currentTime: number;
  duration: number;

  seek: (time: number) => void;

  volume: number;
  setVolume: (v: number) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume,setVolume] = useState(1);

  const audioRef = useRef(new Audio());

   // stable audio listeners
  useEffect(() => {
    const audio = audioRef.current;

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    return () => {
      audio.ontimeupdate = null;
      audio.onloadedmetadata = null;
    };
  }, []);

  // volume sync
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playTrack = (track: Track) => {
    if (currentTrack?.preview !== track.preview) {
      audioRef.current.src = track.preview;
    }

    audioRef.current.play();

    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
  audioRef.current.currentTime = time;
  setCurrentTime(time);
};

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        togglePlay,
        currentTime,
        duration,
        seek,
        volume,
        setVolume
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be used inside provider");
  }

  return context;
};
