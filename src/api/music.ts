// const BASE_URL = "https://api.deezer.com";
const BASE_URL = "/api/deezer";

/* HOME / TRENDING */
export const getChart = async () => {
  const res = await fetch(`${BASE_URL}/chart`);
  return res.json();
};

export const getPlaylistTracksFromChart = async () => {
  const chartRes = await fetch(`${BASE_URL}/chart`);
  const chart = await chartRes.json();

  const playlistId = chart?.playlists?.data?.[0]?.id;

  if (!playlistId) {
    throw new Error("No playlist found in chart");
  }

  const res = await fetch(`${BASE_URL}/playlist/${playlistId}`);

  const playlist = await res.json();

  return playlist?.tracks?.data || [];
};

/* SEARCH */
export const searchTracks = async (query: string) => {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
return res.json(); 
};

/* ARTIST */
export const getArtist = async (id: string) => {
  const res = await fetch(`${BASE_URL}/artist/${id}`);
  return res.json();
};

// artist top tracks
export const getArtistTopTracks = async (id:string) => {
  const res = await fetch (`${BASE_URL}/artist/${id}/top?limit=50`)

  return res.json();
}

/* ALBUM */
export const getAlbum = async (id: string) => {
  const res = await fetch(`${BASE_URL}/album/${id}`);
  return res.json();
};

// track details
export const getTrack = async (id: string) => {
  const res = await fetch(`${BASE_URL}/track/${id}`);
  return res.json();
};

//playlist
export const getPlaylist = async (id: string) => {
  const res = await fetch(`${BASE_URL}/playlist/${id}`);
  return res.json();
};
