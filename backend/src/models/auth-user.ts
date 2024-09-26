import { Schema, Types, model } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface AuthUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  permission: string;
  name: string;
  lastName: string;
}

const authUserSchema = new Schema<AuthUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  permission: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
});

authUserSchema.plugin(mongooseUniqueValidator)

export const AuthUserModel = model<AuthUser>('AuthUser', authUserSchema);
