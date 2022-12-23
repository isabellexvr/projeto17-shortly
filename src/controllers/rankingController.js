import { connectionDB } from "../database/db.js";
import queryRanking from "../repositories/rankingRepositorie.js";

export default async function findRanking(req, res) {
  try {
    const { rows } = await queryRanking();
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
