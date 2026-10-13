import { Router } from 'express';

import { login, logout } from '../controllers/authController.js';
import requireAdmin from '../middlewares/requireAdmin.js';

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/logout', requireAdmin, logout);

export default authRoutes;