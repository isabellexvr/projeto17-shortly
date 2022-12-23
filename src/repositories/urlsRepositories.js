import { connectionDB } from "../database/db.js";

export function verifyUrl(userId, url) {
  return connectionDB.query(
    `SELECT * FROM urls WHERE "userId"=$1 AND "originalUrl"=$2;`,
    [userId, url]
  );
}

export function insertNewUrl(shortenedUrl, url, userId) {
  return connectionDB.query(
    `INSERT INTO urls ("shortenedUrl", "originalUrl", "userId") 
        VALUES ($1, $2, $3);`,
    [shortenedUrl, url, userId]
  );
}

export function findUrlFromId(id) {
  return connectionDB.query(`SELECT * FROM urls WHERE id=$1;`, [id]);
}

export function findUrlFromShortUrl(shortUrl) {
  return connectionDB.query(`SELECT * FROM urls WHERE "shortenedUrl"=$1`, [
    shortUrl,
  ]);
}

export function addOneMoreVisit(count, shortUrl) {
  return connectionDB.query(
    `UPDATE urls SET "visitsCounter"=$1 WHERE "shortenedUrl"=$2`,
    [count, shortUrl]
  );
}

export function findUrlFromUserAndUrlId(id, userId) {
  return connectionDB.query(`SELECT * FROM urls WHERE id=$1 AND "userId"=$2`, [
    id,
    userId,
  ]);
}

export function removeUrl(id) {
  return connectionDB.query(`DELETE FROM urls WHERE id=$1`, [id]);
}
