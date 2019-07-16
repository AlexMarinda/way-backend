import express from 'express';
import UserController from '../../controllers/user';


const router = express.Router();

router.post('/signup', UserController.registerUser);
router.post('/login', UserController.login);

export default router;