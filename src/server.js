import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);

app.listen(4000, () => console.log("Server is running in port 4000"));
