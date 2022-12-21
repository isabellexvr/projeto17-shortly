import { Router } from "express";
import {findRanking} from "../controllers/rankingController.js"

const rankingRoute = Router();

rankingRoute.get("/ranking", findRanking)

//deixar sem o {} o import de ranking e de users, pq só importa 1 função

export default rankingRoute;