import { nanoid } from "nanoid";
import { connectionDB } from "../database/db.js";

export async function shortUrl(req, res) {
  const { url } = req.body;
  const shortedUrl = nanoid(8);

  try {
    await connectionDB.query(
      `INSERT INTO urls ("shortUrl", url) 
      VALUES ($1, $2)`,
      [shortedUrl, url]
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
      `SELECT * FROM urls WHERE id=$1`,
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
