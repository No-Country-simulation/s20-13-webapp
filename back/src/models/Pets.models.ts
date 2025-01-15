import { Schema, model, Document } from "mongoose";

export interface IPets extends Document {
  name: string;
  image?: [string];
  species: string; //podemos poner un enum con las especies que permitimos
  breed?: string;
  age?: number;

  description?: string;
  medicalHistory?: [string];

  user: Schema.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const petsSchema = new Schema<IPets>(
  {
    name: {
      type: String,
      required: [true, "Name is required in Data Base"],
    },
    image: {
      type: [String],
    },
    species: {
      type: String,
      required: [true, "Species is required in Data Base"],
    },
    breed: {
      type: String,
    },
    age: {
      type: Number,
    },

    description: {
      type: String,
    },
    medicalHistory: {
      type: [String],
    },

    //relaciones con modelos
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User is required in Data Base"],
    },
  },
  {
    //versionado
    timestamps: true,
    versionKey: false,
  }
);

export const Pets = model<IPets>("Pets", petsSchema);
