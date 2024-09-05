import express from 'express';
import { Ticket, TicketModel } from '../models/ticket';
import multer from 'multer';
import { unlinkSync } from 'fs';

const router = express.Router(); // Create Express Router

const MINE_TYPE: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

let pE: { pageSize: number, pageIndex: number, length: number };

/**
 * Get paginated tickets
 * @returns tickets
 */
async function getPaginatedTickets(): Promise<Ticket[]> {
  pE.length = await TicketModel.countDocuments()
  if (!pE.pageSize) return TicketModel.find();
  return TicketModel.find().skip(pE.pageSize * pE.pageIndex).limit(pE.pageSize);
}

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

router.get('', async (req, res) => {
  pE = {
    pageSize: +(req.query.pageSize || 0),
    pageIndex: +(req.query.pageIndex || 0),
    length: +(req.query.length || 0)
  };

  const tickets: Ticket[] = await getPaginatedTickets();
  res.status(200).json({ tickets, pageEvent: pE });
});

router.post('', multer({ storage }).single('file'), async (req, res) => {
  const image: string = req.file ? `${req.protocol}://${req.get('host')}/images/tickets/${req.file?.filename}` : '';
  const ticket = new TicketModel({ ...req.body, image });
  await ticket.save(); // await TicketModel.create(ticket)

  const tickets: Ticket[] = await getPaginatedTickets();
  pE.pageIndex = Math.floor(pE.length / pE.pageSize); // Set last page
  if (!(pE.length % pE.pageSize)) pE.pageIndex -= 1; // Set previous page if no elements on current page
  res.status(200).json({ tickets, pageEvent: pE });
});

router.put('', multer({ storage }).single('file'), async (req, res) => {
  const image: string = req.file ? `${req.protocol}://${req.get('host')}/images/tickets/${req.file?.filename}` : '';
  const ticket = await TicketModel.findOneAndUpdate({ _id: req.body._id }, { ...req.body, image });

  if (!ticket) return res.status(400).json({ message: 'Not found' });
  if (ticket.image) unlinkSync(ticket.image.replace(`${req.protocol}://${req.get('host')}`, '.')); // delete previous image

  const tickets: Ticket[] = await getPaginatedTickets();
  res.status(200).json({ tickets, pageEvent: pE });
});

router.get('/:id', async (req, res) => {
  const ticket = await TicketModel.findById(req.params.id)
  if (!ticket) return res.status(400).json({ message: 'Not found' });
  res.status(200).json({ tickets: [ticket] });
});

router.delete('/:id', async (req, res) => {
  const response = await TicketModel.deleteOne({ _id: req.params.id });
  if (!response.deletedCount) return res.status(400).json({ message: 'Not found' });

  const tickets: Ticket[] = await getPaginatedTickets();
  if (!(pE.length % pE.pageSize)) pE.pageIndex -= 1; // Set previous page if no elements on current page
  res.status(200).json({ tickets, pageEvent: pE });
});

export default router;
