import { Schema, model, Document } from "mongoose";

export interface IReviews extends Document {
  comment: string;
  rating: number;

  user:Schema.Types.ObjectId ; //caretaker y owner

  createdAt: Date;
  updatedAt: Date;
}

const reviewsSchema = new Schema<IReviews>(
  {
    comment: {
      type: String,
      required: [true, "Comment is required in Data Base Model"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required in Data Base Model"],
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

export const Reviews = model<IReviews>("Reviews", reviewsSchema);
