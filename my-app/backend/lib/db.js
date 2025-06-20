import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_URI = process.env.MONGO_URI;

// database connection
export const connect_db = async () =>{
    try {
        const c = await mongoose.connect(DB_URI);
        console.log(`DB connected: ${c.connection.host}`);
        
    } catch (error) {

        console.log("Error connecting to DB",error.message);
        process.exit(1);
        
    }
}