import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";
import findAllUrlsById from "../controllers/usersController.js";

const usersRoutes = Router();

usersRoutes.get("/users/me", tokenValidation, findAllUrlsById)

export default usersRoutes