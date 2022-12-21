import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";
import urlModelValidation from "../middlewares/urlModelValidationMiddleware.js";
import { shortUrl } from "../controllers/urlsControllers.js";

const urlsRoutes = Router();

urlsRoutes.use(tokenValidation)

urlsRoutes.post("/shorten", urlModelValidation, shortUrl)

export default urlsRoutes;