export default async function handler(req, res) {
  try {
    const { path = [] } = req.query;

    const pathString = Array.isArray(path)
      ? path.join("/")
      : path;

    const url = new URL(`https://api.deezer.com/${pathString}`);

    Object.entries(req.query).forEach(([key, value]) => {
      if (key !== "path") {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString());
    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).send(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch Deezer API",
    });
  }
}