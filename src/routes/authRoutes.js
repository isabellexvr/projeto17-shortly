import { Router } from "express";
import { login, registration, logout } from "../controllers/authControllers.js";
import registrationValidation from "../middlewares/registrationValidationMiddleware.js";
import loginValidation from "../middlewares/loginValidationMiddleware.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup", registrationValidation, registration);

authRoutes.post("/signin", loginValidation, login);

authRoutes.delete("/logout",tokenValidation, logout)

export default authRoutes;
