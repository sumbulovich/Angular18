import { Schema, mongo, Types, model } from 'mongoose';

export interface Ticket {
  _id: Types.ObjectId;
  title: string;
  request: string;
  status: 'open' | 'closed';
  image?: string;
}

const ticketSchema = new Schema<Ticket>({
  title: { type: String, required: true },
  request: { type: String, required: true },
  status: { type: String, required: true },
  image: { type: String },
});

export const TicketModel = model<Ticket>('Ticket', ticketSchema);
