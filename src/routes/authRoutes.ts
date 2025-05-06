import express from 'express';
import { signupController, loginController } from '../controllers/authController';
import { signupValidation, loginValidation } from '../validations/authValidation';
import { validateRequest } from '../middlewares/validateRequestMiddleware';

const router = express.Router();

router.post('/signup',validateRequest(signupValidation), signupController);
router.post('/login',validateRequest(loginValidation), loginController);

export default router;
