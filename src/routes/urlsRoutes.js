import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";
import urlModelValidation from "../middlewares/urlModelValidationMiddleware.js";
import { shortUrl, findUrlById } from "../controllers/urlsControllers.js";

const urlsRoutes = Router();

urlsRoutes.get("/urls/:id", findUrlById)

urlsRoutes.use(tokenValidation)

urlsRoutes.post("/urls/shorten", urlModelValidation, shortUrl)



export default urlsRoutes;