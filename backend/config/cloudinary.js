import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
const uploadOnCloudinary = async (filepath) => {
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_NAME ,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET
    }) ;
    try {
         if(!filepath){
            return null ;
         }
         const uploadResult = await cloudinary.uploader.upload(filepath,{
             resource_type: "auto"
         });
         fs.unlinkSync(filepath); // Delete the file after upload
         return uploadResult.secure_url;   
    } catch (error) {
        fs.unlinkSync(filepath); // Ensure the file is deleted even if upload fails
         console.error("Error uploading to Cloudinary:", error);
          return null;

    }

}

export default uploadOnCloudinary;