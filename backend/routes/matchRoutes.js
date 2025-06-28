import express from 'express';
import { getMatches } from '../controllers/matchController.js';
import authMiddleware from '../middleware/auth.js'; // ✅ Add this line

const router = express.Router();

router.get('/', authMiddleware, getMatches); // ✅ Protected route

export default router;
