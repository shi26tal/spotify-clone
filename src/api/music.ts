// const BASE_URL = "https://api.deezer.com";
const BASE_URL = "https://corsproxy.io/?https://api.deezer.com";

/* HOME / TRENDING */
export const getChart = async () => {
  const res = await fetch(`${BASE_URL}/chart`);
  return res.json();
};

/* SEARCH */
export const searchTracks = async (query: string) => {
  const res = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}`
  );

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

/* ALBUM */
export const getAlbum = async (id: string) => {
  const res = await fetch(`${BASE_URL}/album/${id}`);
  return res.json();
};

// track details
export const getTrack = async (id:string)=>{
  const res = await fetch(`${BASE_URL}/track/${id}`);
  return res.json();
}