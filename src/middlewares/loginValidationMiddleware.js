import bcrypt from "bcrypt";
import { connectionDB } from "../database/db.js";

export default async function loginValidation(req, res, next) {
  const { email, password } = req.body;
  try {
    const userExists = await connectionDB.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );
    if (userExists.rows.length < 1) {
      return res.status(401).send("Esse e-mail não está cadastrado.");
    }
    const sessionExists = await connectionDB.query(
      "SELECT * FROM sessions WHERE userId=$1",
      [userExists.rows[0].id]
    );
    if (sessionExists.rows.length > 0) {
      return res
        .status(400)
        .send("Você já está logado, saia para poder logar novamente.");
    }
    const comparePasswords = bcrypt.compareSync(
      password,
      userExists.rows[0].password
    );
    if (comparePasswords) {
      return res.status(401).send("Senha incorreta.");
    }
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
  res.locals.userId = userExists.rows[0].id;
  next();
}
