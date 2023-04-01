import express from 'express';
import { getUser, getUsers } from '../controllers/users.js';

const router = express.Router();

router.get('/user/:id', getUser);
router.get('/get_users', getUsers);

export default router;