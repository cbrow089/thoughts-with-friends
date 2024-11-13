import { Router } from 'express';
import { createUser, getAllUsers, getUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';
const router = Router();
// Route for creating a new user
router.post('/', createUser);
// Route for getting all users
router.get('/', getAllUsers);
// Routes for handling a specific user by ID for updating and deleting
router.get('/:userId', getUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
// Routes for managing friends of a user
router.post('/:userId/friends/:friendId', addFriend);
router.delete('/:userId/friends/:friendId', removeFriend);
export default router;
