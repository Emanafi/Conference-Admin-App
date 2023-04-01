import express from 'express';
import { getAttendee, getAttendees } from '../controllers/attendees.js';

const router = express.Router();

router.get('/attendee/:id', getAttendee);
router.get('/get_attendees', getAttendees);

export default router;