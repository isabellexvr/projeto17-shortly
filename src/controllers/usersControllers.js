import { connectionDB } from "../database/db.js";

export default async function findAllUrlsById(req, res) {
  const userId = res.locals.userId;
  try {
    const userInfo = await connectionDB.query(
      `
        SELECT 
            users.id, 
            users.name, 
            COUNT(urls."visits") AS "visitCount"
        FROM users 
        JOIN urls ON users.id=urls."userId"
        WHERE users.id=$1
        GROUP BY users.id
        ;
        `,
      [userId]
    );
    const userUrls = await connectionDB.query(
      `SELECT u.id, 
        u."shortUrl", 
        u.url, 
        u.visits AS "visitCount" 
      FROM urls u 
      WHERE "userId"=$1;`,
      [userId]
    );
    res.send({
      ...userInfo.rows[0],
      shortenedUrls: userUrls.rows,
    });
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
