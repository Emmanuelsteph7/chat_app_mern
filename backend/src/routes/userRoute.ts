import express from 'express';
import { registerUser, loginUser, getAllUsers } from '@src/controllers';
import { isAuthenticated } from '@src/middleware';

const router = express.Router();

// api/user
router.route('/').post(registerUser).get(isAuthenticated, getAllUsers);

// api/user/login
router.route('/login').post(loginUser);

export default router;
