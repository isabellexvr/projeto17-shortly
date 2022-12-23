import { connectionDB } from "../database/db.js";

export default async function findRanking(req, res) {
  try {
    const { rows } = await connectionDB.query(`
        SELECT 
            users.id, 
            users.name, 
            COUNT(urls."userId") AS "linksCount", 
            SUM(urls."visitsCounter") AS "visitCount"
        FROM users
        JOIN urls ON urls."userId"=users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10
        ;
        `);
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
