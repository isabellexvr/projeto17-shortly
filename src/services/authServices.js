import {
  insertUser,
  findSessionByUserId,
  insertSession
} from "../repositories/authRepositories.js";
import { findUserByEmail } from "../repositories/userRepositorie.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

async function register(name, email, password, confirmPassword) {
  checkPasswordsEquality(password, confirmPassword);
  await checkEmailSingularity(email);
  const hiddenPassword = bcrypt.hashSync(password, 10);
  await insertUser(name, email, hiddenPassword);
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
      message: "Esse e-mail já está cadastrado.",
    });
  }
}

async function login(email, password) {
  const user = await checkEmailExistance(email);
  await checkSessionExistance(user.id);
  const comparePasswords = bcrypt.compareSync(password, user.password);
  if (!comparePasswords) {
    throw Object.assign(new Error("SenhaIncorretaError"), {
      code: 401,
      message: "A senha inserida está incorreta.",
    });
  }
  const token = uuidV4();
  await insertSession(token, user.id);
  return { token: token, username: user.name };
}

async function checkEmailExistance(email) {
  const userExists = await findUserByEmail(email);
  if (userExists.rowCount < 1) {
    throw Object.assign(new Error("EmailNaoCadastradoError"), {
      code: 401,
      message: "Esse e-mail ainda não está cadastrado.",
    });
  }
  const [user] = userExists.rows;
  return user;
}

async function checkSessionExistance(userId) {
  const sessionExists = await findSessionByUserId(userId);
  if (sessionExists.rowCount > 0) {
    throw Object.assign(new Error("UsuarioJaLogadoError"), {
      code: 400,
      message:
        "Esse usuário já está logado. Para logar novamente deve fazer, primeiro, o logout.",
    });
  }
}

const authServices = {
  register,
  login,
};

export default authServices;
