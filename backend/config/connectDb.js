import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONOGO_URI, {
       
    });
     
  } catch (error) {
    console.error(`Error: ${error.message}`);
    
  }
}

export default connectDb;
