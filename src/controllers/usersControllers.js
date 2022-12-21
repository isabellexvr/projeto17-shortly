import { connectionDB } from "../database/db.js";

export default async function findAllUrlsById(req, res) {
  const userId = res.locals.userId;
  try {
    const { rows } = await connectionDB.query(
      `
        SELECT 
            users.id, 
            users.name, 
            COUNT(urls."visits") AS "visitCount", 
            urls.* 
        FROM users 
        JOIN urls ON users.id=urls."userId"
        WHERE users.id=$1
        GROUP BY urls.id, users.id
        ;
        `,
      [userId]
    )
    res.send(rows)
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
