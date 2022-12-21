import { connectionDB } from "../database/db.js";

export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Nenhum token foi enviado.");
  }
  try {
    const sessionExists = connectionDB.query(
      `SELECT * FROM sessions WHERE token=$1`,
      [token]
    );
    if (sessionExists.rows.length < 1) {
      return res.status(401).send("Não existe sessão com essa token");
    }
    const userExists = connectionDB.query(`SELECT * FROM users WHERE id=1$`, [
      sessionExists.rows[0].userId,
    ]);
    if (userExists.rows.length < 1) {
      return res.status(401).send("Esse usuário não existe.");
    }
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
  res.locals.userId = sessionExists.rows[0].userId
  next();
}
