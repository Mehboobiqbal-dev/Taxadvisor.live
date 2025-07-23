// src/app/models/user.ts
import mongoose, { Schema, Document, model, Model } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  provider?: string;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  provider: { type: String },
});

const User: Model<IUser> = mongoose.models.User || model<IUser>("User", UserSchema);

export default User;