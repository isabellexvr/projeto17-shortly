import bcrypt from "bcrypt";
import { connectionDB } from "../database/db.js";
import loginModel from "../models/loginModel.js";

export default async function loginValidation(req, res, next) {
  const { email, password } = req.body;
  const { error } = loginModel.validate(req.body);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    console.log(errors);
    return res.status(422).send(errors);
  }
  try {
    const userExists = await connectionDB.query(
      "SELECT * FROM users WHERE email=$1;",
      [email]
    );
    if (userExists.rows.length < 1) {
      return res.status(401).send("Esse e-mail não está cadastrado.");
    }
    const sessionExists = await connectionDB.query(
      `SELECT * FROM sessions WHERE "userId"=$1;`,
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
    if (!comparePasswords) {
      return res.status(401).send("Senha incorreta.");
    }
    res.locals.userId = userExists.rows[0].id;
    res.locals.userName = userExists.rows[0].name
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }

  next();
}
