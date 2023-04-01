import express from 'express';
import { getSpeech, getSpeeches, updateSpeech } from '../controllers/speeches.js';

const router = express.Router();

router.get('/speech/:id', getSpeech);
router.get('/get_speeches', getSpeeches);
router.put('/speech/update/:id', updateSpeech);

export default router;