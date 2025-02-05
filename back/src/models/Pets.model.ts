import { Schema, model, Document } from "mongoose";

export interface IPets extends Document {
  name: string;
  image?: [string];
  species: PetSpecies;
  breed?: string;
  age?: number;

  description?: string;
  medicalHistory?: [string];

  user: Schema.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export enum PetSpecies {
  DOG = "dog",
  CAT = "cat",
}

const petsSchema = new Schema<IPets>(
  {
    name: {
      type: String,
      required: [true, "Name is required in Data Base Model"],
    },
    image: {
      type: [String],
    },
    species: {
      type: String,
      required: [true, "Species is required in Data Base Model"],
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
      ref: "User",
      required: [true, "User is required in Data Base Model"],
    },
  },
  {
    //versionado
    timestamps: true,
    versionKey: false,
  }
);

petsSchema.pre("findOneAndDelete", async function (next) {

  const pet = await this.model.findOne(this.getFilter());
  
  if (pet) {
    await model("User").updateOne(
      { pets: pet._id },
      { $pull: { pets: pet._id } }
    );
  }
  next();

});

export const Pets = model<IPets>("Pets", petsSchema);
