import express from 'express';
import { TicketModel } from '../models/ticket';
import multer from 'multer';
import { unlinkSync } from 'fs';

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

router.get('', async (req, res) => {
  const tickets = await TicketModel.find();
  res.status(200).json({ tickets });
});

router.post('', multer({ storage }).single('file'), async (req, res) => {
  const image: string = req.file ? `${req.protocol}://${req.get('host')}/images/tickets/${req.file?.filename}` : '';
  const ticket = new TicketModel({ ...req.body, image });
  await ticket.save(); // await TicketModel.create(ticket)

  const tickets = await TicketModel.find();
  res.status(200).json({ tickets });
});

router.put('', multer({ storage }).single('file'), async (req, res) => {
  const image: string = req.file ? `${req.protocol}://${req.get('host')}/images/tickets/${req.file?.filename}` : '';
  const ticket = await TicketModel.findOneAndUpdate({ _id: req.body._id }, { ...req.body, image });
  if (ticket) {
    if (ticket.image) unlinkSync(ticket.image.replace(`${req.protocol}://${req.get('host')}`, '.')); // delete previous image
    const tickets = await TicketModel.find();
    res.status(200).json({ tickets });
  } else {
    res.status(400).json({ message: 'Not found' });
  }
});

router.get('/:id', async (req, res) => {
  const ticket = await TicketModel.findById(req.params.id)
  if (ticket) res.status(200).json({ tickets: [ticket] });
  else res.status(400).json({ message: 'Not found' });
});

router.delete('/:id', async (req, res) => {
  const response = await TicketModel.deleteOne({ _id: req.params.id });
  if (response.deletedCount) {
    const tickets = await TicketModel.find();
    res.status(200).json({ tickets });
  } else {
    res.status(400).json({ message: 'Not found' });
  }
});

export default router;
