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

export async function findUrlById(req, res) {}
