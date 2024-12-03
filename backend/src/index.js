
import app from "./app.js";
import connectDB from "./db/connectDb.js";
import dotenv from "dotenv";
const PORT = process.env.PORT || 8001;
dotenv.config({
    path:'./.env'
})
try {
    connectDB();
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
    
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});