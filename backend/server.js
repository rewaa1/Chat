import dotenv from 'dotenv';
dotenv.config(); // Load environment variables at the top

import path from 'path';

console.log("Starting server.js");

import express from 'express';
import cookieParser from 'cookie-parser';

console.log("Imported express, dotenv, and cookieParser");

import autRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

console.log("Imported route modules");

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';

console.log("Imported database connection and socket modules");

const PORT = process.env.PORT || 8000;  // Fallback port

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", autRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "frontend","dist","index.html"));
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on Port ${PORT}`);
});




// import path from 'path';

// console.log("Starting server.js");

// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';

// console.log("Imported express, dotenv, and cookieParser");

// import autRoutes from './routes/auth.routes.js';
// import messageRoutes from './routes/message.routes.js';
// import userRoutes from './routes/user.routes.js';

// console.log("Imported route modules");

// import connectToMongoDB from './db/connectToMongoDB.js';
// import { app, server } from './socket/socket.js';

// console.log("Imported database connection and socket modules");




// const PORT = process.env.PORT || 8000;  // Fallback port

// const __dirname = path.resolve();

// dotenv.config();

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", autRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);


// app.use(express.static(path.join(__dirname, "/frontend/dist")));


// app.get("*", (req, res) =>{
//     res.sendFile(path.join(__dirname, "frontend","dist","index.html"));
// });


// server.listen(PORT, () => {
//     connectToMongoDB();
//     console.log(`Server Running on Port ${PORT}`);
// });
