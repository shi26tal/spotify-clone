export default async function handler(req, res) {
  try {
    const { path = [] } = req.query;

    const deezerPath = Array.isArray(path)
      ? path.join("/")
      : path;

    const url = `https://api.deezer.com/${deezerPath}${
      req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""
    }`;

    const response = await fetch(url);
    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).send(data);
  } catch (e) {
    res.status(500).json({ error: "proxy failed" });
  }
}