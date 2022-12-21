import { Router } from "express";
import { login, registration } from "../controllers/authControllers.js";
import registrationValidation from "../middlewares/registrationValidationMiddleware.js";
import loginValidation from "../middlewares/loginValidationMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup", registrationValidation, registration);

authRoutes.post("/signin", loginValidation, login);

export default authRoutes;
