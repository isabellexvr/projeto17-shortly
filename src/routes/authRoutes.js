import { Router } from "express";
import { login, registration } from "../controllers/authControllers.js";
import registrationValidation from "../middlewares/registrationValidationMiddleware.js";
import loginValidation from "../middlewares/loginValidationMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signin", registrationValidation, registration);

authRoutes.post("/signup", loginValidation, login);

export default authRoutes;
