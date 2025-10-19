import {
  deleteUserById,
  fetchAllUsers,
  fetchUserById,
  updateUserById,
} from '#src/controllers/user.controller.js';
import {
  authenticateToken,
  requireRole,
} from '#src/middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.get('/', authenticateToken, requireRole(['admin']), fetchAllUsers);

router.get('/:id', authenticateToken, fetchUserById);

router.put('/:id', authenticateToken, updateUserById);

router.delete(
  '/:id',
  authenticateToken,
  requireRole(['admin']),
  deleteUserById
);

export default router;
