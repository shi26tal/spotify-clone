import { useMusic } from "../context/MusicContext"
import { usePlayer } from "../context/PlayerContext"

const Library = () => {

  const {likedSongs} = useMusic()
  const {playTrack} = usePlayer()

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>

      {/* Liked Songs */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Liked Songs</h2>

        {likedSongs.length === 0 ? (
          <p className="text-gray-400">No liked songs yet</p>
        ) : (
          <div className="space-y-3">
            {likedSongs.map((song) => (
              <div
                key={song.id}
                onClick={() => playTrack(song)}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition"
              >
                <img
                  src={song.albumCover}
                  alt={song.title}
                  className="w-14 h-14 rounded-md object-cover"
                />

                <div>
                  <h3 className="font-medium">{song.title}</h3>
                  <p className="text-sm text-gray-400">
                    {song.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Library