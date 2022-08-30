import express from 'express';
import {
  getOneOnOneChat,
  getChats,
  getSingleChat,
  createGroupChat,
  renameGroup,
  addUserToGroup,
  removeUserFromGroup,
} from '@src/controllers';
import { isAuthenticated } from '@src/middleware';

const router = express.Router();

router.route('/').get(isAuthenticated, getChats);
router.route('/getOneOnOneChat').get(isAuthenticated, getOneOnOneChat);
router.route('/createGroupChat').post(isAuthenticated, createGroupChat);
router.route('/renameGroup').put(isAuthenticated, renameGroup);
router.route('/addUserToGroup').put(isAuthenticated, addUserToGroup);
router.route('/removeUserFromGroup').put(isAuthenticated, removeUserFromGroup);

router.route('/:id').get(getSingleChat);

export default router;
