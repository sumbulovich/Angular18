import { Schema, Types, model } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface AuthUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  permission: string;
}

const authUserSchema = new Schema<AuthUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  permission: { type: String },
});

authUserSchema.plugin(mongooseUniqueValidator)

export const AuthUserModel = model<AuthUser>('AuthUser', authUserSchema);
