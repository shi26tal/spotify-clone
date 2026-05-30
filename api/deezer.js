export default async function handler(req, res) {
  try {
    const path = req.url.replace("/api/deezer", "");

    const url = `https://api.deezer.com${path}`;

    const response = await fetch(url);
    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: "proxy failed" });
  }
}