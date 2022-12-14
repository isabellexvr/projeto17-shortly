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

export async function login(req, res) {
  const { email, password } = req.body;
  const token = uuidV4();
  try {
    const emailExists = await connectionDB.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );
    if (emailExists.rows.length < 1) {
      return res.status(401).send("Esse e-mail não está cadastrado.");
    }
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
