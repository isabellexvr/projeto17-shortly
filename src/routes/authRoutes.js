import { Router } from "express";
import { login, registration, logout } from "../controllers/authControllers.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";
import validateBody from "../middlewares/validateBodyMiddleware.js";
import registrationModel from "../models/registrationModel.js";
import loginModel from "../models/loginModel.js";

const authRoutes = Router();

authRoutes.post("/signup", validateBody(registrationModel), registration);

authRoutes.post("/signin", validateBody(loginModel), login);

authRoutes.delete("/logout",tokenValidation, logout)

export default authRoutes;
