import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastName?: string;
  email: string;
  profilePicture?: string;

  about?: string;
  nationality?: string;
  address?: string;
  phone?: [string];
  certificate?: [string]; //certificados de cuidador

  role?: UserRole;
  isActive?: boolean;

  pets?: Schema.Types.ObjectId;
  reviews?: Schema.Types.ObjectId;
  schedule?: Schema.Types.ObjectId;
  availability?: Schema.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  OWNER = "owner",
  CARETAKER = "caretaker", //cuidador
  ADMIN = "administrator",
}

const userSchema:Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: [true, "Email is required in Data Base"],
      unique: true,
    },
    profilePicture: {
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
      required: false,
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
      required:false,
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
      required: false,
    },
    reviews: {
      type: Schema.Types.ObjectId,
      ref: "Reviews",
      required: false,
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      required:false,
    },
    availability: {
      type: Schema.Types.ObjectId,
      ref: "Availability",
      required:false,
    },
  },
  {
    //versionado
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
