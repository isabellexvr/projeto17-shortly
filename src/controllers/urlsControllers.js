import { nanoid } from "nanoid";
import { connectionDB } from "../database/db.js";

export async function shortUrl(req, res) {
  const { url } = req.body;
  const shortedUrl = nanoid(8);
  const userId = res.locals.userId;
  try {
    const verifyUrl = await connectionDB.query(
      `SELECT * FROM urls WHERE "userId"=$1 AND url=$2;`,
      [userId, url]
    );
    if (verifyUrl.rows.length > 0) {
      return res.status(404).send("Esta mesma url já foi encurtada.");
    }
    await connectionDB.query(
      `INSERT INTO urls ("shortUrl", url, "userId") 
      VALUES ($1, $2, $3);`,
      [shortedUrl, url, userId]
    );
    res.status(201).send({
      shortUrl: shortedUrl,
    });
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function findUrlById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await connectionDB.query(
      `SELECT * FROM urls WHERE id=$1;`,
      [id]
    );
    if (rows.length < 1) {
      return res
        .status(404)
        .send("Não foi encontrada nenhuma url correspondente a esse id.");
    }
    res.status(200).send(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function redirectToUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const { rows } = await connectionDB.query(
      `SELECT * FROM urls WHERE "shortUrl"=$1`,
      [shortUrl]
    );
    if (rows.length < 1) {
      return res.status(404).send("A url correspondente não foi encontrada.");
    }
    await connectionDB.query(`UPDATE urls SET visits=$1 WHERE "shortUrl"=$2`, [
      rows[0].visits + 1,
      shortUrl,
    ]);
    res.redirect(200, rows[0].url);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function deleteUrl(req, res) {
  const userId = res.locals.userId;
  const { id } = req.params;
  try {
    const urlExists = await connectionDB.query(
      `SELECT * FROM urls WHERE id=$1 AND "userId"=$2`,
      [id, userId]
    );
    if (urlExists.rows.length < 1) {
      return res.status(404).send("A url não existe.");
    }
    await connectionDB.query(`DELETE FROM urls WHERE id=$1`, [id]);
    res.status(204).send("Url excluída com sucesso.");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
