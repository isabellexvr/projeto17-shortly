import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";
import urlModelValidation from "../middlewares/urlModelValidationMiddleware.js";
import { shortUrl, findUrlById, redirectToUrl } from "../controllers/urlsControllers.js";

const urlsRoutes = Router();

urlsRoutes.get("/urls/:id", findUrlById)

urlsRoutes.get("/urls/open/:shortUrl", redirectToUrl)

urlsRoutes.use(tokenValidation)

urlsRoutes.post("/urls/shorten", urlModelValidation, shortUrl)

urlsRoutes.delete("/urls/:id", )



export default urlsRoutes;