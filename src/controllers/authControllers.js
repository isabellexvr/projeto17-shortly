import { v4 as uuidV4 } from "uuid";
import {
  insertUser,
  insertSession,
  deleteSession,
} from "../repositories/authRepositories.js";
import authServices from "../services/authServices.js";

export async function registration(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    await authServices.checkNewUserInfo(name, email, password, confirmPassword);
    res.status(201).send("Usuário registrado com sucesso!");
  } catch (err) {
    return res.status(err.code).send(err.message);
  }
}



export async function login(req, res) {
  const token = uuidV4();
  const userId = res.locals.userId;
  const userName = res.locals.userName;
  try {
    await insertSession(token, userId);
    console.log(token);
    res.status(200).send({
      token,
      userName: userName,
      message: "Login realizado com sucesso!",
    });
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function logout(req, res) {
  const { authorization } = req.headers;
  const userId = res.locals.userId;
  const token = authorization?.replace("Bearer ", "");

  try {
    await deleteSession(token, userId);
    res.status(200).send("Usuário deslogado com sucesso.");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
