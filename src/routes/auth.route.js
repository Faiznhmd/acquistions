import { signIn, signUP } from '#src/controllers/auth.contoller.js';
import express from 'express';

const router = express.Router();

router.post('/sign-up', signUP);

router.post('/sign-in', signIn);
router.post('/sign-out', (req, res) => {
  res.send('signout');
});

export default router;
