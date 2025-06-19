import express from "express";
import dotenv from "dotenv";

//routes
import authRoutes from "./routes/auth.route.js"

dotenv.config();
const app = express();
const _PORT_ = process.env.PORT;

app.use("/api/auth", authRoutes);
app.listen(_PORT_,()=>{

    console.log("Server is now running on port no. " +_PORT_+"!");

});