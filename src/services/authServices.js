import { insertUser } from "../repositories/authRepositories.js";
import { findUserByEmail } from "../repositories/userRepositorie.js";
import bcrypt from "bcrypt";

async function checkNewUserInfo(name, email, password, confirmPassword) {
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

const authServices = {
  checkNewUserInfo,
};

export default authServices;
