import { createContext, useContext, useEffect, useState } from "react";

export type Song = {
  id: number;
  title: string;
  artist: string;
  albumCover: string;
  duration: number
  preview: string
};

type MusicContextType = {
  likedSongs: Song[];
  toggleLike: (song: Song) => void;
  isLiked: (id: number) => boolean;
};

const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedSongs, setLikedSongs] = useState<Song[]>(() => {
    const saved = localStorage.getItem("likedSongs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  const toggleLike = (song: Song) => {
    setLikedSongs((prev) => {
      const exists = prev.find((item) => item.id === song.id);

      if (exists) {
        return prev.filter((item) => item.id !== song.id);
      }

      return [...prev, song];
    });
  };

  const isLiked = (id: number) => {
    return likedSongs.some((song) => song.id === id);
  };

  return (
    <MusicContext.Provider
      value={{ likedSongs, toggleLike, isLiked }}
    >
        {children}
    </MusicContext.Provider>
  );
};

export const useMusic = ()=>{
    const context = useContext(MusicContext);

    if(!context){
        throw new Error(
            'useMusic must be used inside Music provider'
        )
    }
    return context;
}
