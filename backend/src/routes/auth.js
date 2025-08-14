import express from 'express';
import { body } from 'express-validator';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Password policy: min 6, at least one lowercase, uppercase, digit and special
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

router.post(
  '/signup',
  [
    body('username')
      .trim()
      .matches(usernameRegex)
      .withMessage('Username must be 3+ chars, letters/numbers/_ only'),
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('password').matches(passwordRegex).withMessage('Password must be at least 6 characters and include uppercase, lowercase, number and special char'),
  ],
  signup
);

router.post(
  '/login',
  [
    body('identifier').trim().notEmpty().withMessage('Identifier required'),
    body('password').notEmpty().withMessage('Password required')
  ],
  login
);

export default router;
