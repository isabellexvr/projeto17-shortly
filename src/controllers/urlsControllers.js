import { nanoid } from "nanoid";
import {
  verifyUrl,
  insertNewUrl,
  findUrlFromId,
  findUrlFromShortUrl,
  addOneMoreVisit,
  findUrlFromUserAndUrlId,
  removeUrl,
} from "../repositories/urlsRepositories.js";

export async function shortUrl(req, res) {
  const { url } = req.body;
  const shortenedUrl = nanoid(8);
  const userId = res.locals.userId;
  try {
    const verify = await verifyUrl(userId, url);
    if (verify.rows.length > 0) {
      return res.status(404).send("Esta mesma url já foi encurtada.");
    }
    await insertNewUrl(shortenedUrl, url, userId);
    res.status(201).send({
      shortUrl: shortenedUrl,
    });
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function findUrlById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await findUrlFromId(id);
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
    const { rows } = await findUrlFromShortUrl(shortUrl);
    if (rows.length < 1) {
      return res.status(404).send("A url correspondente não foi encontrada.");
    }
    await addOneMoreVisit(rows[0].visitsCounter + 1, shortUrl);
    res.redirect(`${rows[0].originalUrl}`);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function deleteUrl(req, res) {
  const userId = res.locals.userId;
  const { id } = req.params;
  try {
    const urlExists = await findUrlFromUserAndUrlId(id, userId);
    if (urlExists.rows.length < 1) {
      return res.status(404).send("A url não existe.");
    }
    await removeUrl(id);
    res.status(204).send("Url excluída com sucesso.");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
