import express from 'express';
import { commandTextController } from './controllers/comandoController';

const router = express.Router();

router.post('/command', commandTextController);

export default router;