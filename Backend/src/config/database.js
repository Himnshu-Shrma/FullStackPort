import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () =>{
    const mongoUrl = process.env.MONGO_URL;
    if(mongoUrl){
        await mongoose.connect(mongoUrl);
        console.log('MongoDB connected');
    } else {
        throw new Error('Mongo URL is not defined or not found in environment variables');
    }
}

export default connectDB;