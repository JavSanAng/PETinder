import Express from "express";
const app =Express();
import userRoutes from "./routes/userRoutes.js";


app.use("/api/auth/users", userRoutes);