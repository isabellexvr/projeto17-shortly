import { Router } from "express";
import { login, registration } from "../controllers/authControllers.js";
import registrationValidation from "../middlewares/registrationValidationMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signin", registrationValidation, registration);

authRoutes.post("/signup", login);

export default authRoutes;
