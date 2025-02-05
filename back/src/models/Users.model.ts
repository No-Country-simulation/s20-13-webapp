import { Schema, model, Document, Types } from "mongoose";

export enum UserRole {
  OWNER = "owner",
  CARETAKER = "caretaker", // cuidador
  ADMIN = "administrator",
}
export enum  UserService {
  CARETAKER = "caretaker",
  DOGWALKER = "dogwalker"
}


export enum PetType{
  DOG="dog",
  CAT="cat"
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
  zone?:string
  phone?: [string];
  certificate?: [string]; // certificados de cuidador
  petType:PetType
  cost: number
  role?: UserRole;
  isActive?: boolean;
  service?: UserService
  pets?: Schema.Types.ObjectId[];
  reviews?: Schema.Types.ObjectId[];
  schedule?: Schema.Types.ObjectId;
  availability?: Schema.Types.ObjectId[];
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
    zone: {
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
      default: UserRole.OWNER,
    },
    service: {
      type: String,
      enum: Object.values(UserService),
      default:null
    },
    petType:{
      type:String,
      enum:Object.values(PetType),
      default:null
    },
    cost: {
        type: Number,
        default: null
      }
    ,
    isActive: {
      type: Boolean,
      default: false,
    },

    // relaciones con modelos
    pets: {
      type: [Schema.Types.ObjectId],
      ref: "Pets",
      default: []
    },

    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "Reviews",
      default: [],
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      default: null,
    },
    //un array para tener varios horarios de disponibilidad
    availability:{
        type:[Schema.Types.ObjectId],
        ref:"Availability",
        default:[]
    }
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
    zone:"",
    service:null,
    cost:null,
    phone: [],
    certificate: [],
    petType:null,
    pets: [],
    reviews: [],
    schedule: null,
    availability: [],
    isActive:false
  };

  for (const [key, value] of Object.entries(defaultValues)) {
    if (this[key] === undefined || this[key] === null) {
      this[key] = value;
    }
  }

  next();
});



export const User = model<IUser>("User", userSchema);
