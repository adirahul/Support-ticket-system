import express from 'express';
import { assignTicketController, createTicketController, getFilteredController, getTicketsController } from '../controllers/supportTicketController.js';

const router = express.Router();

//generate ticket
router.post('/create-ticket', createTicketController);

//assign ticket
router.post('/assign-ticket', assignTicketController);
//get all tickets
router.get('/tickets', getTicketsController);

//get filtered tickets
router.get('/tickets/:keyword', getFilteredController);
export default router;