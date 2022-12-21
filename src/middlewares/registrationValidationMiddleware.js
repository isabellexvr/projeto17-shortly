import { connectionDB } from "../database/db.js";
import registrationModel from "../models/registrationModel.js";

export default async function registrationValidation(req, res, next) {
  const { error } = registrationModel.validate(req.body);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    console.log(errors);
    return res.status(422).send(errors);
  }
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(422).send("As senhas não estão iguais.");
  }
  try {
    const verifyEmail = await connectionDB.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );
    if (verifyEmail.rows.length > 0) {
      return res.status(409).send("Esse e-mail já está cadastrado.");
    }
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
  next();
}
