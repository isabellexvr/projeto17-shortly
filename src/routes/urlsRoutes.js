import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";
import urlModelValidation from "../middlewares/urlModelValidationMiddleware.js";
import { shortUrl, findUrlById, redirectToUrl, deleteUrl } from "../controllers/urlsControllers.js";

const urlsRoutes = Router();

urlsRoutes.get("/urls/:id", findUrlById)

urlsRoutes.get("/urls/open/:shortUrl", redirectToUrl)

urlsRoutes.post("/urls/shorten", urlModelValidation, tokenValidation, shortUrl)

urlsRoutes.delete("/urls/:id", tokenValidation, deleteUrl)

export default urlsRoutes;