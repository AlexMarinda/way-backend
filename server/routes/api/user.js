import express from 'express';
import UserController from '../../controllers/user';
import {Validation} from '../../middleware/validation';
import isAdmin from '../../middleware/is_admin';
import {verifyToken,makeUserAdmin} from '../../helpers';



const router = express.Router();

router.post('/signup',Validation.userValidator, UserController.registerUser);

router.post('/signin', UserController.login);
router.patch('/admin/:user_id/',verifyToken,isAdmin, makeUserAdmin );

export default router;