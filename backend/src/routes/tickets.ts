import express from 'express';
import * as ticketController from '../controllers/tickets';
import * as filesMiddleware from '../middleware/files';

const router = express.Router(); // Create Express Router

router.get('', ticketController.getTickets);
router.get('/:id', ticketController.getTicket);
router.post('', filesMiddleware.extractFile, ticketController.createTicket);
router.put('', filesMiddleware.extractFile, ticketController.editTicket);
router.delete('/:id', ticketController.deleteTicket);

export default router;
