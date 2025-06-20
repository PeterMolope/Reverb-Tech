import mongoose from "mongoose";
import dotenv from "dotenv";

export const connect_db = async () =>{
    try {
        const c = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB Connected: ${c.connection.host}`);
        
    } catch (error) {

        console.log("Error connecting to DB",error.message);
        process.exit(1);
        
    }
}