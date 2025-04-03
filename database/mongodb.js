import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/taskmanagementapp`,{
            useNewUrlparser:true,
            useUnifiedTopology: true});
            console.log("Successfully connect to Mongo");

    } catch (error) {
        console.log("Error connecting to database");        
        process.exit();
    }
}

export default connectToDatabase;