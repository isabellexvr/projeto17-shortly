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
  const token = uuidV4();
  const userId = res.locals.userId
  try {
    await connectionDB.query("INSERT INTO sessions (token, userId)", [
      token,
      userId,
    ]);
    res.status(200).send("Login realizado com sucesso!")
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
