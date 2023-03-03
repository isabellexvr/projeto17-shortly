import { connectionDB } from "../database/db.js";

export function insertUser(name, email, hiddenPassword) {
  return connectionDB.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3);",
    [name, email, hiddenPassword]
  );
}

export function insertSession(token, userId) {
  return connectionDB.query(
    `INSERT INTO sessions (token, "userId") VALUES ($1, $2);`,
    [token, userId]
  );
}

export function deleteSession(token, userId) {
  return connectionDB.query(
    `DELETE FROM sessions WHERE token=$1 AND "userId"=$2;`,
    [token, userId]
  );
}

export function findSessionByUserId(userId) {
  return connectionDB.query(`SELECT * FROM sessions WHERE "userId"=$1`, [
    userId,
  ]);
}
