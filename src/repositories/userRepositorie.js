import { connectionDB } from "../database/db.js";

export function findUrls(userId) {
  return connectionDB.query(
    `
        SELECT 
          us.id, 
          us.name, 
          COUNT(ur."visitsCounter") AS "visitsCount", 
          ur.id AS "urlId",
          ur."shortenedUrl",
          ur."originalUrl",
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
}

export function findUserByEmail(email) {
  return connectionDB.query(
    "SELECT * FROM users WHERE email=$1;",
    [email]
  );
}