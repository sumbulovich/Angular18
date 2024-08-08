import { Schema, mongo, Types, model } from 'mongoose';

export interface Place {
  id: Types.ObjectId;
  title: string;
  image: { src: string, alt: string };
  lat: number;
  lon: number;
}

const imageSchema = new Schema({
  src: { type: String, required: true },
  alt: { type: String, required: true }
});
const placeSchema = new Schema<Place>({
  id: { type: Schema.Types.ObjectId, default: new mongo.ObjectId() },
  title: { type: String, required: true },
  image: { type: imageSchema, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
});

export const PlaceModel = model<Place>('Place', placeSchema);
