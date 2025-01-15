import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastName?: string;
  email: string;
  avatar?: string;

  about?: string;
  nationality?: string;
  address: string;
  phone?: [string];
  certificate?: [string]; //certificados de cuidador

  role: UserRole;
  isActive: boolean;
  pets: Schema.Types.ObjectId; //relaciones con el modelo de pets

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
      required: [true, "Name is required in Data Base"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required in Data Base"],
    },
    email: {
      type: String,
      required: [true, "Email is required in Data Base"],
      unique: true,
    },
    avatar: {
      type: String,
    },

    about: {
      type: String,
    },
    nationality: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required in Data Base"],
    },
    phone: {
      type: [String],
    },
    certificate: {
      type: [String],
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      required: [true, "Role is required in Data Base"],
      default: UserRole.OWNER, //por defecto dueño
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    //relaciones con modelos
    pets: {
      type: Schema.Types.ObjectId,
      ref: "Pets",
      required: [true, "Pets is required in Data Base"],
    },
  },
  {
    //versionado
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
