import { Heart } from "lucide-react";
import { useMusic } from "../context/MusicContext";
import type { Song } from "../context/MusicContext";


const SongCard = ({ song }:{song:Song}) => {
  const { toggleLike, isLiked } = useMusic();

  return (
    <div>
      <img src={song.albumCover} />

      <h3>{song.title}</h3>

      <button
        onClick={() => toggleLike(song)}
      >
        <Heart
          size={20}
          fill={isLiked(song.id) ? "white" : "none"}
        />
      </button>
    </div>
  );
};