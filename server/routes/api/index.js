import express from 'express';
import user from './user';
import trip from './trip';
import book from './book';


const router = express.Router();

router.use('/auth', user);
router.use('/trips', trip);
router.use('/bookings', book);


export default router;
