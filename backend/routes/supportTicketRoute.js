import express from 'express';
import { createTicketController, getTicketsController } from '../controllers/supportTicketController.js';

const router = express.Router();

//generate ticket
router.post('/create-ticket', createTicketController);

//get all tickets
router.get('/tickets', getTicketsController);

export default router;