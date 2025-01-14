import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: UserRole;
  address: string;
  phone?: string; //opcional
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  OWNER = "owner",
  CARETAKER = "caretaker", //cuidador
  ADMIN = "administrator",
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: [true, "Role is required"],
      default: UserRole.OWNER, //por defecto dueño
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    //versionado
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
