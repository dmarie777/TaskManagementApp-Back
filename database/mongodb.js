import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if(!DB_URI) {
    console.log('fail to connect');
    
    throw new Error('Please define the MONGODB_URI enviroment varialbe');
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
            console.log("Successfully connect to Mongo");

    } catch (error) {
        console.log("Error connecting to database");                
        process.exit();
    }
}

export default connectToDatabase;