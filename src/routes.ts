import express from 'express';
import { commandTextController } from './controllers/comandoController';
import { callbackGoogleAuthController, initialAuthController } from './controllers/authGoogleApiController';

const router = express.Router();

router.get('/auth/google', initialAuthController);
router.get('/auth/google/callback', callbackGoogleAuthController);
router.post('/command', commandTextController);

export default router;