import { nanoid } from "nanoid";

export async function shortUrl(req, res) {
  const shortedUrl = nanoid(8);
  res.status(201).send({
    shortUrl: shortedUrl,
  });
  try {
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
