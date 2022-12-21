import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";

const usersRoutes = Router();

usersRoutes.use(tokenValidation)
usersRoutes.get("/users/me")

export default usersRoutes