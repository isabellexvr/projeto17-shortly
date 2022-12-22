import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import urlsRoutes from "./routes/urlsRoutes.js";
import usersRoutes from "./routes/usersRoute.js";
import rankingRoute from "./routes/rankingRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);

app.use(urlsRoutes);

app.use(usersRoutes);

app.use(rankingRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Server is running in port 4000"));
