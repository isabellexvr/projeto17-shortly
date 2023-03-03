import { findUrls } from "../repositories/userRepositorie.js";

export default async function findAllUrlsById(req, res) {
  const userId = res.locals.userId;
  try {
    const { rows } = await findUrls(userId);
    res.send({
      id: rows[0].id,
      name: rows[0].name,
      visitCount: rows[0].visitsCount,
      shortenedUrls: rows.map((e) => {
        return {
          id: e.urlId,
          shortUrl: e.shortUrl,
          url: e.url,
          visitCount: e.singleUrlVisits,
        };
      }),
    });
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
