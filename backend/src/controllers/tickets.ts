import { Request, Response } from "express";
import { Ticket, TicketModel } from "../models/ticket";
import { unlinkSync } from "fs";

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

export const getTickets = async (req: Request, res: Response) => {
  pE = {
    pageSize: +(req.query.pageSize || 0),
    pageIndex: +(req.query.pageIndex || 0),
    length: +(req.query.length || 0)
  };

  const tickets: Ticket[] = await getPaginatedTickets();
  res.status(200).json({ tickets, pageEvent: pE });
}

export const createTicket = async (req: Request, res: Response) => {
  const image: string = req.file ? `${req.protocol}://${req.get('host')}/public/tickets/${req.file?.filename}` : '';
  const ticket = new TicketModel({ ...req.body, image });
  await ticket.save(); // await TicketModel.create(ticket)

  const tickets: Ticket[] = await getPaginatedTickets();
  pE.pageIndex = Math.floor(pE.length / pE.pageSize); // Set last page
  if (!(pE.length % pE.pageSize)) pE.pageIndex -= 1; // Set previous page if no elements on current page
  res.status(200).json({ tickets, pageEvent: pE });
}

export const editTicket = async (req: Request, res: Response) => {
  const image: string = req.file ? `${req.protocol}://${req.get('host')}/public/tickets/${req.file?.filename}` : '';
  const ticket = await TicketModel.findOneAndUpdate({ _id: req.body._id }, { ...req.body, image });

  if (ticket) {
    if (ticket.image) unlinkSync(ticket.image.replace(`${req.protocol}://${req.get('host')}`, '.')); // delete previous image
    const tickets: Ticket[] = await getPaginatedTickets();
    res.status(200).json({ tickets, pageEvent: pE });
  } else {
    res.status(400).json({ message: 'Not found' });
  }
}

export const deleteTicket = async (req: Request, res: Response) => {
  const response = await TicketModel.deleteOne({ _id: req.params.id });
  if (response.deletedCount) {
    const tickets: Ticket[] = await getPaginatedTickets();
    if (!(pE.length % pE.pageSize)) pE.pageIndex -= 1; // Set previous page if no elements on current page
    res.status(200).json({ tickets, pageEvent: pE });
  } else {
    res.status(400).json({ message: 'Not found' });
  }
}
