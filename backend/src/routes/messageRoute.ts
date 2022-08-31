import express from 'express';
import { getMessages, sendMessage } from '@src/controllers';
import { isAuthenticated } from '@src/middleware';

const router = express.Router();

router.route('/').post(isAuthenticated, sendMessage);
router.route('/:id').get(isAuthenticated, getMessages);

export default router;
