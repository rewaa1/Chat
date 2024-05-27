import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try{
        const {fullname,username,password, confirmPassword, gender} = req.body

        if(password !== confirmPassword){
            return res.status(400).json({error:"passwords do not match"})
        }

        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({error:"username already exists"})
        }
        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const boyProfilePic= `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic= `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser= new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic:gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
        });
        } else{
            res.status(400).json({error: "invalid data"});
        } 
    } catch(error) { 
        console.log(error.message)
        res.status(500).json({error:"internal error"})
    }

    // res.send("signup");
    // console.log("signup");
}

export const login = async (req, res) => {
    try{
        const {username, password} = req.body
        const user = await User.findOne({username});
        const checkPassword = await bcryptjs.compare(password, user?.password || "");

        if(!user || !checkPassword){
            return res.status(400).json({error: " invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch(error){
        console.log(error.message)
        res.status(500).json({error:"internal error"})
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "",{maxAge: 0});
        res.status(200).json({message: "logged out successfully"})
    }catch(error){
        console.log(error.message)
        res.status(500).json({error:"internal error"})
    }
}
