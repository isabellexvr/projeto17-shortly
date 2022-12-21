import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";
import findAllUrlsById from "../controllers/usersControllers.js";

const usersRoutes = Router();

usersRoutes.use(tokenValidation)
usersRoutes.get("/users/me", findAllUrlsById)

export default usersRoutes