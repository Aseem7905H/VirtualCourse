import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId; 
        console.log("get currentuser id -> ", userId)
        const user = await User.findById(req.userId).select("-password -__v");

  if (!user) {
    return res.status(401).json({ message: "user not found" });
  }
  return res.status(200).json(user);
    } catch (error) {

        res.status(500).json({ message: "getCurrentUser Error" });
    }
  
};

export const updateProfile = async (req,res) => {
    try {
        const userId = req.userId; 
        console.log("user id -> ", userId)
        const {description, name} = req.body;
        let photoUrl 
        if(req.file){
            photoUrl = await uploadOnCloudinary(req.file.path);
            

        }
        console.log("photourl ->",photoUrl)
        console.log("description ->",description)
        console.log("name ->",name)
         const user = await User.findByIdAndUpdate( userId,{ name,  description, photoUrl },{new : true})  
       
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        // await user.save();
        return res.status(200).json( user);
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({message:`Profile update failed ${error}` });
    }
}
