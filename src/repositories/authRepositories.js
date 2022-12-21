import { connectionDB } from "../database/db.js";

export function insertUser(name, email, hiddenPassword) {
  return connectionDB.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",
    [name, email, hiddenPassword]
  );
}

export function insertSession(token, userId){
    return (
        connectionDB.query("INSERT INTO sessions (token, userId)", [
            token,
            userId,
          ])
    )
}