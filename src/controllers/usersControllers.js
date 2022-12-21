import { connectionDB } from "../database/db.js";

export default async function findAllUrlsById(req, res) {
  const userId = res.locals.userId;
  try {
    const { rows } = await connectionDB.query(
      `
        SELECT 
            users.id, 
            users.name, 
            COUNT(urls."visitCount") AS "visitCount", 
            urls.* 
        FROM users 
        JOIN urls ON users.id=urls."userId"
        WHERE users.id=$1;
        `,
      [userId]
    )
    console.log(rows)
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
