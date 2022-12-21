import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import urlsRoutes from "./routes/urlsRoutes.js";
import usersRoutes from "./routes/usersRoute.js";
import rankingRoute from "./routes/rankingRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);

app.use(urlsRoutes);

app.use(usersRoutes);

app.use(rankingRoute);

app.listen(4000, () => console.log("Server is running in port 4000"));
