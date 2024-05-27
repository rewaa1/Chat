import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
 
import autRoutes from './routes/auth.routes.js'
import connectDB from './db/connectToMongoDb.js';
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'


const app = express();
const PORT = process.env.PORT || 8000;  // Fallback port

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", autRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/signup", (req, res) => {
//     // Root route https://localhost:8000
//     res.send("ready");
// });

// app.get("/", (req,res) => {
//     res.send("hello");
// });
// app.get("/api/auth/login", (req,res) => {
//     console.log("login");
// });

app.listen(PORT, () => {
    connectDB();
    console.log(`Server Running on Port ${PORT}`)
});
