import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";
import findAllUrlsById from "../controllers/usersController.js";

const usersRoutes = Router();

usersRoutes.use(tokenValidation)
usersRoutes.get("/users/me", findAllUrlsById)

export default usersRoutes