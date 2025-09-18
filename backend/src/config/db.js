import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://mansihase8_db_user:gEup2XlO43uEPOl8@cluster0.q6kzwxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Mongoose Connected!!!");

    } catch (error) {
        console.log("Connection Failed", error);
        process.exit(1);

    }
}
export default connectDB;