import { connectionDB } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function registration(req, res) {
  const { name, email, password } = req.body;
  try {
    const hidePassword = bcrypt.hashSync(password, 10);
    await connectionDB.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",
      [name, email, hidePassword]
    );
    res.status(201).send("Usuário registrado com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

//fazer middleware do login

export async function login(req, res) {
  const { email, password } = req.body;
  const token = uuidV4();
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

    await connectionDB.query("INSERT INTO sessions (token, userId)", [
      token,
      userExists.rows[0].id,
    ]);
    res.status(200).send("Login realizado com sucesso!")
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
