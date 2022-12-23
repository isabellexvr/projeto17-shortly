import { connectionDB } from "../database/db.js";

export default function queryRanking() {
  return connectionDB.query(`
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
}
