import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

type Track = {
  id: number
  title: string;
  artist: string;
  cover: string;
  preview: string;
};

type PlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track, tracks?: Track[]) => void;
  togglePlay: () => void;
  currentTime: number;
  duration: number;

  seek: (time: number) => void;

  volume: number;
  setVolume: (v: number) => void;

  nextTrack: ()=> void
  prevTrack: ()=> void

};

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [volume,setVolume] = useState(1);

  const [queue,setQueue] = useState<Track[]>([])
  const[currentIndex,setCurrentIndex] = useState(0)

  const audioRef = useRef(new Audio());

  const nextTrack = useCallback(()=>{
  if (queue.length === 0) return;

    const nextIndex =
      currentIndex === queue.length - 1
        ? 0
        : currentIndex + 1;

    const next = queue[nextIndex];

    audioRef.current.src = next.preview;
    audioRef.current.play();

    setCurrentTrack(next);
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
},[queue,currentIndex])

   // stable audio listeners
  useEffect(() => {
    const audio = audioRef.current;

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.onended = () =>{
      nextTrack()
    }
    return () => {
      audio.ontimeupdate = null;
      audio.onloadedmetadata = null;
      audio.onended = null
    };
  }, [nextTrack]);

  // volume sync
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playTrack = (track: Track , tracks?: Track[]) => {

    //if playlist provided

    if (tracks && tracks.length > 0) {
    setQueue(tracks);

    // const index = tracks.findIndex(
    //   (t) => t.preview === track.preview
    // );
    const index = tracks.findIndex(
      (t) => t.id === track.id
    );
    setCurrentIndex(index);
  }

    // if (currentTrack?.preview !== track.preview) {
    //   audioRef.current.src = track.preview;
    // }

    //change source only if different
    if(audioRef.current.src !== track.preview){
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



const prevTrack = useCallback(() =>{
  if (queue.length === 0) return;

    const prevIndex =
      currentIndex === 0
        ? queue.length - 1
        : currentIndex - 1;

    const prev = queue[prevIndex];

    audioRef.current.src = prev.preview;
    audioRef.current.play();

    setCurrentTrack(prev);
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
},[queue,currentIndex])


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
        setVolume,
        nextTrack,
        prevTrack
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
