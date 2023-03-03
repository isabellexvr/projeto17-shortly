import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import {
  insertUser,
  insertSession,
  deleteSession,
} from "../repositories/authRepositories.js";
import { findUserByEmail } from "../repositories/userRepositorie.js";

export async function registration(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    checkPasswordsEquality(password, confirmPassword);
    await checkEmailSingularity(email);
    const hiddenPassword = bcrypt.hashSync(password, 10);
    await insertUser(name, email, hiddenPassword);
    res.status(201).send("Usuário registrado com sucesso!");
  } catch (err) {
    console.log(err)
    return res.status(err.code).send(err.message);
  }
}

function checkPasswordsEquality(password, confirmPassword) {
  if (password !== confirmPassword) {
    throw Object.assign(new Error("SenhasDiferentesError"), {
      code: 403,
      message: "As senhas não estão iguais.",
    });
  }
}

async function checkEmailSingularity(email) {
  const user = await findUserByEmail(email);
  if (user.rowCount > 0) {
    throw Object.assign(new Error("EmailJaCadastradoError"), {
      code: 409,
      message: "Esse e-mail já está cadastrado."
    });
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
