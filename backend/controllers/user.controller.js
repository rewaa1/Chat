import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) =>{
    try{

        const loggedUserId = req.user._id;
        const allUsers = await User.find({ _id : { $ne: loggedUserId }}).select("-password")

        res.status(200).json(allUsers)
    }catch (error){
        console.log(error.message);
        res.status(400).json({error: "internal server error"})
    }
}