import { connectionDB } from "../database/db.js";

export default async function findAllUrlsById(req, res) {
  const userId = res.locals.userId;
  try {
    const { rows } = await connectionDB.query(
      `
      SELECT 
        us.id, 
        us.name, 
        COUNT(ur."visitsCounter") AS "visitsCount", 
        ur.id AS "urlId",
        ur."shortenedUrl",
        ur.url,
        ur."visitsCounter" AS "singleUrlVisits"
      FROM users us 
      JOIN urls ur 
        ON ur."userId"=us.id 
      WHERE us.id=$1 
      GROUP BY 
        us.id, 
        ur.id;
        `,
      [userId]
    );

    res.send({
      id: rows[0].id,
      name: rows[0].name,
      visitCount: rows[0].visitsCount,
      shortenedUrls: rows.map(e => {
        return {
          id: e.urlId,
          shortUrl: e.shortUrl,
          url: e.url,
          visitCount: e.singleUrlVisits
        }
      })
    });
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
