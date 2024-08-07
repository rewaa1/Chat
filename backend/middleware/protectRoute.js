import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userID).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protect route middleware:", error.message);
        res.status(400).json({ error: "Internal error" });
    }
}

export default protectRoute;



// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';

// const protectRoute = async (req, res, next) => {
//     try{
//         const token = req.cookies.jwt;

//         if(!token){
//             return res.status(401).json({error: "unauthorized - no token provided"})
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

// 		if (!decoded) {
// 			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
// 		}

// 		const user = await User.findById(decoded.userID).select("-password");

// 		if (!user) {
// 			return res.status(404).json({ error: "User not found" });
// 		}

//         req.user = user;

//         next();
//     }catch(error){
//         console.log("error in protect rout middleware",error.message);
//         res.status(400).json({error:"internal error"});
//     }
// }

// export default protectRoute;