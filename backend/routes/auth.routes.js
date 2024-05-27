import express from 'express';
import { login, logout, signup } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post("/logout", logout)

router.post("/login", login)

router.post("/signup", signup)


export default router;
 