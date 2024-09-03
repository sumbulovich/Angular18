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

  let tickets: Ticket[];
  pE.length = await TicketModel.countDocuments()
  if (!pE.pageSize) tickets = await TicketModel.find();
  else tickets = await TicketModel.find().skip(pE.pageSize * pE.pageIndex).limit(pE.pageSize);

  res.status(200).json({ tickets, pageEvent: pE });
});

router.post('', multer({ storage }).single('file'), async (req, res) => {
  const image: string = req.file ? `${req.protocol}://${req.get('host')}/images/tickets/${req.file?.filename}` : '';
  const ticket = new TicketModel({ ...req.body, image });
  await ticket.save(); // await TicketModel.create(ticket)

  let tickets: Ticket[];
  pE.length = await TicketModel.countDocuments();
  pE.pageIndex = Math.floor(pE.length / pE.pageSize); // Set last page
  if (!(pE.length % pE.pageSize)) pE.pageIndex -= 1; // Set previous page if no elements on current page
  if (!pE.pageSize) tickets = await TicketModel.find();
  else tickets = await TicketModel.find().skip(pE.pageSize * pE.pageIndex).limit(pE.pageSize);
  res.status(200).json({ tickets, pageEvent: pE });
});

router.put('', multer({ storage }).single('file'), async (req, res) => {
  const image: string = req.file ? `${req.protocol}://${req.get('host')}/images/tickets/${req.file?.filename}` : '';
  const ticket = await TicketModel.findOneAndUpdate({ _id: req.body._id }, { ...req.body, image });
  if (ticket) {
    if (ticket.image) unlinkSync(ticket.image.replace(`${req.protocol}://${req.get('host')}`, '.')); // delete previous image

    let tickets: Ticket[];
    pE.length = await TicketModel.countDocuments()
    if (!pE.pageSize) tickets = await TicketModel.find();
    else tickets = await TicketModel.find().skip(pE.pageSize * pE.pageIndex).limit(pE.pageSize);

    res.status(200).json({ tickets, pageEvent: pE });
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

    let tickets: Ticket[];
    pE.length = await TicketModel.countDocuments()
    if (!(pE.length % pE.pageSize)) pE.pageIndex -= 1; // Set previous page if no elements on current page
    if (!pE.pageSize) tickets = await TicketModel.find();
    else tickets = await TicketModel.find().skip(pE.pageSize * pE.pageIndex).limit(pE.pageSize);

    res.status(200).json({ tickets, pageEvent: pE });
  } else {
    res.status(400).json({ message: 'Not found' });
  }
});

export default router;
