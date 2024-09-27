import express from 'express';
import multer from 'multer';
import * as ticketController from '../controllers/tickets';

const router = express.Router(); // Create Express Router

const MINE_TYPE: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error: Error | null = null;
    if (!MINE_TYPE[file.mimetype]) error = new Error('Invalid mine type');
    cb(error, './images/tickets')
  },
  filename: (req, file, cb) => {
    const ext = MINE_TYPE[file.mimetype];
    cb(null, `${Date.now()}.${ext}`);
  }
})

router.get('', ticketController.getTickets);
router.post('', multer({ storage }).single('file'), ticketController.createTicket);
router.put('', multer({ storage }).single('file'), ticketController.editTicket);
router.delete('/:id', ticketController.deleteTicket);

export default router;
