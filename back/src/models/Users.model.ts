import { Schema, model, Document, Types } from "mongoose";

export enum UserRole {
  OWNER = "owner",
  CARETAKER = "caretaker", // cuidador
  ADMIN = "administrator",
}

export interface IUser extends Document {
  name: string;
  lastName?: string;
  email: string;
  profilePicture?: string;

  about?: string;
  nationality?: string;
  neighborhood?: string;
  address?: string;

  phone?: [string];
  certificate?: [string]; // certificados de cuidador

  role?: UserRole;
  isActive?: boolean;

  pets?: Schema.Types.ObjectId;
  reviews?: Schema.Types.ObjectId;
  schedule?: Schema.Types.ObjectId;
  availability?: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required in Data Base"],
      unique: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    nationality: {
      type: String,
      default: "",
    },
    neighborhood: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: [String],
      default: [],
    },
    certificate: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.OWNER, // por defecto dueño
    },
    isActive: {
      type: Boolean,
      default:false,
    },
    // relaciones con modelos
    pets: {
      type: Schema.Types.ObjectId,
      ref: "Pets",
      default: null,
    },
    reviews: {
      type: Schema.Types.ObjectId,
      ref: "Reviews",
      default: null,
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      default: null,
    },
    //un array para tener varios horarios de disponibilidad
    availability: [
      {
        type: Schema.Types.ObjectId,
        ref: "Availability",
        default: null,
      },
    ],
  },
  {
    // versionado
    timestamps: true,
    versionKey: false,
  }
);

// Middleware para garantizar que los campos faltantes tengan valores vacíos
userSchema.pre("save", function (next) {
  const defaultValues = {
    name: "",
    lastName: "",
    profilePicture: "",
    about: "",
    nationality: "",
    neighborhood: "",
    address: "",
    phone: [],
    certificate: [],
    pets: null,
    reviews: null,
    schedule: null,
    availability: null,
  };

  for (const [key, value] of Object.entries(defaultValues)) {
    if (this[key] === undefined || this[key] === null) {
      this[key] = value;
    }
  }

  next();
});

export const User = model<IUser>("User", userSchema);
