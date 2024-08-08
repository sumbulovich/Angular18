import { Schema, mongo, Types, model } from 'mongoose';

export interface Ticket {
  id: Types.ObjectId;
  title: string;
  request: string;
  status: 'open' | 'closed';
}

const ticketSchema = new Schema<Ticket>({
  id: { type: Schema.Types.ObjectId, default: new mongo.ObjectId() },
  title: { type: String, required: true },
  request: { type: String, required: true },
  status: { type: String, required: true },
});

export const PlaceModel = model<Ticket>('Ticket', ticketSchema);
