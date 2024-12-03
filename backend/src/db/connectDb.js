import mongoose from "mongoose";


const connectDB = async () =>{
    try {
     
    const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/Assignment`);

    console.log(`\n mongodb sucessfully connected! DB Host = ${connectionInstance.connection.host}`)

        
    } catch (error) {
        console.error("MONGODB CONNECTION ERROR! -> ",error);
        process.exit(1)
    }
}

export default connectDB;